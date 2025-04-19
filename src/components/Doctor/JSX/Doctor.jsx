import React, { useState } from "react";
import TBox from "../../TBox";
import TopNav from "../../Navbar/JSX/TopNav";

// import "../Style/SubAdmin.css";

import AddDoctor from "./AddDoctor";
import DoctorTRow from "./DoctorTRow";
import ControlSideNav from "../../Navbar/JSX/ControlSideNav";

const Doctor = () => {
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
      <main>
        <section id="sub-admin-section">
          <div className="sub-admin-header">
            <h4>Doctor</h4>
            <div className="doctor-btn">
              <button className="doctor-search-btn">
                <i className="fa-solid fa-search"></i>
              </button>
              <button className="add-user-btn" onClick={handleOpenBox}>
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
                {[
                  {
                    name: "Jaydon Bartor",
                    email: "jaydonbartor@gmail.com",
                    imgSrc: "/images/male-1.jpg",
                  },
                  {
                    name: "Shaify",
                    email: "Shaify@gmail.com",
                    imgSrc: "/images/female-2.jpg ",
                  },
                  {
                    name: "Vikram",
                    email: "Vikram@gmail.com",
                    imgSrc: "/images/male-3.jpg",
                  },
                  {
                    name: "Aryan",
                    email: "Aryan@gmail.com",
                    imgSrc: "/images/male-5.jpg",
                  },
                  {
                    name: "Vishal",
                    email: "Vishal@gmail.com",
                    imgSrc: "/images/male-2.jpg",
                  },
                  {
                    name: "Shilpa",
                    email: "Shilpa@gmail.com",
                    imgSrc: "/images/female-4.jpg",
                  },
                ].map((doctor, index) => (
                  <DoctorTRow
                    key={index}
                    name={doctor.name}
                    email={doctor.email}
                    imgSrc={doctor.imgSrc}
                    index={index}
                    activeDropdownIndex={activeDropdownIndex}
                    setActiveDropdownIndex={setActiveDropdownIndex}
                  />
                ))}
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
