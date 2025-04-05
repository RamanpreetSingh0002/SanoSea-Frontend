import React from "react";

const CabLocation = ({ address, type }) => {
  return (
    <div className="cab-location-item">
      <div className="cab-location-icon">
        <i className="fa-solid fa-location-dot"></i>
      </div>
      <div className="cab-location-address">
        <strong>{address}</strong>
        <p>{type} Location</p>
      </div>
    </div>
  );
};

export default CabLocation;
