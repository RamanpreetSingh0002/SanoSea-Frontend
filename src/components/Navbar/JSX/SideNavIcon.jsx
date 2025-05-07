import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const SideNavIcon = ({ imgSrc, to, iconClass, sideNavLabel, onClick }) => {
  const isDashboard = sideNavLabel === "Dashboard";

  return (
    <li className={`has-subnav ${isDashboard && "dashboard"}`}>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `nav-icon-button ${isActive ? "active" : ""}`
        }
      >
        <div className="nav-icon">
          <img src={imgSrc} alt="" className="nav-img" />

          {iconClass && <i className={iconClass}></i>}
        </div>
        <div className="nav-text">{sideNavLabel}</div>
        {/* <span className="nav-text">{sideNavLabel}</span> */}
      </NavLink>
    </li>
  );
};

export default SideNavIcon;
