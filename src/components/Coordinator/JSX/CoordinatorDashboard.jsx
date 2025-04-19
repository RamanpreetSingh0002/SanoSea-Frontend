import React, { useState } from "react";

import TopNav from "../../Navbar/JSX/TopNav";
import ControlSideNav from "../../Navbar/JSX/ControlSideNav";
import CoordinatorMain from "./CoordinatorMain";
import AuditManagerModal from "../../AuditManager/JSX/AuditManagerModal";
import PortAgentModal from "../../PortAgent/JSX/PortAgentModal";

import "../Style/CoordinatorDashboard.css";

const CoordinatorDashboard = () => {
  const [isAuditOpen, setAuditOpen] = useState(false); // State to control audit modal
  const [isAuditClose, setAuditClose] = useState(false); // State to control  audit closing animation

  const [isPortOpen, setPortOpen] = useState(false); // State to control Port modal
  const [isPortClose, setPortClose] = useState(false); // State to control  port closing animation

  const handleOpenAudit = () => {
    setAuditOpen(true); // Open audit modal
    setAuditClose(false); // Reset closing state
    document.body.classList.add("overflow-hidden"); // Prevent background scrolling
  };

  const handleCloseAudit = () => {
    document.body.classList.remove("overflow-hidden"); // Restore scrolling
    setAuditClose(true); // Trigger closing animation
    setTimeout(() => setAuditOpen(false), 400); // Wait for animation before removing modal
  };

  // port agent

  const handleOpenPort = () => {
    setPortOpen(true); // Open port modal
    setPortClose(false); // Reset closing state
    document.body.classList.add("overflow-hidden"); // Prevent background scrolling
  };

  const handleClosePort = () => {
    document.body.classList.remove("overflow-hidden"); // Restore scrolling
    setPortClose(true); // Trigger closing animation
    setTimeout(() => setPortOpen(false), 400); // Wait for animation before removing modal
  };

  return (
    <div>
      <CoordinatorMain
        onAuditOpen={handleOpenAudit}
        onPortOpen={handleOpenPort}
      />

      {isAuditOpen && (
        <div className="modal-overlay">
          <AuditManagerModal
            isAuditClose={isAuditClose}
            onClose={handleCloseAudit}
          />
        </div>
      )}

      {isPortOpen && (
        <div className="modal-overlay">
          <PortAgentModal isPortClose={isPortClose} onClose={handleClosePort} />
        </div>
      )}
    </div>
  );
};

export default CoordinatorDashboard;
