import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuthenticated }) => {
      return (
        <Route {...rest} render={(props) => (
          isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{
              pathname: "/",
              state: { from: props.location }
            }}/>
        )} />
      );
    }}
  </AuthConsumer>
);

export default ProtectedRoute;