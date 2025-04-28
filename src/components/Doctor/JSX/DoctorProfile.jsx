import React, { useEffect, useState } from "react";
import UserHeader from "../../UserHeader";
import LabeledIconText from "../../LabeledIconText";
import DropdownSelect from "../../DropdownSelect";
import TopNav from "../../Navbar/JSX/TopNav";
import ControlSideNav from "../../Navbar/JSX/ControlSideNav";
import AllBooking from "../../AllBooking";
import TBox from "../../TBox";
import Table from "../../Table";

import DoctorPatientTBody from "./DoctorPatientTBody";
import ToggleAppointment from "../../ToggleAppointment";
import "../Style/DoctorProfile.css";
import "../Style/ToggleAppointment.css";

const DoctorProfile = () => {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null); // Track dropdown globally

  const handleDropdownChange = (value) => {
    console.log("Selected Status:", value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".select-menu")) {
        setActiveDropdownIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <main>
        <section id="doctor-profile-section">
          <div className="booking-detail-header">
            <button
              className="back-btn"
              // onClick={() => navigate("/auth/coordinator-dashboard")}
            >
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            <button>Doctor</button>
            <div>
              <img
                src="/images/icons8-greater-than-50.png"
                alt="greater-than"
                style={{ width: "16px", margin: "0 -8px" }}
              />
            </div>

            <button>Doctor Profile</button>
          </div>

          <div className="doctor-profile-detail">
            {/* surgeon*/}
            <div className="doctor-profile-header">
              <UserHeader
                imgSrc="/images/male-5.jpg"
                name="Ahmed Dokidis"
                role="Surgeon"
                experience="10 years"
                style={{ backgroundColor: "white" }}
              >
                <div className="contact-detail">
                  <LabeledIconText
                    iconClass="fa-solid fa-envelope"
                    label="Email-ID"
                    value="carder@gmail.com"
                  />
                  <LabeledIconText
                    iconClass="fa-solid fa-phone"
                    label="Phone Number"
                    value="9887767890"
                  />
                  <LabeledIconText
                    iconClass="fa-solid fa-location-dot"
                    label="Office Address"
                    value="544 Relly Coves, Bowie, Yukon, JBV 4A2, Canada"
                  />
                </div>
              </UserHeader>
              <div className="doctor-profile-btn">
                <DropdownSelect
                  defaultValue="Active"
                  options={["Active", "Deactive", "Edit"]}
                  includeLabel={true} // shows "Select State" label
                  onChange={handleDropdownChange}
                  index={0} // Unique index for tracking
                  activeDropdownIndex={activeDropdownIndex}
                  setActiveDropdownIndex={setActiveDropdownIndex}
                />
                <button className="delete-btn">
                  <div>
                    <img src="/images/icons trash.png" alt="trash" />
                  </div>
                  <span>Delete Profile</span>
                </button>
              </div>
            </div>

            <ToggleAppointment />

            <TBox heading="All Appointments" />

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

          {/* <AllBooking> */}

          {/* </AllBooking> */}
        </section>
      </main>
    </>
  );
};

export default DoctorProfile;
