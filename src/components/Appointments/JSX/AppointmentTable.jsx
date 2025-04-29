import React from "react";
import ToggleAppointment from "../../ToggleAppointment";
import TBox from "../../TBox";
import DoctorPatientTBody from "../../Doctor/JSX/DoctorPatientTBody";

const AppointmentTable = ({ padding }) => {
  return (
    <div className="appointment-table" style={{ padding: padding }}>
      <ToggleAppointment />

      <TBox heading="All Appointments" showDateTime={true} />

      {/* table */}

      <table className="sub-admin-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Problem</th>
            <th>Time</th>
            <th>Date</th>
            <th>Email</th>
            <th>Report</th>
            <th colSpan="2">Status</th>
          </tr>
        </thead>
        <tbody>
          <DoctorPatientTBody
            imgSrc="/images/male-4.jpg"
            name="Sahil"
            problem="Body Temerature High with Cold "
            time="12:30 PM"
            date="Jan 20,2025"
            email="sahil@gmail.com"
            statusClass="new"
            statusLabel="New"
            actionType="View Detail"
          />
          <DoctorPatientTBody
            imgSrc="/images/male-3.jpg"
            name="Prayag"
            problem="Chest Pain or Pressure "
            time="12:30 PM"
            date="Jan 20,2025"
            email="prayag@gmail.com"
            statusClass="new"
            statusLabel="New"
            actionType="View Detail"
          />
          <DoctorPatientTBody
            imgSrc="/images/female-3.jpg"
            name="Bandna"
            problem="Body Temerature High with Cold "
            time="12:30 PM"
            date="Jan 20,2025"
            email="bandna@gmail.com"
            statusClass="cancelled"
            statusLabel="Cancelled"
            actionType="View Detail"
          />
          <DoctorPatientTBody
            imgSrc="/images/male-6.jpg"
            name="Arun"
            problem="Chest Pain or Pressure "
            time="12:30 PM"
            date="Jan 20,2025"
            email="arun@gmail.com"
            statusClass="upcoming"
            statusLabel="Upcoming"
            actionType="View Detail"
          />
          <DoctorPatientTBody
            imgSrc="/images/female-4.jpg"
            name="Alia"
            problem="Body Temerature High with Cold "
            time="12:30 PM"
            date="Jan 20,2025"
            email="alia@gmail.com"
            statusClass="past"
            statusLabel="Past"
            actionType="View Detail"
          />
          <DoctorPatientTBody
            imgSrc="/images/female-2.jpg"
            name="Shaify"
            problem="Chest Pain or Pressure "
            time="12:30 PM"
            date="Jan 20,2025"
            email="Shaify@gmail.com"
            statusClass="new"
            statusLabel="New"
            actionType="View Detail"
          />
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
