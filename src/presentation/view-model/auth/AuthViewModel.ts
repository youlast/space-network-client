import BaseViewModel from "../BaseViewModel";
import AuthRepository from "../../../data/repository/auth/AuthRepository";

export default interface AuthViewModel extends BaseViewModel {
  userNameQuery: string;
  passwordQuery: string;
  isShowError: boolean;
  errorMessage: string;
  authRepository: AuthRepository;

  onUserNameQueryChanged(loginQuery: string): void;

  onPasswordQueryChanged(passwordQuery: string): void;

  onSignIn(): Promise<void>;

  onSignOut(): void;

  onAuthStatusChanged(): void;

  onEmailChanged(value:string):void;

  onConfirmPasswordChanged(value:string):void;
}
