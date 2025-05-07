import React, { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  // Audit Modal States
  const [isAuditOpen, setAuditOpen] = useState(false);
  const [isAuditClose, setAuditClose] = useState(false);

  // Port Agent Modal States
  const [isPortOpen, setPortOpen] = useState(false);
  const [isPortClose, setPortClose] = useState(false);

  // Audit Modal Handlers
  const handleOpenAudit = () => {
    setAuditOpen(true);
    setAuditClose(false);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseAudit = () => {
    document.body.classList.remove("overflow-hidden");
    setAuditClose(true);
    setTimeout(() => setAuditOpen(false), 400);
  };

  // Port Agent Modal Handlers
  const handleOpenPort = () => {
    setPortOpen(true);
    setPortClose(false);
    document.body.classList.add("overflow-hidden");
  };

  const handleClosePort = () => {
    document.body.classList.remove("overflow-hidden");
    setPortClose(true);
    setTimeout(() => setPortOpen(false), 400);
  };

  return (
    <ModalContext.Provider
      value={{
        isAuditOpen,
        isAuditClose,
        handleOpenAudit,
        handleCloseAudit,
        isPortOpen,
        isPortClose,
        handleOpenPort,
        handleClosePort,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
