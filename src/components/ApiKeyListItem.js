import React from "react";

// Components
import FAIcon from "./FAIcon";

const ApiKeyListItem = props => {
  return (
    <div className="api-key-item">
      <div className="api-key-content">
        <div className="api-key">
          <b>API Key: </b>
          {props.apiKey}
        </div>
        <div className="created-at">
          <i>Created: </i>
          {props.createdAt}
        </div>
      </div>
      <div className="api-key-actions">
        <FAIcon
          clickAction={props.copyApiKey}
          showFeedback={true}
          iconClasses={`api-key-icon fas fa-copy`}
        />
        <FAIcon
          clickAction={props.deleteApiKey}
          iconClasses={`api-key-icon fas fa-trash-alt`}
        />
      </div>
    </div>
  );
};

export default ApiKeyListItem;