import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import ManageAvailabilityModal from "./ManageAvailabilityModal ";

const DoctorFooterActions = ({ onClose }) => {
  const [isBoxOpen, setBoxOpen] = useState(false); // State to control box-modal
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
    // setBoxOpen(false); // Close box-modal
  };

  return (
    <>
      <button className="availability-btn">
        Manage Availability <FaCalendarAlt />
      </button>
      <button className="btn create-btn">Create Profile</button>
      <button
        style={{ width: "100%", borderRadius: "8px" }}
        className="btn cancel-btn"
        onClick={onClose}
      >
        Cancel
      </button>

      {/* {isBoxOpen && (
        <ManageAvailabilityModal
          isClosing={isClosing}
          onClose={handleCloseBox}
        />
      )} */}
    </>
  );
};

export default DoctorFooterActions;
