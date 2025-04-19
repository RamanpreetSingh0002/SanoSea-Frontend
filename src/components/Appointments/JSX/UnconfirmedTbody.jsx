import React from "react";
import TRow from "../../TRow";

const UnconfirmedTbody = () => {
  return (
    <tbody>
      <TRow
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
        doctorImg="../images/male-doctor-1.jpg"
        doctorName="Dr.Mehta"
        portAgentImg="../images/male-1.jpg"
        portAgentName="Rahul"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="waiting"
        statusLabel="Waiting"
        actionType="View Detail"
      />

      <TRow
        doctorImg="../images/male-doctor-2.jpg"
        doctorName="Dr.Vikram"
        portAgentImg="../images/female-1.jpg"
        portAgentName="Jasbir"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="waiting"
        statusLabel="Waiting"
        actionType="View Detail"
      />

      <TRow
        doctorImg="../images/doctor-female-1.jpg"
        doctorName="Dr.Vamika"
        portAgentImg="../images/male-3.jpg"
        portAgentName="Gurjot Singh"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="waiting"
        statusLabel="Waiting"
        actionType="View Detail"
      />

      <TRow
        doctorImg="../images/male-doctor-2.jpg"
        doctorName="Dr.Sandeep"
        portAgentImg="../images/male-5.jpg"
        portAgentName="Aman"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="waiting"
        statusLabel="Waiting"
        actionType="View Detail"
      />

      <TRow
        doctorImg="../images/doctor-female-dummy-img.png"
        doctorName="Dr.Amandeep"
        portAgentImg="../images/male-dummy-img.png"
        portAgentName="Tiana Calzoni"
        time="12:30 PM"
        date="Jan 20,2025"
        statusClass="waiting"
        statusLabel="Waiting"
        actionType="View Detail"
      />
    </tbody>
  );
};

export default UnconfirmedTbody;
