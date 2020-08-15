import React from "react";

import "./navbar-style.css";

// @ts-ignore
import { Link } from "react-router-dom";
import AuthViewModel from "../../view-model/auth/AuthViewModel";

interface Props {
  authViewModel: AuthViewModel;
}

interface State {}

export default class NavbarComponent extends React.Component<Props, State> {
  private readonly authViewModel: AuthViewModel;
  constructor(props: Props) {
    super(props);

    const { authViewModel } = this.props;

    this.authViewModel = authViewModel;
  }

  public render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light d-flex justify-content-between "
        style={{ background: "white" }}
      >
        <div>
          <Link to="/" className="navbar-brand">
            SPACE NETWORK
          </Link>
        </div>

        <div className="d-flex">
          {this.authViewModel.isAuthorized() ? (
            <>
              <div className="text-dark">
                Hello {this.authViewModel.getUserName()}
              </div>

              <button
                type="button"
                onClick={(): void => this.authViewModel.onSignOut()}
              >
                <img
                  src="https://image.flaticon.com/icons/svg/1828/1828479.svg"
                  alt="logout"
                  width={25}
                />
              </button>
            </>
          ) : (
            <div>
              <Link to="/sign_in">
                <button className="btn btn-dark mr-2 " type="submit">
                  Sign In
                </button>
              </Link>
              <Link to="/sign_up">
                <button className="btn btn-dark mr-2" type="submit">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
  }
}
