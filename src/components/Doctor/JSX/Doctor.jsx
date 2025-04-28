import React, { useContext, useState } from "react";
import TBox from "../../TBox";
import TopNav from "../../Navbar/JSX/TopNav";

// import "../Style/SubAdmin.css";

import AddDoctor from "./AddDoctor";
import DoctorTRow from "../../UserTRow";
import ControlSideNav from "../../Navbar/JSX/ControlSideNav";
import { AuthContext } from "../../../context/AuthProvider";
import UserTablePage from "../../UserTablePage";

const Doctor = () => {
  const [isBoxOpen, setBoxOpen] = useState(false); // State to control boxmodal
  const [isClosing, setClosing] = useState(false); // State to control closing animation
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  const { authInfo } = useContext(AuthContext);
  const { profile } = authInfo;

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

  return <UserTablePage header="Doctor" addBtn="Add New Doctor" />;
};

export default Doctor;
