import React, { useState, useEffect } from "react";
import { useAppointments } from "../hooks";
import "./Appointments/Style/ToggleAppointment.css";

const directions = [
  { label: "All Appointments", value: "" },
  { label: "Upcoming", value: "Upcoming" },
  { label: "Complete", value: "Complete" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "Newly Booked", value: "Waiting" },
];

const ToggleAppointment = () => {
  const { fetchAppointments, fetchParams } = useAppointments();
  const [active, setActive] = useState(fetchParams.state || "");

  const handleToggle = state => {
    setActive(state);
    fetchAppointments(fetchParams.pageNo, fetchParams.limit, state); // Fetch filtered appointments
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
