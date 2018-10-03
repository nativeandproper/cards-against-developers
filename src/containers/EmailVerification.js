import React from "react";
import apiClient from "../lib/apiClient";

export default class EmailVerification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidConfirmation: false,
      confirmationError: ""
    };
  }

  componentDidMount = () => {
    console.log("params", this.props.match.params);
    const request = {
      verification_token: this.props.match.params.emailConfirmationId
    };

    apiClient("PUT", "/signup", request)
      .then(res => {
        console.log("RES", res);
      })
      .catch(err => {
        console.log("ERR", err);
        // err.text().then(errorMsg => {
        //   this.setState({
        //     confirmationError: errorMsg
        //   });
        // });
      });
  };

  render() {
    console.log("skeep");
    return (
      <div className="pre-confirmation">
        <h1>Preconfirmation page</h1>
        <p>Email has been verified. You're good to start accessing the API.</p>
      </div>
    );
  }
}
