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
          console.log("ERROR MSG FROM LOGGING OUT***:", errorMsg);
          this.setState({
            logoutError: errorMsg
          });
        });
      });
  };

  // TODO: this is here to test the auth middleware; can be removed after testing.
  componentDidMount = () => {
    apiClient("GET", "/user/29/apikey")
      .then(res => {
        console.log("RES FROM FETCHING API KEYS***:", res);
      })
      .catch(err => {
        err.text().then(errorMsg => {
          console.log("ERROR MSG FROM FETCHING API KEYS:", errorMsg);
        });
      });
  };

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
