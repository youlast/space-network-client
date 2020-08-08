import RequestOptions from "../../api/RequestOptions";
import AuthListener from "../../models/auth/AuthListener";
import AuthRepository from "./AuthRepository";
import ApiHelper from "../../api/ApiHelper";
import { APPLICATION_SERVER } from "../../../constants";

export default class AuthRepositoryImpl implements AuthRepository {
  private authListeners: AuthListener[];

  private ACCESS_TOKEN_KEY = "access_token";

  public constructor() {
    this.authListeners = [];
  }

  public getAccessToken(): string {
    if (!localStorage.getItem(this.ACCESS_TOKEN_KEY)) {
      throw new Error("Autorization token does not exitst");
    }
    return localStorage.getItem(this.ACCESS_TOKEN_KEY) as string;
  }

  public isAuthorized(): boolean {
    return !!localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public signIn = ( password: string,email:string): Promise<unknown> => {
    const requestOptions: RequestOptions = new RequestOptions();

    requestOptions.setBody(
      JSON.stringify({
        password,
        email
      })
    );



    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/auth`,
      requestOptions
    ).then((json: any) => {
      if (json.error) {
        alert(json.error);
      }

      if (json.token) {
        this.saveAccessTokenFromResponse(json.token);
        this.notifyAuthListenersAboutChanges();
      }

      return json;
    });
  };

  public signUp = (username:string,email:string,password:string,):unknown => {
    const requestOptions: RequestOptions = new RequestOptions();

    requestOptions.setBody(
      JSON.stringify({
        username,
        password,
        email
      })
    );

    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/register`,
      requestOptions
    )
  };

  public signOut(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    this.notifyAuthListenersAboutChanges();
  }

  public addAuthListener(authListener: AuthListener): void {
    this.authListeners.push(authListener);
  }

  public removeAuthListener(authListener: AuthListener): void {
    this.authListeners.splice(this.authListeners.indexOf(authListener), 1);
  }

  private saveAccessTokenFromResponse(token?: string): void {
    if (token) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.setItem(
        this.ACCESS_TOKEN_KEY,
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTkwNzI0MzkwNSwiaWF0IjoxNTkxODgzOTA1fQ.nkc4oxlYlXebk0_0FQbYNc3t1VmETIlgTXOs54XgS9oQyFXOXFZwYKTVZMuXllm_Z1Za0fnO66xMPNz6zVeTkA"
      );
    }

    this.notifyAuthListenersAboutChanges();
  }

  private notifyAuthListenersAboutChanges = (): void => {
    this.authListeners.forEach((listener) => {
      listener.onAuthStatusChanged();
    });
  };
}
