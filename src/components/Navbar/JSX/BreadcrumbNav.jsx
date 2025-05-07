import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../hooks";

const BreadcrumbNav = ({ role, busy, isThroughModal, isThroughDashboard }) => {
  const { handleOpenAudit, handleOpenPort } = useModal();

  const navigate = useNavigate();

  // Function to handle the button click
  const handleButtonClick = () => {
    if (isThroughModal || isThroughDashboard) {
      if (role === "Audit Manager") {
        handleOpenAudit(); // Open the Audit Manager modal
      } else if (role === "Port Agent") {
        handleOpenPort(); // Open the Port Agent modal
      }
    }
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="booking-detail-header">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i> Back
      </button>

      {!busy && (
        <>
          <button onClick={handleButtonClick}>{role}</button>

          <div>
            <img
              src="/images/icons8-greater-than-50.png"
              alt="greater-than"
              style={{ width: "16px", margin: "0 -8px" }}
            />
          </div>

          <button style={{ cursor: "default" }}>{role} Profile</button>
        </>
      )}
    </div>
  );
};

export default BreadcrumbNav;
