import React from "react";
import { Link } from "react-router-dom";
import produce from "immer";

import apiClient from "../lib/apiClient";

import { invalidEmail } from "../helpers/stringHelper";

import "../styles/LoginSignup.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      loginError: "",
      password: ""
    };
  }

  handleChange = (key, value) => {
    this.setState(
      produce(draft => {
        draft[key] = value;
      })
    );
  };

  login = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const request = { email, password };

    // invalid email
    if (invalidEmail(this.state.email)) {
      this.setState(
        produce(draft => {
          draft.loginError =
            "email must be less than 32 characters and contain an '@' sign";
        })
      );

      return;
    }

    apiClient("POST", "/login", request, { rawRes: true })
      .then(res => {
        const authHeader = res.headers.get("Authorization");
        if (!authHeader) {
          this.setState(
            produce(draft => {
              draft.loginError = "error authentication failed";
            })
          );
        }

        localStorage.setItem("cah-token", authHeader);

        this.props.history.push("/dashboard/api-keys", {
          firstName: this.state.firstName
        });
      })
      .catch(err => {
        err.text().then(errorMsg => {
          this.setState(
            produce(draft => {
              draft.loginError = errorMsg;
            })
          );
        });
      });
  };

  render() {
    return (
      <div className="login-signup">
        <h1>Log In</h1>
        <div className="login-signup-form">
          <form onSubmit={this.login}>
            <input
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={e => this.handleChange("email", e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={e => this.handleChange("password", e.target.value)}
            />
            {this.state.loginError && (
              <div className="error error-show">{this.state.loginError}</div>
            )}
            <button
              type="submit"
              className="submit-button"
              onClick={this.login}
            >
              login
            </button>
          </form>
        </div>
        <div className="login-signup-cta">
          <div className="login-signup-text">
            No account?{" "}
            <Link to="/signup" className="cta-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
