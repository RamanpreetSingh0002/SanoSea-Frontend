import React, { useState, useEffect } from "react";
// import "./ToggleAppointment.css"; // if you moved your styles to a CSS file

const directions = [
  { label: "All Appointments", value: "left" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Complete", value: "complete" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Newly Booked", value: "unconfirmed" },
];

const ToggleAppointment = () => {
  const [active, setActive] = useState("left");

  return (
    <div className="toggle-appoint">
      <div className={`taeb-switch ${active} text-center`}>
        {directions.map((item) => (
          <div
            key={item.value}
            className={`taeb ${active === item.value ? "active" : ""}`}
            onClick={() => setActive(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleAppointment;
