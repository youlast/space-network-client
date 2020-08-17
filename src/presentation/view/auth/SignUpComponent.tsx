import React from "react";

import {
  Link,
  // @ts-ignore
} from "react-router-dom";

import "./auth-style.css";
import BaseView from "../BaseView";
import AuthViewModel from "../../view-model/auth/AuthViewModel";

interface Props {
  authViewModel: AuthViewModel;
}

export interface State {
  isShowError: boolean;
  errorMessage: string;
}

export default class SignUpComponent extends React.Component<Props, State>
  implements BaseView {
  private authViewModel: AuthViewModel;

  constructor(props: Props) {
    super(props);
    const { authViewModel } = this.props;
    this.authViewModel = authViewModel;

    this.state = {
      isShowError: authViewModel.isShowError,
      errorMessage: authViewModel.errorMessage,
    };
  }

  public componentDidMount(): void {
    this.authViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.authViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      isShowError: this.authViewModel.isShowError,
      errorMessage: this.authViewModel.errorMessage,
    });
  }

  public render(): JSX.Element {
    const { isShowError, errorMessage } = this.state;

    return (
      <div className="row flex-grow-1 d-flex justify-content-center align-items-center ml-0 mr-0">
        <div className="auth-container col bg-white border rounded-lg shadow py-4 px-5">
          <div className="row mt-2 mb-5 justify-content-center">
            <h4 className="text-dark">Space Network</h4>
          </div>

          <div className="row mt-2">
            <input
              type="text"
              onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                this.authViewModel.onEmailChanged(e.currentTarget.value);
              }}
              className="form-control"
              placeholder="email"
            />
          </div>

          <div className="row mt-2">
            <input
              type="text"
              onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                this.authViewModel.onUserNameQueryChanged(
                  e.currentTarget.value
                );
              }}
              className="form-control"
              placeholder="username"
            />
          </div>

          <div className="row mt-2">
            <input
              type="password"
              className="form-control"
              onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                this.authViewModel.onPasswordQueryChanged(
                  e.currentTarget.value
                );
              }}
              placeholder="password"
            />
          </div>

          <div className="row mt-2">
            <input
              type="password"
              className="form-control"
              onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                this.authViewModel.onConfirmPasswordChanged(
                  e.currentTarget.value
                );
              }}
              placeholder="confirm password"
            />
          </div>
          {isShowError && (
            <div className="row my-3 text-danger justify-content-center">
              {errorMessage}
            </div>
          )}

          <div className="row mt-4">
            <button
              className="btn btn-dark btn-block"
              onClick={(): Promise<void> => this.authViewModel.onSignUp()}
              type="button"
            >
              Join to space-network
            </button>
          </div>

          <div className="row justify-content-center">
            <Link className="pt-1" to="/sign_in">
              Already have a account?
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
