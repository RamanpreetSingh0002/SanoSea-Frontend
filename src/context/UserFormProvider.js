import React, { createContext, useState } from "react";
import UserForm from "../components/Form/UserForm";

export const UserFormContext = createContext();

const UserFormProvider = ({ children }) => {
  const [isUserFormOpen, setUserFormOpen] = useState(false);
  const [isUserFormClosing, setUserFormClosing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [header, setHeader] = useState("User");
  const [width, setWidth] = useState("");

  // Open modal for add/edit user
  const handleOpenUserForm = (user = null, header, width = "160px") => {
    setSelectedUser(user);
    setHeader(header);
    setWidth(width);
    setUserFormOpen(true);
    setUserFormClosing(false);
    document.body.classList.add("overflow-hidden"); // Prevent background scrolling
  };

  // Close modal
  const handleCloseUserForm = () => {
    setUserFormClosing(true);
    document.body.classList.remove("overflow-hidden"); // Restore scrolling
    setTimeout(() => {
      setUserFormOpen(false);
      setSelectedUser(null);
    }, 400); // Wait for animation before closing
  };

  return (
    <UserFormContext.Provider
      value={{
        isUserFormOpen,
        isUserFormClosing,
        selectedUser,
        header,
        handleOpenUserForm,
        handleCloseUserForm,
      }}
    >
      {children}

      <UserForm
        user={selectedUser}
        isClosing={isUserFormClosing}
        onClose={handleCloseUserForm}
        header={header}
        width={width}
      />
    </UserFormContext.Provider>
  );
};

export default UserFormProvider;
