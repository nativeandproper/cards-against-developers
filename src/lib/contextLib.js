import React from "react";
import { AuthConsumer } from "../AuthContext";

const withAuthContext = (Component) => {
  return (props) => (
    <AuthConsumer>
      {(authContext) => (
        <Component {...props} {...authContext} />
      )}
    </AuthConsumer>
  )
}

export { withAuthContext };