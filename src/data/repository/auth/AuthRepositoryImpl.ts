import RequestOptions from "../../api/RequestOptions";
import AuthListener from "../../models/auth/AuthListener";
import AuthRepository from "./AuthRepository";
import ApiHelper from "../../api/ApiHelper";
import { APPLICATION_SERVER } from "../../../constants";
import BrowserHistoryHelper from "../../../util/BrowserHistoryHelper";
import SignInResponce from "./SignInResponce";

export default class AuthRepositoryImpl implements AuthRepository {
  private authListeners: AuthListener[];

  private ACCESS_TOKEN_KEY = "access_token";
  private USERNAME = "username";

  public constructor() {
    this.authListeners = [];
  }

  public getAccessToken(): string {
    if (!localStorage.getItem(this.ACCESS_TOKEN_KEY)) {
      throw new Error("Autorization token does not exitst");
    }
    return `${localStorage.getItem(this.ACCESS_TOKEN_KEY) as string}`;
  }

  public getUserName(): string {
    return localStorage.getItem(this.USERNAME) as string;
  }

  public isAuthorized(): boolean {
    return !!localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public signIn = (
    password: string,
    email: string
  ): Promise<SignInResponce> => {
    const requestOptions: RequestOptions = new RequestOptions();

    requestOptions.setBody(
      JSON.stringify({
        password,
        email,
      })
    );

    return ApiHelper.fetchPostJson<SignInResponce>(
      `${APPLICATION_SERVER}/api/auth/signin`,
      requestOptions
    ).then((res: SignInResponce) => {
      if (res.token) {
        this.saveAccessTokenFromResponse(res.token);
        BrowserHistoryHelper.moveTo("/");
        this.notifyAuthListenersAboutChanges();
      }

      if (res.username) {
        this.saveUserNameFromResponse(res.username);
        this.notifyAuthListenersAboutChanges();
      }

      return res;
    });
  };

  public signUp = (
    username: string,
    email: string,
    password: string
  ): Promise<string> => {
    const requestOptions: RequestOptions = new RequestOptions();

    requestOptions.setBody(
      JSON.stringify({
        password,
        email,
        username,
      })
    );

    return ApiHelper.fetchPostRaw(
      `${APPLICATION_SERVER}/api/auth/signup`,
      requestOptions
    );
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
    console.log(token);
    console.log(this.ACCESS_TOKEN_KEY);
    if (token) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    }

    this.notifyAuthListenersAboutChanges();
  }

  private saveUserNameFromResponse = (username?: string): void => {
    if (username) {
      localStorage.setItem(this.USERNAME, username);
    }

    this.notifyAuthListenersAboutChanges();
  };

  private notifyAuthListenersAboutChanges = (): void => {
    this.authListeners.forEach((listener) => {
      listener.onAuthStatusChanged();
    });
  };
}
