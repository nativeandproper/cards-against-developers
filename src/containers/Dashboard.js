import React from "react";
import produce from "immer";
import * as R from "ramda";

import apiClient from "../lib/apiClient";
import { jwtDecode } from "../lib/localStorage";

// Components
import ApiKeyList from "../components/ApiKeyList";
import ControlButton from "../components/ControlButton";
import LoadingGif from "../components/LoadingGif";

// Styles
import "../styles/Dashboard.css";
import "../styles/Buttons.css";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      userId: null,
      apiKeys: [],
      isLoading: true,
      logoutError: "",
      createApiKeyError: "",
      deleteApiKeyError: ""
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
                draft.isLoading = false;

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
                  draft.isLoading = false;
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
              draft.isLoading = false;
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

  createApiKey = () => {
    this.setState(
      produce(draft => {
        draft.isLoading = true;
      })
    );

    apiClient("POST", `/user/${this.state.userId}/apikey`)
      .then(newApiKey => {
        this.setState(
          produce(draft => {
            draft.apiKeys.push(newApiKey);
            draft.isLoading = false;
            draft.createApiKeyError = "";
          })
        );
      })
      .catch(err => {
        err.text().then(errorMsg => {
          this.setState(
            produce(draft => {
              draft.isLoading = false;
              draft.createApiKeyError = errorMsg;
            })
          );
        });
      });
  };

  deleteApiKey = apiKeyId => {
    const confirmDelete = window.confirm("Are you sure you want to delete this key?");

    if (confirmDelete) {
      this.setState(
        produce(draft => {
          draft.isLoading = true;
        })
      );

      apiClient("DELETE", `/user/${this.state.userId}/apikey/${apiKeyId}`)
        .then(res => {
          console.log("RES FROM DELETE: ", res);
          this.setState(
            produce(draft => {
              draft.isLoading = false;
              draft.deleteApiKeyError = "";
            })
          );
        })
        .catch(err => {
          err.text().then(errorMsg => {
            this.setState(
              produce(draft => {
                draft.deleteApiKeyError = errorMsg;
              })
            );
          })
        });
    }
  };

  renderErrors = () => {
    const errors = [];
    let errCount = 0;

    if (this.state.createApiKeyError) {
      errors.push(
        <div key={`error-${++errCount}`}>
          {this.state.createApiKeyError}
        </div>
      );
    }

    if (this.state.deleteApiKeyError) {
      errors.push(
        <div key={`error-${++errCount}`}>
          {this.state.deleteApiKeyError}
        </div>
      );
    }

    if (this.state.logoutError) {
      errors.push(
        <div key={`error-${++errCount}`}>
          {this.state.logoutError}
        </div>
      );
    }

    return errors.length > 0 ? (
      <div className="dashboard-errors">
        {errors}
      </div>
    ) : null;
  }

  renderDashboardBody = () => {
    if (this.state.isLoading) {
      return (
        <div className="dashboard-body">
          <LoadingGif text={`loading...`} />
        </div>
      );
    } else {
      const dashboardErrorsEl = this.renderErrors();
      const activeApiKeys = this.state.apiKeys.filter(apiKey => {
        return !apiKey.deleted_at;
      });

      return (
        <div className="dashboard-body">
          {dashboardErrorsEl}
          <div className="dashboard-controls">
            <ControlButton
              text={`create api key`}
              iconClasses={`fas fa-plus-circle`}
              clickAction={this.createApiKey}
            />
          </div>
          <ApiKeyList
            apiKeys={activeApiKeys}
            copyApiKey={this.copyApiKey}
            deleteApiKey={this.deleteApiKey}
          />
        </div>
      );
    }
  };

  // TODO: add logout error handling
  render() {
    const dashboardBodyEl = this.renderDashboardBody();

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

        {dashboardBodyEl}
      </div>
    );
  }
}
