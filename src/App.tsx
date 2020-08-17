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
  Link,
  // @ts-ignore
} from "react-router-dom";
import AuthComponent from "./presentation/view/auth/AuthComponent";
import BrowserHistoryHelper from "./util/BrowserHistoryHelper";
import AuthListener from "./data/models/auth/AuthListener";
import NavbarComponent from "./presentation/view/navbar/NavbarComponent";
import BlogCreatePost from "./presentation/view/blog/BlogCreatePost";
import BlogComponent from "./presentation/view/blog/BlogComponent";
import BlogRepository from "./data/repository/blog/BlogRepository";
import BlogRepositoryImpl from "./data/repository/blog/BlogRepositoryImpl";
import BlogViewModel from "./presentation/view-model/blog/BlogViewModel";
import BlogViewModelImpl from "./presentation/view-model/blog/BlogViewModelImpl";

const App = () => {
  //repositories
  const authRepository: AuthRepository = new AuthRepositoryImpl();
  const blogRepository: BlogRepository = new BlogRepositoryImpl(authRepository);

  //view-model
  const authViewModel: AuthViewModel = new AuthViewModelImpl(authRepository);
  const blogViewModel: BlogViewModel = new BlogViewModelImpl(blogRepository);

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
        backgroundImage:
          "url(https://images.unsplash.com/photo-1417577097439-425fb7dec05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <Router history={BrowserHistoryHelper.getHistory()}>
        <Switch>
          {isAuthorized ? (
            <>
              <Route exact path="/">
                <NavbarComponent authViewModel={authViewModel} />
                <Link to="/blog">
                  <button className="btn btn-primary"> Go to blog</button>
                </Link>
              </Route>

              <Route exact path="/blog">
                <NavbarComponent authViewModel={authViewModel} />
                <BlogComponent blogViewModel={blogViewModel} />
              </Route>

              <Route exact path="/blog/create_post">
                <NavbarComponent authViewModel={authViewModel} />
                <BlogCreatePost blogViewModel={blogViewModel} />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <AuthComponent authViewModel={authViewModel} />
              </Route>

              <Route exact path="/sign_in">
                <AuthComponent authViewModel={authViewModel} />
              </Route>

              <Route exact path="/sign_up">
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
