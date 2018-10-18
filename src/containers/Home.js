import React from "react";

import { withAuthContext } from "../lib/contextLib";

// Components
import ButtonLink from "../components/ButtonLink";

// Styles
import "../styles/Buttons.css";
import "../styles/Home.css";

class Home extends React.Component {
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard/api-keys");
    }
  }
  
  render() {
    return (
      <div className="home">
        <div className="home-nav">
          <ButtonLink to="/about" name="about" />
          <a href="https://www.gitbook.com/" target="_blank" rel="noopener noreferrer" className="common-button nav-button">
            docs
          </a>
        </div>
        <div className="home-center">
          <div className="motto">
            <h2>
              a RESTful api for <b>bad</b> developers and{" "}
              <b>
                <i>even</i> worse
              </b>{" "}
              human beings.
            </h2>
          </div>
          {!this.props.isAuthenticated && (
            <div className="login-signup-buttons">
              <ButtonLink to="/login" name="log in" />
              <ButtonLink to="/signup" name="sign up" />
            </div>
          )}
        </div>
        <div className="title">
          <h1>cards against developers</h1>
        </div>
      </div>
    );
  }
}

export default withAuthContext(Home);