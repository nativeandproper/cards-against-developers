import React from "react";
import produce from "immer";

import apiClient from "../lib/apiClient";

// Styles
import "../styles/Dashboard.css";
import "../styles/ButtonLink.css";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKeys: [],
      logoutError: ""
    };
  }

  componentDidMount() {
    apiClient("GET", "/user/29/apikey")
      .then(apikeys => {
        this.setState(
          produce(draft => {
            draft.apiKeys = apikeys;
          })
        );
      })
      .catch(err => {
        console.log("dashboard err", err);
        err.text().then(errorMsg => {
          this.setState(
            produce(draft => {
              draft.logoutError = errorMsg;
            })
          );
        });
      });
  }

  onLogout = () => {
    apiClient("POST", "/logout")
      .then(res => {
        localStorage.removeItem("cah-token");
        this.props.history.push("/login", null);
      })
      .catch(err => {
        err.text().then(errorMsg => {
          this.setState(
            produce(draft => {
              draft.logoutError = errorMsg;
            })
          );
        });
      });
  };

  copyApiKey = apiKey => {
    const textArea = document.createElement("textarea");
    textArea.value = apiKey;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  deleteApiKey = apiKeyId => {
    console.log("DELETE req: ", apiKeyId);
  };

  renderApiKeys = () => {
    const { apiKeys } = this.state;

    return apiKeys
      .filter(apiKey => {
        return !apiKey.deleted_at;
      })
      .map((apiKey, idx) => {
        return (
          <div className="api-key-item" key={idx}>
            <div className="api-key">
              <div>
                <b>API Key: </b>
                {apiKey.api_key}
              </div>
              <div className="created-at">
                <i>Created: </i>
                {apiKey.created_at}
              </div>
            </div>
            <div className="api-key-actions">
              <a onClick={() => this.copyApiKey(apiKey.api_key)}>
                <i className="api-icon fas fa-copy" />
              </a>
              <a onClick={() => this.deleteApiKey(apiKey.id)}>
                <i className="api-icon fas fa-trash-alt" />
              </a>
            </div>
          </div>
        );
      });
  };

  // TODO: add logout error handling
  render() {
    const apiKeyEls = this.renderApiKeys();

    return (
      <div className="dashboard">
        <div className="dashboard-nav">
          <a className="nav-button" onClick={this.onLogout}>
            log out
          </a>
        </div>

        <div className="dashboard-header">
          <h1>Developer Portal</h1>
          <div className="dashboard-secondary-nav">
            <a href="">api keys</a>
            <a href="">stats</a>
            <a href="">settings</a>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="api-key-list">{apiKeyEls}</div>
        </div>
      </div>
    );
  }
}
