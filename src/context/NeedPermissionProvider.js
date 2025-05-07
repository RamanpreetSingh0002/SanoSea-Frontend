import React, { createContext, useState } from "react";
import NeedPermissionBox from "../components/Notification/JSX/NeedPermissionBox";

export const NeedPermissionContext = createContext();

const NeedPermissionProvider = ({ children }) => {
  const [isPermissionBoxOpen, setPermissionBoxOpen] = useState(false); // State to control box modal visibility
  const [isPermissionBoxClosing, setPermissionBoxClosing] = useState(false); // State to control box modal closing animation

  const [actionType, setActionType] = useState(""); // Stores "Activate", "Deactivate", "Delete"
  const [selectedUser, setSelectedUser] = useState(null); // Stores user info

  const handleOpenPermissionBox = (type, user) => {
    setPermissionBoxOpen(true); // Open box modal
    setPermissionBoxClosing(false); // Reset closing state

    setActionType(type); // Set action type for the modal
    setSelectedUser(user); // Set selected userId

    document.body.classList.add("overflow-hidden"); // Prevent background scrolling
  };

  const handleClosePermissionBox = () => {
    setPermissionBoxClosing(true); // Trigger closing animation
    document.body.classList.remove("overflow-hidden"); // Restore scrolling

    setTimeout(() => {
      setPermissionBoxOpen(false);
      setActionType(""); // Reset action type
      setSelectedUser(null); // Reset selected userId
    }, 400); // Wait for animation before removing modal
  };

  return (
    <NeedPermissionContext.Provider
      value={{
        isPermissionBoxOpen,
        isPermissionBoxClosing,
        actionType,
        selectedUser,
        handleOpenPermissionBox,
        handleClosePermissionBox,
      }}
    >
      {children}
      <NeedPermissionBox />
    </NeedPermissionContext.Provider>
  );
};

export default NeedPermissionProvider;
