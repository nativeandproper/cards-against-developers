import React from "react";
import { NavLink } from "react-router-dom";

const ButtonLink = props => (
  <NavLink to={props.to} className={`common-button nav-button ${props.classes}`}>
    {props.name}
  </NavLink>
);

export default ButtonLink;
