import React from "react";

import { withAuthContext } from "../lib/contextLib";

// Components
import ApiKeyList from "../components/ApiKeyList";
import ControlButton from "../components/ControlButton";
import LoadingGif from "../components/LoadingGif";

// Styles
import "../styles/Buttons.css";

class DashboardApiKeys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderError = () => {
    return this.props.error ? (
      <div className="dashboard-errors">
        <div>
          {this.props.error}
        </div>
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
    }

    const dashboardErrorEl = this.renderError();
    const activeApiKeys = this.props.apiKeys.filter(apiKey => !apiKey.deleted_at);

    return (
      <div className="dashboard-body">
        {dashboardErrorEl}
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

export default withAuthContext(DashboardApiKeys);