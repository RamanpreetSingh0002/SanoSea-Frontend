import React, { useState, useEffect } from "react";
import { useAppointments } from "../hooks";
import "./Appointments/Style/ToggleAppointment.css";
import { useLocation } from "react-router-dom";

const directions = [
  { label: "All Appointments", value: "" },
  { label: "Upcoming", value: "Upcoming" },
  { label: "Complete", value: "Complete" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "Unconfirmed", value: "Waiting" },
];

const ToggleAppointment = ({ setActiveState, activeState }) => {
  const {
    fetchAppointments,
    fetchAppointmentsForUser,
    fetchParams,
    setFetchParams,
  } = useAppointments();
  const [active, setActive] = useState(
    activeState || localStorage.getItem("activeState") || ""
  );

  useEffect(() => {
    setActive(localStorage.getItem("activeState") || "");
    // setFetchParams(prev => ({
    //   ...prev,
    //   state: "", // Ensure context also resets to default
    // }));
  }, []);

  const handleToggle = state => {
    setActive(state);
    setActiveState(state);
    localStorage.setItem("activeState", state);

    if (fetchParams.userId)
      fetchAppointmentsForUser(fetchParams.userId, 0, fetchParams.limit, state);
    else fetchAppointments(0, fetchParams.limit, state); // Fetch filtered appointments
  };

  return (
    <div className="toggle-appoint">
      <div className={`taeb-switch ${active ? active : "all"} text-center`}>
        {directions.map(item => (
          <div
            key={item.value}
            className={`taeb ${active === item.value ? "active" : ""}`}
            onClick={() => handleToggle(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleAppointment;
