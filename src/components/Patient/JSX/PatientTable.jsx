import React, { useState } from "react";
import TBox from "../../TBox";
import PatientTRow from "./PatientTRow";

// import "../Style/SubAdmin.css";

const PatientTable = () => {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  return (
    <>
      <main>
        <section id="sub-admin-section">
          <div className="sub-admin-header">
            <h4>Patients</h4>
            <div>
              <button className="doctor-search-btn">
                <i className="fa-solid fa-search"></i>
              </button>
            </div>
          </div>

          <div className="sub-admin-box">
            <TBox heading="Patients" />
            <table className="sub-admin-table">
              <thead>
                <tr>
                  <th>Patients</th>
                  <th>Email</th>
                  <th>State</th>
                  <th>Status</th>
                  <th>Report</th>
                  <th colSpan="2"></th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Jaydon Bartor",
                    imgSrc: "/images/male-1.jpg",
                    email: "jaydonbartor@gmail.com",
                    statusClass: "new",
                    statusLabel: "New",
                  },
                  {
                    name: "Shaify",
                    imgSrc: "/images/female-2.jpg ",
                    email: "Shaify@gmail.com",
                    statusClass: "complete",
                    statusLabel: "Complete",
                  },
                  {
                    name: "Vikram",
                    imgSrc: "/images/male-3.jpg",
                    email: "Vikram@gmail.com",
                    statusClass: "upcoming",
                    statusLabel: "Upcoming",
                  },
                  {
                    name: "Aryan",
                    imgSrc: "/images/male-5.jpg",
                    email: "Aryan@gmail.com",
                    statusClass: "cancelled",
                    statusLabel: "Cancelled",
                  },
                  {
                    name: "Vishal",
                    imgSrc: "/images/male-2.jpg",
                    email: "Vishal@gmail.com",
                    statusClass: "new",
                    statusLabel: "New",
                  },
                  {
                    name: "Shilpa",
                    imgSrc: "/images/female-4.jpg",
                    email: "Shilpa@gmail.com",
                    statusClass: "new",
                    statusLabel: "New",
                  },
                ].map((patient, index) => (
                  <PatientTRow
                    key={index}
                    imgSrc={patient.imgSrc}
                    name={patient.name}
                    email={patient.email}
                    statusClass={patient.statusClass}
                    statusLabel={patient.statusLabel}
                    index={index}
                    activeDropdownIndex={activeDropdownIndex}
                    setActiveDropdownIndex={setActiveDropdownIndex}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default PatientTable;
