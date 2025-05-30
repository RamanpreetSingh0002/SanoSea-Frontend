import React from "react";
import TRow from "../../TRow";

const ManagementTbody = () => {
  return (
    <tbody>
      <TRow
        patientImg="../images/female-2.jpg"
        patientName="Tiana"
        doctorImg="../images/male-doctor-2.jpg"
        doctorName="Dr.Sandeep"
        portAgentImg="../images/male-4.jpg"
        portAgentName="Aman"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="cancelled"
        statusLabel="Complete"
        actionType="View Detail"
      />

      <TRow
        patientImg="../images/male-dummy-img.png"
        patientName="Brandon Rhiel Madsen"
        doctorImg="../images/doctor-female-1.jpg"
        doctorName="Dr.Vamika"
        portAgentImg="../images/male-3.jpg"
        portAgentName="Tiana Calzoni"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="upcoming"
        statusLabel="Upcoming"
        actionType="View Detail"
      />

      <TRow
        patientImg="../images/male-6.jpg"
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
      />
    </tbody>
  );
};

export default ManagementTbody;
