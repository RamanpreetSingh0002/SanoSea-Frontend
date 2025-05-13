import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const SideNavIcon = ({ imgSrc, to, iconClass, sideNavLabel, onClick }) => {
  const isDashboard = sideNavLabel === "Dashboard";
  const isBookNow = sideNavLabel === "Book Now";

  // Store active route persistently
  useEffect(() => {
    if (window.location.pathname === to) {
      localStorage.setItem("activeNav", to); // Store active page
    }
  }, [to]);

  return (
    <li className={`has-subnav ${isDashboard && "dashboard"}`}>
      <NavLink
        to={to}
        onClick={() => {
          localStorage.setItem("activeNav", to); // Update active state on click
          onClick && onClick();
        }}
        className={({ isActive }) =>
          `nav-icon-button ${
            (isActive || localStorage.getItem("activeNav") === to) && !isBookNow
              ? "active"
              : ""
          }`
        }
      >
        <div className="nav-icon">
          <img
            src={
              isDashboard && localStorage.getItem("activeNav") === to
                ? "/images/grid-white.png"
                : imgSrc
            }
            alt=""
            className="nav-img"
          />

          {iconClass && <i className={iconClass}></i>}
        </div>
        <div className="nav-text">{sideNavLabel}</div>
        {/* <span className="nav-text">{sideNavLabel}</span> */}
      </NavLink>
    </li>
  );
};

export default SideNavIcon;
