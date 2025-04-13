import React from "react";

import TopNav from "../../Navbar/JSX/TopNav";
import SideNav from "../../Navbar/JSX/SideNav";
import PatientMain from "./PatientMain";

import "../Style/PatientDashboard.css";

const PatientDashboard = () => {
  return (
    <div>
      <TopNav />
      <SideNav />

      <PatientMain />
    </div>
  );
};

export default PatientDashboard;
