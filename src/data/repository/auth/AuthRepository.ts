import AuthListener from "../../models/auth/AuthListener";
import SignInResponce from "./SignInResponce";

export default interface AuthRepository {
  isAuthorized(): boolean;

  getAccessToken(): string;

  addAuthListener(authListener: AuthListener): void;

  removeAuthListener(authListener: AuthListener): void;

  signIn(password: string, email: string): Promise<SignInResponce>;

  signUp(username: string, password: string, email: string): Promise<string>;

  signOut(): void;

  getUserName(): string;
}
