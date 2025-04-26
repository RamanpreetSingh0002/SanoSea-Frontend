import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const DoctorFooterActions = () => {
  return (
    <>
      <button className="availability-btn">
        Manage Availability <FaCalendarAlt />
      </button>
      <button className="btn create-btn">Create Profile</button>
      <button
        style={{ width: "100%", borderRadius: "8px" }}
        className="btn cancel-btn"
      >
        Cancel
      </button>
    </>
  );
};

export default DoctorFooterActions;
