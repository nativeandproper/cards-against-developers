import React from "react";
import produce from "immer";
import * as R from "ramda";

import apiClient from "../lib/apiClient";
import { jwtDecode } from "../lib/localStorage";

// Styles
import "../styles/Dashboard.css";
import "../styles/ButtonLink.css";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      userId: null,
      apiKeys: [],
      logoutError: ""
    };
  }

  componentDidMount() {
    const authToken = localStorage.getItem("cah-token");

    if (!authToken) {
      // TODO: check if token exists and handle
    }

    const decoded = jwtDecode(authToken);

    this.setState(
      produce(draft => {
        draft.firstName = decoded.payload.first_name;
        draft.lastName = decoded.payload.last_name;
        draft.email = decoded.payload.email;
        draft.userId = decoded.payload.id;
      }),
      () => {
        apiClient("GET", `/user/${decoded.payload.id}/apikey`)
          .then(apikeys => {
            // TODO: null -> [], remove check below
            this.setState(
              produce(draft => {
                if (R.isNil(apikeys)) {
                  draft.apiKeys = [];
                } else {
                  draft.apiKeys = apikeys;
                }
              })
            );
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
      }
    );
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
    // TODO: delete request
    console.log("DELETE req: ", apiKeyId);
  };

  renderApiKeys = () => {
    const { apiKeys } = this.state;

    if (R.isEmpty(apiKeys)) {
      return (
        <div>no keys</div>
      );
    }

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
