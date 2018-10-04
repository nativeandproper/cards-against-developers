import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import "../styles/ButtonLink.css";

const ButtonLink = props => (
  <NavLink to={props.to} className={`nav-button ${props.classes}`}>
    {props.name}
  </NavLink>
);

export default ButtonLink;
