import React from "react";
import TopNav from "../components/Navbar/JSX/TopNav";
import SideNav from "../components/Navbar/JSX/SideNav";
import ControlSideNav from "../components/Navbar/JSX/ControlSideNav";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <TopNav />
      <ControlSideNav />
      {children}
    </>
  );
};

export default PrivateLayout;
