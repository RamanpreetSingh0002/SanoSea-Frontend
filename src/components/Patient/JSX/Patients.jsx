import React, { useState } from "react";
import TBox from "../../TBox";
import TopNav from "../../Navbar/JSX/TopNav";
import SideNav from "../../Navbar/JSX/SideNav";
import PatientTRow from "./PatientTRow";

// import "../Style/SubAdmin.css";

const Patients = () => {
  const [isBoxOpen, setBoxOpen] = useState(false); // State to control boxmodal
  const [isClosing, setClosing] = useState(false); // State to control closing animation
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  const handleOpenBox = () => {
    setBoxOpen(true); // Open box modal
    setClosing(false); // Reset closing state
    document.body.classList.add("overflow-hidden"); // Prevent background scrolling
  };

  const handleCloseBox = () => {
    document.body.classList.remove("overflow-hidden"); // Restore scrolling
    setClosing(true); // Trigger closing animation
    setTimeout(() => setBoxOpen(false), 400); // Wait for animation before removing modal
    // setBoxOpen(false); // Close boxmodal
  };
  return (
    <>
      <TopNav />
      <SideNav />
      <main>
        <section id="sub-admin-section">
          <div className="sub-admin-header">
            <h4>Patients</h4>
            <div>
              <button>search</button>
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
                    email: "jaydonbartor@gmail.com",
                    statusClass: "new",
                    statusLabel: "New",
                  },
                  {
                    name: "Jaydon Bartor",
                    email: "jaydonbartor@gmail.com",
                    statusClass: "complete",
                    statusLabel: "Complete",
                  },
                  {
                    name: "Jaydon Bartor",
                    email: "jaydonbartor@gmail.com",
                    statusClass: "upcoming",
                    statusLabel: "Upcoming",
                  },
                  {
                    name: "Jaydon Bartor",
                    email: "jaydonbartor@gmail.com",
                    statusClass: "cancelled",
                    statusLabel: "Cancelled",
                  },
                  {
                    name: "Jaydon Bartor",
                    email: "jaydonbartor@gmail.com",
                    statusClass: "new",
                    statusLabel: "New",
                  },
                  {
                    name: "Jaydon Bartor",
                    email: "jaydonbartor@gmail.com",
                    statusClass: "new",
                    statusLabel: "New",
                  },
                ].map((patient, index) => (
                  <PatientTRow
                    key={index}
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

export default Patients;
