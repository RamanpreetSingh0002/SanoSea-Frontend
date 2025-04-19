import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const DoctorFooterActions = () => {
  return (
    <>
      <button className="availability-btn">
        Manage Availability <FaCalendarAlt />
      </button>
      <button className="create-btn">Create Profile</button>
    </>
  );
};

export default DoctorFooterActions;
