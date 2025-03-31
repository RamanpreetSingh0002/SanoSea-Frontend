import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ to, className, children }) => {
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
};

export default CustomLink;
