import React, { useState } from "react";
import TBox from "../../TBox";
import TopNav from "../../Navbar/JSX/TopNav";
import SideNav from "../../Navbar/JSX/SideNav";

// import "../Style/SubAdmin.css";

import DoctorTRow from "./DoctorTRow";
import AddDoctor from "./AddDoctor";

const Doctor = () => {
  const [isBoxOpen, setBoxOpen] = useState(false); // State to control boxmodal
  const [isClosing, setClosing] = useState(false); // State to control closing animation

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
            <h4>Doctor</h4>
            <div>
              <button>search</button>
              <button onClick={handleOpenBox}>
                <img src="/images/icon-plus-white.png" alt="icon-plus" />
                Add New Doctor
              </button>
            </div>
          </div>

          <div className="sub-admin-box">
            <TBox heading="Doctor" />
            <table className="sub-admin-table">
              <thead>
                <tr>
                  <th>Doctors</th>
                  <th>Email</th>
                  <th>State</th>
                  <th colSpan="2"></th>
                </tr>
              </thead>
              <tbody>
                <DoctorTRow
                  name="Jaydon Bartor"
                  email="jaydonbartor@gmail.com"
                />
                <DoctorTRow
                  name="Jaydon Bartor"
                  email="jaydonbartor@gmail.com"
                />
                <DoctorTRow
                  name="Jaydon Bartor"
                  email="jaydonbartor@gmail.com"
                />
                <DoctorTRow
                  name="Jaydon Bartor"
                  email="jaydonbartor@gmail.com"
                />
                <DoctorTRow
                  name="Jaydon Bartor"
                  email="jaydonbartor@gmail.com"
                />
                <DoctorTRow
                  name="Jaydon Bartor"
                  email="jaydonbartor@gmail.com"
                />
              </tbody>
            </table>
          </div>
        </section>

        {isBoxOpen && (
          <div className="box-overlay">
            <AddDoctor isClosing={isClosing} onClose={handleCloseBox} />
          </div>
        )}
      </main>
    </>
  );
};

export default Doctor;
