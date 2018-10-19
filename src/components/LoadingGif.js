import React from "react";
import * as R from "ramda";

// Styles
import "../styles/LoadingGif.css";

// Gifs
import main_loading from "../assets/gifs/main_loading.gif";
import loading from "../assets/gifs/loading.gif";

const loadingGifs = {
  main_loading: main_loading,
  loading: loading
};

const LoadingGif = (props) => {
  const loadingGif = props.gifFileName
    ? R.propOr(loading, props.gifFileName)(loadingGifs)
    : loading;
  const loadingGifStyles = {
    backgroundImage: `url(${loadingGif})`
  };

  return (
    <div className="loading-gif">
      <div className="loading-gif-gif" style={loadingGifStyles} />
      <div className="loading-gif-text">
        <b>{props.text}</b>
      </div>
    </div>
  );
};

export default LoadingGif;