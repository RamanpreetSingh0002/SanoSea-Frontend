import React, { useContext, useState } from "react";
import TBox from "../../TBox";
import TopNav from "../../Navbar/JSX/TopNav";
import SubAdminRow from "./SubAdminRow";
import "../Style/SubAdmin.css";
import AddSubAdmin from "./AddSubAdmin";
import ControlSideNav from "../../Navbar/JSX/ControlSideNav";
import { AuthContext } from "../../../context/AuthProvider";

const SubAdmin = () => {
  const [isBoxOpen, setBoxOpen] = useState(false); // State to control boxmodal
  const [isClosing, setClosing] = useState(false); // State to control closing animation
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  const { authInfo } = useContext(AuthContext);
  const { profile } = authInfo;

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
            <h4>Sub-Admin</h4>

            {profile?.role == "Admin" && (
              <button className="add-user-btn" onClick={handleOpenBox}>
                <div>
                  <img src="/images/icon-plus-white.png" alt="icon-plus" />
                </div>
                <span>Add Sub Admin</span>
              </button>
            )}
          </div>

          <div className="sub-admin-box">
            <TBox heading="Sub-Admin" />
            <table className="sub-admin-table">
              <thead>
                <tr>
                  <th>Sub Admin</th>
                  <th>Type</th>
                  <th>Role</th>
                  <th colSpan="2">Profile</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    imgSrc: "/images/male-1.jpg",
                    name: "Justin ",
                  },
                  {
                    imgSrc: "/images/male-3.jpg",
                    name: "Jassie",
                  },
                  {
                    imgSrc: "/images/female-2.jpg",
                    name: "Shaify",
                  },
                  {
                    imgSrc: "/images/male-5.jpg",
                    name: "Franci",
                  },
                  {
                    imgSrc: "/images/female-4.jpg",
                    name: "Diana",
                  },
                  {
                    imgSrc: "/images/male-1.jpg",
                    name: "Justin ",
                  },
                ].map((subAdmin, index) => (
                  <SubAdminRow
                    key={index}
                    index={index}
                    name={subAdmin.name}
                    imgSrc={subAdmin.imgSrc}
                    role={index % 2 === 0 ? "Coordinator" : "Audit Manager"}
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
            <AddSubAdmin isClosing={isClosing} onClose={handleCloseBox} />
          </div>
        )}
      </main>
    </>
  );
};

export default SubAdmin;
