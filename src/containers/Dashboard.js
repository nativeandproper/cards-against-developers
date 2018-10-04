import React from "react";

import apiClient from "../lib/apiClient";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutError: ""
    };
  }

  onLogout = () => {
    apiClient("POST", "/logout")
      .then(res => {
        this.props.history.push("/login", null);
      })
      .catch(err => {
        err.text().then(errorMsg => {
          this.setState({
            logoutError: errorMsg
          });
        });
      });
  };

  // TODO: add error handling from logout
  render() {
    return (
      <div className="dashboard">
        <button className="nav-button" onClick={this.onLogout}>
          Log Out
        </button>
        <h1>Dashboard</h1>
      </div>
    );
  }
}
