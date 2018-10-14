import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import produce from "immer";
import * as R from "ramda";

import apiClient from "../lib/apiClient";
import { jwtDecode } from "../lib/localStorage";

// Components
import DashboardApiKeys from "./DashboardApiKeys";
import DashboardStats from "./DashboardStats";
import DashboardUserSettings from "./DashboardUserSettings";

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
      error: ""
    };
  }

  componentDidMount() {
    this.setState(
      produce(draft => {
        draft.isLoading = true;
      })
    );

    const authToken = localStorage.getItem("cah-token");

    if (!authToken) {
      // TODO: check if token exists and handle
    }

    const decoded = jwtDecode(authToken);

    if (decoded === null) {
      this.setState(
        produce(draft => {
          draft.error = "Error fetching your information. Please refresh the page.";
        })
      );
    }

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
                draft.error = "";

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
                  draft.error = errorMsg;
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
              draft.error = errorMsg;
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

    document.execCommand("copy");
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
            draft.error = "";
          })
        );
      })
      .catch(err => {
        err.text().then(errorMsg => {
          this.setState(
            produce(draft => {
              draft.isLoading = false;
              draft.error = errorMsg;
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
          this.setState(
            produce(draft => {
              draft.apiKeys = this.state.apiKeys.filter((apiKey) => apiKey.id !== apiKeyId);
              draft.isLoading = false;
              draft.error = "";
            })
          );
        })
        .catch(err => {
          err.text().then(errorMsg => {
            this.setState(
              produce(draft => {
                draft.isLoading = false;
                draft.error = errorMsg;
              })
            );
          })
        });
    }
  };

  render() {
    return (
      <Router>
        <div className="dashboard">
          <div className="dashboard-nav">
            <a className="common-button nav-button" onClick={this.onLogout}>
              log out
            </a>
          </div>

          <div className="dashboard-header">
            <h1>Developer Portal</h1>
            <div className="dashboard-secondary-nav">
              <Link to="/dashboard/api-keys">api keys</Link>
              <Link to="/dashboard/stats">stats</Link>
              <Link to="/dashboard/settings">settings</Link>
            </div>
          </div>

          <Route
            path="/dashboard/api-keys"
            render={props => (
              <DashboardApiKeys
                {...props}
                apiKeys={this.state.apiKeys}
                copyApiKey={this.copyApiKey}
                createApiKey={this.createApiKey}
                deleteApiKey={this.deleteApiKey}
                error={this.state.error}
                isLoading={this.state.isLoading}
              />
            )}
          />
          <Route
            path="/dashboard/stats"
            component={DashboardStats}
          />
          <Route
            path="/dashboard/settings"
            component={DashboardUserSettings}
          />
        </div>
      </Router>
    );
  }
}
