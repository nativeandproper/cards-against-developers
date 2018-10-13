import React from "react";
import * as R from "ramda";

// Components
import ApiKeyListItem from "./ApiKeyListItem";
import LoadingGif from "../components/LoadingGif";

const ApiKeyList = props => {
  if (props.isLoading) {
    return (
      <div className="api-key-list">
        <LoadingGif text={`loading...`} />
      </div>
    );
  }

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
      no api keys
    </div>
  );
};

export default ApiKeyList;