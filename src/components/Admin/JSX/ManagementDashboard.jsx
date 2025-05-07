import React from "react";

import { useModal } from "../../../hooks";
import ManagementMain from "./ManagementMain";
import AuditManagerModal from "../../AuditManager/JSX/AuditManagerModal";
import PortAgentModal from "../../PortAgent/JSX/PortAgentModal";

import "../Style/ManagementDashboard.css";

const ManagementDashboard = () => {
  const {
    isAuditOpen,
    isAuditClose,
    handleOpenAudit,
    handleCloseAudit,
    isPortOpen,
    isPortClose,
    handleOpenPort,
    handleClosePort,
  } = useModal();

  return (
    <div>
      <ManagementMain
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

export default ManagementDashboard;
