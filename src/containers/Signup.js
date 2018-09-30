import React from "react";
import { Link, withRouter } from "react-router-dom";

import apiClient from "../lib/apiClient";
import {
  invalidFirstName,
  invalidLastName,
  invalidEmail,
  invalidPassword
} from "../helpers/stringHelper";

import "../styles/LoginSignup.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountError: "",
      attemptedSubmit: false,
      email: "",
      emailHasError: false,
      firstName: "",
      firstNameHasError: false,
      lastName: "",
      lastNameHasError: false,
      password: "",
      passwordHasError: false
    };
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  isValidForm = () => {
    const firstNameHasError = invalidFirstName(this.state.firstName);
    const lastNameHasError = invalidLastName(this.state.lastName);
    const emailHasError = invalidEmail(this.state.email);
    const passwordHasError = invalidPassword(this.state.password);

    this.setState({
      emailHasError,
      firstNameHasError,
      lastNameHasError,
      passwordHasError
    });

    return (
      !firstNameHasError &&
      !lastNameHasError &&
      !emailHasError &&
      !passwordHasError
    );
  };

  validateAndSubmit = e => {
    this.setState({
      accountError: "",
      attemptedSubmit: true
    });

    if (this.isValidForm()) {
      const { firstName, lastName, email, password } = this.state;
      const request = { email, firstName, lastName, password };

      apiClient("POST", "/signup", request)
        .then(res => {
          this.props.history.push("/signup/confirmation", {
            firstName: this.state.firstName
          });
        })
        .catch(err => {
          err.text().then(errorMsg => {
            this.setState({
              accountError: errorMsg
            });
          });
        });
    } else {
      e.preventDefault();
    }
  };

  render() {
    const firstNameErrorClasses =
      this.state.attemptedSubmit && this.state.firstNameHasError
        ? `error error-show`
        : `error`;
    const lastNameErrorClasses =
      this.state.attemptedSubmit && this.state.lastNameHasError
        ? `error error-show`
        : `error`;
    const emailErrorClasses =
      this.state.attemptedSubmit && this.state.emailHasError
        ? `error error-show`
        : `error`;
    const passwordErrorClasses =
      this.state.attemptedSubmit && this.state.passwordHasError
        ? `error error-show`
        : `error`;

    return (
      <div className="login-signup">
        <h1>Sign Up</h1>
        <div className="login-signup-form">
          <div className={firstNameErrorClasses}>
            You first name cannot be empty and must be between 3 and 32
            characters
          </div>
          <input
            type="text"
            placeholder="first name"
            value={this.state.firstName}
            onChange={e => this.handleChange("firstName", e.target.value)}
          />
          <div className={lastNameErrorClasses}>
            Your last name cannot be empty and must be between 3 and 32
            characters
          </div>
          <input
            type="text"
            placeholder="last name"
            value={this.state.lastName}
            onChange={e => this.handleChange("lastName", e.target.value)}
          />
          <div className={emailErrorClasses}>
            Your email must be a valid email e.g. nativeandproper@gmail.com
          </div>
          <input
            type="text"
            placeholder="email"
            value={this.state.email}
            onChange={e => this.handleChange("email", e.target.value)}
          />
          <div className={passwordErrorClasses}>
            Your password must be between 5 and 32 characters
          </div>
          <input
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={e => this.handleChange("password", e.target.value)}
          />
          {this.state.accountError && (
            <div className="error error-show">{this.state.accountError}</div>
          )}
        </div>
        <div className="login-signup-cta">
          <button className="submit-button" onClick={this.validateAndSubmit}>
            submit
          </button>
          <div className="login-signup-text">
            Have an account?{" "}
            <Link to="/login" className="cta-link">
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
