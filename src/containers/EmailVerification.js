import React from "react";
import apiClient from "../lib/apiClient";
import produce from "immer";

// Components
import ButtonLink from "../components/ButtonLink";

// Styles
import "../styles/Buttons.css";
import "../styles/EmailVerification.css";

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
        this.setState(
          produce(draft => {
            draft.confirmationError = errorMsg;
          })
        );
      });
    });
  };

  render() {
    if (this.state.confirmationError) {
      return (
        <div className="email-verification">
          <h1>Oh no!</h1>
          <div className="not-bud-img cover-img" />
          <h1>
            {`For whatever reason, this email can't be validated. Please try the
            link again.`}
          </h1>
          <p>
            {`If the problem persists, `}
            <a href="mailto:nativeandproper@gmail.com">contact us</a>{" "}
            {`and we'll
            get to the bottom (or top) of it.`}
          </p>
        </div>
      );
    } else {
      return (
        <div className="email-verification">
          <h1>Hey Bud!</h1>
          <h1>(glad I can call you that now)</h1>
          <div className="thanks-bud-img cover-img" />
          <p>Your email has been verified.</p>
          <ButtonLink to="/dashboard" classes="common-button nav-button" name="dashboard" />
        </div>
      );
    }
  }
}
