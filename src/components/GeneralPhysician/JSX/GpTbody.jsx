import React from "react";
import TRow from "../../TRow.jsx";

const GpTbody = () => {
  return (
    <tbody>
      <TRow
        patientImg="../images/male-dummy-img.png"
        patientName="Tiana Calzoni"
        doctorImg="../images/doctor-female-dummy-img.png"
        doctorName="Jaydon Bator"
        portAgentImg="../images/male-dummy-img.png"
        portAgentName="Tiana Calzoni"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="cancelled"
        statusLabel="Complete"
      />

      <TRow
        patientImg="../images/male-dummy-img.png"
        patientName="Brandon Rhiel Madsen"
        doctorImg="../images/doctor-female-dummy-img.png"
        doctorName="Jaydon Bator"
        portAgentImg="../images/male-dummy-img.png"
        portAgentName="Tiana Calzoni"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="upcoming"
        statusLabel="Upcoming"
      />

      <TRow
        patientImg="../images/male-dummy-img.png"
        patientName="Marcus Dorwat"
        doctorImg="../images/doctor-female-dummy-img.png"
        doctorName="Jaydon Bator"
        portAgentImg="../images/male-dummy-img.png"
        portAgentName="Tiana Calzoni"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="past"
        statusLabel="Past"
      />

      <TRow
        patientImg="../images/male-dummy-img.png"
        patientName="Kadin Ekstrom Bothman"
        doctorImg="../images/doctor-female-dummy-img.png"
        doctorName="Jaydon Bator"
        portAgentImg="../images/male-dummy-img.png"
        portAgentName="Tiana Calzoni"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="waiting"
        statusLabel="Waiting"
      />

      <TRow
        patientImg="../images/male-dummy-img.png"
        patientName="Brandon Rhiel Madsen"
        doctorImg="../images/doctor-female-dummy-img.png"
        doctorName="Jaydon Bator"
        portAgentImg="../images/male-dummy-img.png"
        portAgentName="Tiana Calzoni"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="new"
        statusLabel="New"
      />
    </tbody>
  );
};

export default GpTbody;
