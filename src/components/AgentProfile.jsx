import React from "react";

const AgentProfile = ({ image, name, role }) => {
  return (
    <div className="doctor-agent-card">
      <div className="doctor-agent-img">
        <img src={image} alt={name} />
      </div>
      <div className="doctor-agent-details">
        <div className="doctor-port-agent">
          <h5>{name}</h5>
          <p>{role}</p>
        </div>
        <div className="doctor-agent-view-detail">
          <a href="#">View Detail</a>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
