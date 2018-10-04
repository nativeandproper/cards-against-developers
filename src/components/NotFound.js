import React from "react";

import "../styles/NotFound.css";

const NotFound = ({ location }) => (
  <div className="not-found">
    <div className="not-found-center">
      <h2>404</h2>
      <div className="not-found-icon" />
      <h2>Houston, we have a problem.</h2>
      <h2>
        <code> {location.pathname}</code> is not a valid fuel source.
      </h2>
    </div>
  </div>
);

export default NotFound;
