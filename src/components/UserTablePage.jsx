import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import UserTRow from "./UserTRow";
import TBox from "./TBox";
import { AuthContext } from "../context/AuthProvider";

import AddUser from "./AddUser";

const UserTablePage = ({ header, addBtn, width }) => {
  const [isBoxOpen, setBoxOpen] = useState(false); // State to control boxmodal
  const [isClosing, setClosing] = useState(false); // State to control closing animation
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  const { authInfo } = useContext(AuthContext);
  const { profile } = authInfo;

  const location = useLocation();
  const isSubAdminPage = location.pathname === "/auth/sub-admin";
  const isPatientPage = location.pathname === "/auth/patient";

  const handleOpenBox = () => {
    setBoxOpen(true); // Open box modal
    setClosing(false); // Reset closing state
    document.body.classList.add("overflow-hidden"); // Prevent background scrolling
  };

  const handleCloseBox = () => {
    document.body.classList.remove("overflow-hidden"); // Restore scrolling
    setClosing(true); // Trigger closing animation
    setTimeout(() => setBoxOpen(false), 400); // Wait for animation before removing modal
    // setBoxOpen(false); // Close box-modal
  };

  return (
    <main>
      <section id="sub-admin-section">
        <div className="sub-admin-header">
          <h4>{header}</h4>
          <div className="doctor-btn">
            <button className="doctor-search-btn">
              <i className="fa-solid fa-search"></i>
            </button>
            {profile?.role == "Admin" && !isPatientPage && (
              <button className="add-user-btn" onClick={handleOpenBox}>
                <img src="/images/icon-plus-white.png" alt="icon-plus" />
                {addBtn}
              </button>
            )}
          </div>
        </div>

        <div className="sub-admin-box">
          <TBox heading={header} />
          <table className="sub-admin-table">
            <thead>
              <tr>
                <th>{header + "s"}</th>
                <th>Email</th>
                {isSubAdminPage && <th>Role</th>}
                <th>State</th>

                {isPatientPage && (
                  <>
                    <th>Status</th>
                    <th>Report</th>
                  </>
                )}
                <th colSpan="2"></th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  imgSrc: "/images/male-1.jpg",
                  name: "Jaydon Bartor",
                  email: "jaydonbartor@gmail.com",
                  statusClass: "new",
                  statusLabel: "New",
                },
                {
                  imgSrc: "/images/female-2.jpg ",
                  name: "Shaify",
                  email: "Shaify@gmail.com",
                  statusClass: "complete",
                  statusLabel: "Complete",
                },
                {
                  imgSrc: "/images/male-3.jpg",
                  name: "Vikram",
                  email: "Vikram@gmail.com",
                  statusClass: "upcoming",
                  statusLabel: "Upcoming",
                },
                {
                  imgSrc: "/images/male-5.jpg",
                  name: "Aryan",
                  email: "Aryan@gmail.com",
                  statusClass: "cancelled",
                  statusLabel: "Cancelled",
                },
                {
                  imgSrc: "/images/male-2.jpg",
                  name: "Vishal",
                  email: "Vishal@gmail.com",
                  statusClass: "waiting",
                  statusLabel: "Waiting",
                },
                {
                  imgSrc: "/images/female-4.jpg",
                  name: "Shilpa",
                  email: "Shilpa@gmail.com",
                  statusClass: "new",
                  statusLabel: "New",
                },
              ].map((user, index) => (
                <UserTRow
                  key={index}
                  imgSrc={user.imgSrc}
                  name={user.name}
                  email={user.email}
                  role={index % 2 === 0 ? "Coordinator" : "Audit Manager"}
                  statusClass={user.statusClass}
                  statusLabel={user.statusLabel}
                  index={index}
                  activeDropdownIndex={activeDropdownIndex}
                  setActiveDropdownIndex={setActiveDropdownIndex}
                />
              ))}
            </tbody>
            <div className="pagination-data">
              <div>
                <p>Showing Data 1 To 6</p>
              </div>
              <div>{/* pagination will be done here */}</div>
            </div>
          </table>
        </div>
      </section>

      {isBoxOpen && (
        <div className="box-overlay">
          <AddUser
            isClosing={isClosing}
            onClose={handleCloseBox}
            header={header}
            width={width}
          />
        </div>
      )}
    </main>
  );
};

export default UserTablePage;
