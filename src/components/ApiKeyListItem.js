import React from "react";

const ApiKeyListItem = props => (
  <div className="api-key-item">
    <div className="api-key">
      <div>
        <b>API Key: </b>
        {props.apiKey}
      </div>
      <div className="created-at">
        <i>Created: </i>
        {props.createdAt}
      </div>
    </div>
    <div className="api-key-actions">
      <a onClick={props.copyApiKey}>
        <i className="api-icon fas fa-copy" />
      </a>
      <a onClick={props.deleteApiKey}>
        <i className="api-icon fas fa-trash-alt" />
      </a>
    </div>
  </div>
);

export default ApiKeyListItem;