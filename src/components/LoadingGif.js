import React from "react";

// Styles
import "../styles/LoadingGif.css";

const LoadingGif = (props) => (
  <div className="loading-gif">
    <div className="loading-gif-gif" />
    <div className="loading-gif-text">
      <b>{props.text}</b>
    </div>
  </div>
);

export default LoadingGif;