import React from "react";
import AdminBookingCard from "./AdminBookingCard";
import UserHeader from "../../UserHeader";
import PatientInfo from "../../Patient/JSX/PatientInfo";
import PortAgentInfo from "../../PortAgent/JSX/PortAgentInfo";
import LabeledIconText from "../../LabeledIconText";
import "../Style/AdminBookingDetail.css";
import TopNav from "../../Navbar/JSX/TopNav";
import SideNav from "../../Navbar/JSX/SideNav";
import { useNavigate } from "react-router-dom";

const AdminBookingDetail = ({
  statusClass = "complete",
  statusLabel = "Complete",
}) => {
  const navigate = useNavigate();
  return (
    <>
      <TopNav />
      <SideNav />
      <main>
        <div className="booking-detail">
          <div className="booking-detail-header">
            <button
              className="back-btn"
              onClick={() => navigate("/auth/coordinator-dashboard")}
            >
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            <button>Booking Detail</button>
          </div>

          <div className="booking-detail-content">
            <div className="booking-section">
              <h4>Booking Detail</h4>
              <div class={"assigned-status " + statusClass}>
                <a
                  href=""
                  style={{
                    fontSize: "12px",
                    padding: "0px 4px",
                    width: "auto",
                  }}
                >
                  {statusLabel}
                </a>
              </div>
            </div>
            <div className="booking-user-detail">
              {/* patient */}
              <UserHeader
                imgSrc="/images/person.jpg"
                name="Alfredo Carder"
                role="Patients"
              >
                <PatientInfo />
              </UserHeader>

              {/* port agent */}
              <UserHeader
                imgSrc="/images/person.jpg"
                name="Maria Toriff"
                role="Port Agent"
              >
                <PortAgentInfo />
              </UserHeader>

              {/* general physician */}
              <UserHeader
                imgSrc="/images/person.jpg"
                name="Tenny Seris"
                role="General Physician"
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
                    iconClass="fa-solid fa-ship"
                    label="Ship ID"
                    value="2345676"
                  />
                </div>
              </UserHeader>

              {/* surgeon*/}
              <UserHeader
                imgSrc="/images/person.jpg"
                name="Ahmed Dokidis"
                role="Surgeon"
                experience="10 years"
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminBookingDetail;
