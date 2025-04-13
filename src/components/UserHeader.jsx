import React from "react";
import LabeledIconText from "./LabeledIconText";

const UserHeader = ({ imgSrc, name, role, experience, children }) => {
  return (
    <div className="user-header-section">
      <div className="user-header-avtar">
        <img src={imgSrc} alt="person" />
      </div>
      <div className="user-header-info">
        <div className="user-header-detail">
          <h5>{name}</h5>
          <p>
            <span>{role}</span> {experience && experience}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default UserHeader;
