import React, { useEffect, useState } from "react";
import AuthRepositoryImpl from "./data/repository/auth/AuthRepositoryImpl";
import AuthRepository from "./data/repository/auth/AuthRepository";
import AuthViewModelImpl from "./presentation/view-model/auth/AuthViewModelImpl";
import AuthViewModel from "./presentation/view-model/auth/AuthViewModel";
import SignUpComponent from "./presentation/view/auth/SignUpComponent";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // @ts-ignore
} from "react-router-dom";
import AuthComponent from "./presentation/view/auth/AuthComponent";
import BrowserHistoryHelper from "./util/BrowserHistoryHelper";
import AuthListener from "./data/models/auth/AuthListener";

const App = () => {
  const authRepository: AuthRepository = new AuthRepositoryImpl();
  const authViewModel: AuthViewModel = new AuthViewModelImpl(authRepository);

  const [isAuthorized, setAuthorized] = useState(authRepository.isAuthorized());
  useEffect(() => {
    const authListener: AuthListener = {
      onAuthStatusChanged(): void {
        setAuthorized(authRepository.isAuthorized());
      },
    };
    authRepository.addAuthListener(authListener);
  });
  return (
    <div
      className="container-fluid d-flex flex-column"
      style={{
        height: "100vh",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1417577097439-425fb7dec05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
      }}
    >
      <Router history={BrowserHistoryHelper.getHistory()}>
        <Switch>
          {isAuthorized ? (
            <>
              <h1>You authorized</h1>
            </>
          ) : (
            <>
              <Route exact path="/">
                <AuthComponent authViewModel={authViewModel} />
              </Route>

              <Route exact path="/register">
                <SignUpComponent authViewModel={authViewModel} />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
