import React from "react";

// styles
import "../styles/NotFound.css";

const NotFound = ({ location }) => (
  <div className="not-found">
    <div className="not-found-center">
      <div className="not-found-icon" />
      <h1>Man on Fire!</h1>
      <h2>
        URL <code> {location.pathname}</code> Not Found.
      </h2>
    </div>
  </div>
);

export default NotFound;
