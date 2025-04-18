import React from "react";
import TRow from "../../TRow.jsx";

const PortAgentTbody = () => {
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
        statusLabel="cancelled"
        actionType="View Detail"
        isPortAgent="true"
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
        actionType="View Detail"
        isPortAgent="true"
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
        actionType="View Detail"
        isPortAgent="true"
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
        actionType="View Detail"
        isPortAgent="true"
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
        actionType="View Detail"
        isPortAgent="true"
      />
    </tbody>
  );
};

export default PortAgentTbody;
