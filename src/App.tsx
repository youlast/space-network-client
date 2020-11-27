import React, { lazy, Suspense, useEffect, useState } from "react";
import AuthRepositoryImpl from "./data/repository/auth/AuthRepositoryImpl";
import AuthRepository from "./data/repository/auth/AuthRepository";
import AuthViewModelImpl from "./presentation/view-model/auth/AuthViewModelImpl";
import AuthViewModel from "./presentation/view-model/auth/AuthViewModel";

import { Switch, Route, Router } from "react-router-dom";
import AuthListener from "./data/models/auth/AuthListener";

import BlogRepository from "./data/repository/blog/BlogRepository";
import BlogRepositoryImpl from "./data/repository/blog/BlogRepositoryImpl";
import BlogViewModel from "./presentation/view-model/blog/BlogViewModel";
import BlogViewModelImpl from "./presentation/view-model/blog/BlogViewModelImpl";
import FullBlogViewModel from "./presentation/view-model/blog/FullBlogViewModel";
import FullBlogViewModelImpl from "./presentation/view-model/blog/FullBlogViewModelImpl";
import BrowserHistoryHelper from "./util/BrowserHistoryHelper";
import LoadingComponent from "./util/components/LoadingComponent";

const App = () => {
  //repositories
  const authRepository: AuthRepository = new AuthRepositoryImpl();
  const blogRepository: BlogRepository = new BlogRepositoryImpl(authRepository);

  //view-models
  const authViewModel: AuthViewModel = new AuthViewModelImpl(authRepository);
  const blogViewModel: BlogViewModel = new BlogViewModelImpl(blogRepository);
  const fullBlogViewModel: FullBlogViewModel = new FullBlogViewModelImpl(
    blogRepository
  );

  const [isAuthorized, setAuthorized] = useState(authRepository.isAuthorized());
  useEffect(() => {
    const authListener: AuthListener = {
      onAuthStatusChanged(): void {
        setAuthorized(authRepository.isAuthorized());
      },
    };
    authRepository.addAuthListener(authListener);
  });

  // import of components
  const AuthComponent = lazy(
    () => import("./presentation/view/auth/AuthComponent")
  );
  const NavbarComponent = lazy(
    () => import("./presentation/view/navbar/NavbarComponent")
  );
  const BlogComponent = lazy(
    () => import("./presentation/view/blog/BlogComponent")
  );
  const BlogCreatePost = lazy(
    () => import("./presentation/view/blog/BlogCreatePost")
  );
  const FullBlogComponent = lazy(
    () => import("./presentation/view/blog/FullBlogComponent")
  );
  const SignUpComponent = lazy(
    () => import("./presentation/view/auth/SignUpComponent")
  );

  const loadingComponent = (
    <div className="row justify-content-center mt-5 pt-5 mr-0">
      <LoadingComponent color="light" />
    </div>
  );

  return (
    <div
      className="container-fluid d-flex flex-column"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1435224668334-0f82ec57b605?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMjU4fQ&auto=format&fit=crop&w=1350&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingLeft: 0,
        height: "100vh",
        paddingRight: 0,
      }}
    >
      <Router history={BrowserHistoryHelper.getHistory()}>
        <Suspense fallback={loadingComponent}>
          <NavbarComponent authViewModel={authViewModel} />
        </Suspense>
        <Switch>
          {isAuthorized ? (
            <>
              <Route exact path="/">
                <Suspense fallback={loadingComponent}>
                  <BlogComponent blogViewModel={blogViewModel} />
                </Suspense>
              </Route>

              <Route exact path="/blog/create_post">
                <Suspense fallback={loadingComponent}>
                  <BlogCreatePost blogViewModel={blogViewModel} />
                </Suspense>
              </Route>

              <Route path="/blog/item">
                <Suspense fallback={loadingComponent}>
                  <FullBlogComponent
                    blogViewModel={blogViewModel}
                    fullBlogViewModel={fullBlogViewModel}
                  />
                </Suspense>
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <Suspense fallback={loadingComponent}>
                  <AuthComponent authViewModel={authViewModel} />
                </Suspense>
              </Route>

              <Route exact path="/sign_in">
                <Suspense fallback={loadingComponent}>
                  <AuthComponent authViewModel={authViewModel} />
                </Suspense>
              </Route>

              <Route exact path="/sign_up">
                <Suspense fallback={loadingComponent}>
                  <SignUpComponent authViewModel={authViewModel} />
                </Suspense>
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
