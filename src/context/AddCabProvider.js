import React, { createContext, useState } from "react";
import AddCabDetail from "../components/PortAgent/JSX/AddCabDetail";

export const AddCabContext = createContext();

const AddCabProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [isClosing, setClosing] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Open modal
  const handleOpen = () => {
    setOpen(true);
    setClosing(false);
    document.body.classList.add("overflow-hidden");
  };

  // Close modal
  const handleClose = () => {
    document.body.classList.remove("overflow-hidden");
    setClosing(true);
    setTimeout(() => setOpen(false), 400);
  };

  return (
    <AddCabContext.Provider
      value={{
        isOpen,
        isClosing,
        handleOpen,
        handleClose,
        selectedAppointment,
        setSelectedAppointment,
      }}
    >
      {children}
      <AddCabDetail />
    </AddCabContext.Provider>
  );
};

export default AddCabProvider;
