import React from "react";
import Bits from "../../Bits";

const CardGrid = () => {
  return (
    <div className="card-grid">
      <div className="row">
        <Bits
          col="6"
          heading="Registered Patients"
          count="50"
          image="/images/Patient.png"
        />

        <Bits
          col="6"
          heading="Upcoming Appointments"
          count="15"
          iconClass="fa-brands fa-microsoft"
        />

        <Bits
          col="6"
          heading="Port Agents Added"
          count="22"
          image="/images/Port_Agent.png"
        />

        <Bits
          col="6"
          heading="New Appointment"
          count="22"
          iconClass="fa-solid fa-circle-check"
        />

        <Bits
          col="6"
          heading="Doctor Added"
          count="15"
          image="/images/Doctor.png"
        />

        <Bits
          col="6"
          heading="Cancelled Appointments"
          count="45"
          iconClass="fa-solid fa-circle-xmark"
        />
      </div>
    </div>
  );
};

export default CardGrid;
