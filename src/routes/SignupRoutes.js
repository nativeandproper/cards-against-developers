import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

// Components
import Signup from "../containers/Signup";
import SignupConfirmation from "../containers/SignupConfirmation";
import EmailVerification from "../containers/EmailVerification";

const SignupRoutes = ({ match }) => (
  <Switch>
    <Route exact={true} path={match.url} component={Signup} />
    <Route
      exact={false}
      strict={true}
      path={`${match.url}/confirmation/:confirmationID`}
      render={props => <EmailVerification {...props} />}
    />
    <Route
      exact={true}
      path={`${match.url}/confirmation`}
      render={props => {
        return props.location.state ? (
          <SignupConfirmation {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  </Switch>
);

export default withRouter(SignupRoutes);
