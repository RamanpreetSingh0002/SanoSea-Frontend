import React from "react";

const SideNavIcon = ({ imgSrc, iconClass, sideNavLabel, onClick }) => {
  return (
    <li className="has-subnav">
      <button onClick={onClick} className="nav-icon-button">
        <div className="nav-icon">
          <img src={imgSrc} alt="" />

          {iconClass && <i className={iconClass}></i>}
        </div>
        <span className="nav-text">{sideNavLabel}</span>
      </button>
    </li>
  );
};

export default SideNavIcon;
