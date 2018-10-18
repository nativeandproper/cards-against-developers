import React from "react";

import { withAuthContext } from "./lib/contextLib";
import LoadingPage from "./containers/LoadingPage";
import Routes from "./Routes";

class App extends React.Component {
  render() {
    return this.props.checkingAuthentication
      ? <LoadingPage />
      : <Routes />;
  }
}

export default withAuthContext(App);