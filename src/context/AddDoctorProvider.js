import React, { createContext, useState } from "react";
import AssignDoctor from "../components/Doctor/JSX/AssignDoctor";

export const AddDoctorContext = createContext();

const AddDoctorProvider = ({ children }) => {
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
    <AddDoctorContext.Provider
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
      <AssignDoctor />
    </AddDoctorContext.Provider>
  );
};

export default AddDoctorProvider;
