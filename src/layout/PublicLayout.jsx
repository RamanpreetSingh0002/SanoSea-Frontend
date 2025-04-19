import React from "react";
import TopNav from "../components/Navbar/JSX/TopNav";
import SideNav from "../components/Navbar/JSX/SideNav";

const PublicLayout = ({ children }) => {
  return (
    <>
      <TopNav />
      <SideNav />
      {children}
    </>
  );
};

export default PublicLayout;
