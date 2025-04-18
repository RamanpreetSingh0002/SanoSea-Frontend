import React, { useEffect, useState } from "react";
import TopNav from "../../Navbar/JSX/TopNav";
import SideNav from "../../Navbar/JSX/SideNav";
import UserHeader from "../../UserHeader";
import LabeledIconText from "../../LabeledIconText";
import DropdownSelect from "../../DropdownSelect";
import "../Style/SubAdminProfile.css";

const SubAdminProfile = () => {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null); // Track dropdown globally

  const handleDropdownChange = value => {
    console.log("Selected Status:", value);
  };

  useEffect(() => {
    const handleClickOutside = event => {
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
      <TopNav />
      <SideNav />

      <main>
        <section id="doctor-profile-section">
          <div className="booking-detail-header">
            <button
              className="back-btn"
              // onClick={() => navigate("/auth/coordinator-dashboard")}
            >
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            <button>Sub-Admin</button>
            <div>
              <img
                src="/images/icons8-greater-than-50.png"
                alt="greater-than"
                style={{ width: "16px", margin: "0 -8px" }}
              />
            </div>

            <button>Sub-Admin Profile</button>
          </div>

          <div className="sub-admin-profile-head">
            <div className="doctor-profile-header">
              <UserHeader
                imgSrc="/images/person.jpg"
                name="Carter Bergson"
                role="Sub Admin"
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

            <div className="sub-admin-role-box">
              <div className="sub-admin-role">
                <i class="fa-solid fa-briefcase"></i>
                <strong>Role</strong>
                <p>Manage the Appointment</p>
              </div>
              <div className="sub-admin-role-edit-btn">
                <button>Edit</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SubAdminProfile;
