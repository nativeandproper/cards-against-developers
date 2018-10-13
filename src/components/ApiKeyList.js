import React from "react";
import * as R from "ramda";

// Components
import ApiKeyListItem from "./ApiKeyListItem";

const ApiKeyList = props => {
  if (!R.isEmpty(props.apiKeys)) {
    const apiKeyListItems = props.apiKeys.map((apiKey, idx) => (
      <ApiKeyListItem
        apiKey={apiKey.api_key}
        createdAt={apiKey.created_at}
        copyApiKey={() => props.copyApiKey(apiKey.api_key)}
        deleteApiKey={() => props.deleteApiKey(apiKey.id)}
        key={idx}
      />
    ));

    return (
      <div className="api-key-list">
        {apiKeyListItems}
      </div>
    );
  }

  return (
    <div className="api-key-list">
      {`Looks like you don't have any API Keys yet. Start by creating one above!`}
    </div>
  );
};

export default ApiKeyList;