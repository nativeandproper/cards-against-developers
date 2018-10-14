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
    const errorEls = this.props.errors.map((error, idx) => (
      <div key={`error-${idx + 1}`}>
        {error.msg}
      </div>
    ));

    return errorEls.length > 0 ? (
      <div className="dashboard-errors">
        {errorEls}
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

    const dashboardErrorsEl = this.renderErrors();
    const activeApiKeys = this.props.apiKeys.filter(apiKey => !apiKey.deleted_at);

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