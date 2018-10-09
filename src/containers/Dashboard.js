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
    // TODO: make GET request here for api keys
    this.setState(
      produce(draft => {
        draft.apiKeys = [{"id":12,"api_key":"knIPKsshNCMmvmW8ISIh4l8T9lr60kPDjzcSTfP5MVs=","created_at":"2018-10-04T17:50:17.786205Z","deleted_at":null},{"id":13,"api_key":"UdogxNDHi6UEKmvgUr11kxmhNnQPwIVlGO2kVLvr/aY=","created_at":"2018-10-04T18:02:57.458858Z","deleted_at":"2018-10-04T18:38:45.805715Z"},{"id":14,"api_key":"Gfs3Zud4G1i7b+YoncR8cTc3e1JajAoTuylhzY6TrGk=","created_at":"2018-10-04T18:42:11.771701Z","deleted_at":null},{"id":11,"api_key":"OOCpTkkTqo29tREUTFX+Yi+8Kwdk2iWUMx2JJ06Jd0A=","created_at":"2018-10-04T17:49:34.293472Z","deleted_at":"2018-10-04T19:03:43.022139Z"}];
      })
    );
  }

  onLogout = () => {
    apiClient("POST", "/logout")
      .then(res => {
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

  copyApiKey = (apiKey) => {
    const textArea = document.createElement("textarea");
    textArea.value = apiKey;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  deleteApiKey = (apiKeyId) => {
    console.log('DELETE req: ', apiKeyId);
  };

  renderApiKeys = () => {
    const {apiKeys} = this.state;

    return apiKeys.filter((apiKey) => {
      return !apiKey.deleted_at
    }).map((apiKey, idx) => {
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
          <div className="api-key-list">
            {apiKeyEls}
          </div>
        </div>
      </div>
    );
  }
}
