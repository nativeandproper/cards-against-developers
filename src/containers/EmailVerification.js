import React from "react";
import apiClient from "../lib/apiClient";

import ButtonLink from "../components/ButtonLink";

export default class EmailVerification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmationError: ""
    };
  }

  componentDidMount = () => {
    const request = {
      verification_token: this.props.match.params.emailConfirmationId
    };

    apiClient("PUT", "/signup", request).catch(err => {
      err.text().then(errorMsg => {
        this.setState({
          confirmationError: errorMsg
        });
      });
    });
  };

  render() {
    return (
      <div className="pre-confirmation">
        <h1>Email Verification</h1>
        {this.state.confirmationError && (
          <div>
            <h2>Sorry, this email confirmation code can't be validated.</h2>
            <h3>{this.state.confirmationError}</h3>
          </div>
        )}

        {!this.state.confirmationError && (
          <div>
            <p>Email has been verified.</p>
            <ButtonLink to="/dashboard" classes="nav-button" name="dashboard" />
          </div>
        )}
      </div>
    );
  }
}
