import AuthViewModel from "./AuthViewModel";
import BaseView from "../../view/BaseView";
import BrowserHistoryHelper from "../../../util/BrowserHistoryHelper";
import AuthRepository from "../../../data/repository/auth/AuthRepository";
import ViewModel from "../ViewModel";
import AuthListener from "../../../data/models/auth/AuthListener";
import FormValidator from "../../../util/FormValidator";

export default class AuthViewModelImpl extends ViewModel
  implements AuthViewModel, AuthListener {
  public userNameQuery: string;
  public passwordQuery: string;

  public isShowError: boolean;
  public errorMessage: string;
  public emailQuery: string;
  public confirmPasswordQuery: string;

  public authRepository: AuthRepository;

  public constructor(authRepository: AuthRepository) {
    super();
    this.userNameQuery = "";
    this.passwordQuery = "";

    this.isShowError = false;
    this.errorMessage = "";
    this.emailQuery = "";
    this.confirmPasswordQuery = "";

    this.authRepository = authRepository;
  }

  public attachView = (baseView: BaseView): void => {
    super.attachView(baseView);
    this.authRepository.addAuthListener(this);
    this.moveHomeIfAuthorized();
  };

  public detachView = (): void => {
    super.detachView();
    this.authRepository.removeAuthListener(this);
  };

  public onAuthStatusChanged = (): void => {
    this.moveHomeIfAuthorized();
  };

  public onUserNameQueryChanged = (value: string): void => {
    this.userNameQuery = value;
    this.notifyViewAboutChanges();
  };

  public onPasswordQueryChanged = (value: string): void => {
    this.passwordQuery = value;
    this.notifyViewAboutChanges();
  };

  public onEmailChanged = (value: string): void => {
    this.emailQuery = value;
    super.notifyViewAboutChanges();
  };

  public onConfirmPasswordChanged = (value: string): void => {
    this.confirmPasswordQuery = value;
    super.notifyViewAboutChanges();
  };

  public onSignIn = async (): Promise<void> => {
    if (this.isValidSignInForm()) {
      try {
        //@ts-ignore
        await this.authRepository.signIn(this.passwordQuery, this.emailQuery);
      } catch (e) {
        this.errorMessage = e.message;
        this.isShowError = true;
      }

      super.notifyViewAboutChanges();
    }

    this.notifyViewAboutChanges();
  };

  public isAuthorized = (): boolean => {
    return this.authRepository.isAuthorized();
  };

  public getUserName = (): string => {
    return this.authRepository.getUserName();
  };

  public onSignUp = async (): Promise<void> => {
    if (this.validateLoginForm()) {
      try {
        //@ts-ignore
        await this.authRepository
          .signUp(this.userNameQuery, this.emailQuery, this.passwordQuery)
          .then((res: string) => {
            console.log(res);
            if (res === "OK") {
              BrowserHistoryHelper.moveToAndReload("/sign_in");
            }
          });
      } catch (e) {
        console.log(e);
      }

      super.notifyViewAboutChanges();
    }

    this.notifyViewAboutChanges();
  };

  public onSignOut = (): void => {
    this.authRepository.signOut();
  };

  private isValidSignInForm = (): boolean => {
    if (!this.emailQuery) {
      this.isShowError = true;
      this.errorMessage = "Email cannot be empty";
      return false;
    }

    if (!this.passwordQuery) {
      this.isShowError = false;
      this.errorMessage = "Password cannot be empty";
      return false;
    }

    if (this.errorMessage === "Email cannot be empty") {
      this.isShowError = false;
      this.errorMessage = "";
      return false;
    }

    if (this.errorMessage === "Password cannot be empty") {
      this.isShowError = false;
      this.errorMessage = "";
      return false;
    }

    return true;
  };

  private validateLoginForm = (): boolean => {
    if (!this.emailQuery) {
      this.isShowError = true;
      this.errorMessage = "Email cannot be empty";
      return false;
    }

    if (!FormValidator.isValidEmail(this.emailQuery)) {
      this.isShowError = true;
      this.errorMessage = "Wrong format of email address";
      return false;
    }

    if (!this.userNameQuery) {
      this.isShowError = true;
      this.errorMessage = "Username cannot be empty";
      return false;
    }

    if (this.userNameQuery && !this.passwordQuery) {
      this.isShowError = true;
      this.errorMessage = "Password cannot be empty";
      return false;
    }

    if (!this.passwordQuery) {
      this.isShowError = false;
      this.errorMessage = "Password cannot be empty";
      return false;
    }

    if (!this.confirmPasswordQuery) {
      this.isShowError = false;
      this.errorMessage = "Confirm password cannot be empty";
      return false;
    }

    if (this.passwordQuery !== this.confirmPasswordQuery) {
      this.isShowError = true;
      this.errorMessage = "Password and confirm password doesn't match";
      return false;
    }

    if (this.errorMessage === "Username cannot be empty") {
      this.isShowError = false;
      this.errorMessage = "";
      return false;
    }

    if (this.errorMessage === "Password and confirm password doesn't match") {
      this.isShowError = false;
      this.errorMessage = "";
      return false;
    }

    if (this.errorMessage === "Confirm password cannot be empty") {
      this.isShowError = false;
      this.errorMessage = "";
      return false;
    }

    if (this.errorMessage === "Wrong format of email address") {
      this.isShowError = false;
      this.errorMessage = "";
      return false;
    }

    if (this.errorMessage === "Email cannot be empty") {
      this.isShowError = false;
      this.errorMessage = "";
      return false;
    }

    if (this.errorMessage === "Password cannot be empty") {
      this.isShowError = false;
      this.errorMessage = "";
      return false;
    }

    return true;
  };

  private moveHomeIfAuthorized = (): void => {
    if (this.authRepository.isAuthorized()) {
      BrowserHistoryHelper.moveTo("/");
    }
  };
}
