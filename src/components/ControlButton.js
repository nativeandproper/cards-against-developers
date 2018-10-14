import React from "react";

const ControlButton = props => (
  <a className="common-button control-button" onClick={props.clickAction}>
    <i className={props.iconClasses} />
    <div className="control-button-text">
      {props.text}
    </div>
  </a>
);

export default ControlButton;