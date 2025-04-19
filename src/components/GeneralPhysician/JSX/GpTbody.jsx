import React from "react";
import TRow from "../../TRow.jsx";

const GpTbody = () => {
  return (
    <tbody>
      <TRow
        patientImg="../images/male-dummy-img.png"
        patientName="Tiana Calzoni"
        doctorImg="../images/male-doctor-1.jpg"
        doctorName="Dr.Mehta"
        portAgentImg="../images/male-1.jpg"
        portAgentName="Rahul"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="cancelled"
        statusLabel="Complete"
      />

      <TRow
        patientImg="../images/male-2.jpg"
        patientName="Brandon Rhiel Madsen"
        doctorImg="../images/male-doctor-2.jpg"
        doctorName="Dr.Vikram"
        portAgentImg="../images/female-1.jpg"
        portAgentName="Jasbir"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="upcoming"
        statusLabel="Upcoming"
      />

      <TRow
        patientImg="../images/male-1.jpg"
        patientName="Marcus Dorwat"
        doctorImg="../images/doctor-female-1.jpg"
        doctorName="Dr.Vamika"
        portAgentImg="../images/male-3.jpg"
        portAgentName="Gurjot Singh"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="past"
        statusLabel="Past"
      />

      <TRow
        patientImg="../images/male-3.jpg"
        patientName="Kadin Ekstrom Bothman"
        doctorImg="../images/male-doctor-2.jpg"
        doctorName="Dr.Sandeep"
        portAgentImg="../images/male-5.jpg"
        portAgentName="Aman"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="waiting"
        statusLabel="Waiting"
      />

      <TRow
        patientImg="../images/male-5.jpg"
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
