import React from "react";
import { Link } from "react-router-dom";

const AgentProfile = ({ user }) => {
  console.log(user);

  return (
    <div className="doctor-agent-card">
      <div className="doctor-agent-img">
        <img
          src={user?.profilePhoto || "/images/user.png"}
          alt="profilePhoto"
        />
      </div>
      <div className="doctor-agent-details">
        <div className="doctor-port-agent">
          <h5>{user?.fullName}</h5>
          <p>{user?.role}</p>
        </div>
        <div className="doctor-agent-view-detail">
          <Link to={"/auth/user-profile/" + user?.id}>View Detail</Link>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
