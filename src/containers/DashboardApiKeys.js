import React from "react";

// Components
import ApiKeyList from "../components/ApiKeyList";
import ControlButton from "../components/ControlButton";
import LoadingGif from "../components/LoadingGif";

// Styles
import "../styles/Buttons.css";

export default class DashboardApiKeys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderErrors = () => {
    const errors = [];
    let errCount = 0;

    if (this.props.createApiKeyError) {
      errors.push(
        <div key={`error-${++errCount}`}>
          {this.props.createApiKeyError}
        </div>
      );
    }

    if (this.props.deleteApiKeyError) {
      errors.push(
        <div key={`error-${++errCount}`}>
          {this.props.deleteApiKeyError}
        </div>
      );
    }

    if (this.props.logoutError) {
      errors.push(
        <div key={`error-${++errCount}`}>
          {this.props.logoutError}
        </div>
      );
    }

    return errors.length > 0 ? (
      <div className="dashboard-errors">
        {errors}
      </div>
    ) : null;
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div className="dashboard-body">
          <LoadingGif text={`loading...`} />
        </div>
      );
    } else {
      const dashboardErrorsEl = this.renderErrors();
      const activeApiKeys = this.props.apiKeys.filter(apiKey => {
        return !apiKey.deleted_at;
      });

      return (
        <div className="dashboard-body">
          {dashboardErrorsEl}
          <div className="dashboard-controls">
            <ControlButton
              text={`create api key`}
              iconClasses={`fas fa-plus-circle`}
              clickAction={this.props.createApiKey}
            />
          </div>
          <ApiKeyList
            apiKeys={activeApiKeys}
            copyApiKey={this.props.copyApiKey}
            deleteApiKey={this.props.deleteApiKey}
          />
        </div>
      );
    }
  }
}