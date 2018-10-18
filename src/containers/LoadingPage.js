import React from "react";

import LoadingGif from "../components/LoadingGif";

// Styles
import "../styles/LoadingPage.css"

const LoadingPage = () => (
  <div className="loading-page">
    <LoadingGif text={`loading...`} />
  </div>
);

export default LoadingPage;