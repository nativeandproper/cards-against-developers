import React from "react";

import LoadingGif from "../components/LoadingGif";

// Styles
import "../styles/LoadingPage.css"

const LoadingPage = () => (
  <div id="app" className="loading-page">
    <LoadingGif gifFileName={"main_loading"} />
  </div>
);

export default LoadingPage;