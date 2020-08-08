import AuthListener from "../../models/auth/AuthListener";

export default interface AuthRepository {
  isAuthorized(): boolean;

  getAccessToken(): string;

  addAuthListener(authListener: AuthListener): void;

  removeAuthListener(authListener: AuthListener): void;

  /**
   * @throws {Error} if credentials are not valid
   * or another problem occured
   */
  signIn( password: string,email:string): unknown;

  signUp(username:string,password:string,email:string):unknown;

  signOut(): void;
}
