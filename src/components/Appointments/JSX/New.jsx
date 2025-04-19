import React from "react";

import TBox from "../../TBox";

import Table from "../../Table";
import TopNav from "../../Navbar/JSX/TopNav";
import SideNav from "../../Navbar/JSX/SideNav";
import "../Style/Appointment.css";
import NewTbody from "./NewTbody";

const New = () => {
  return (
    <section id="appointment-table">
      <div className="appointment-body">
        <TBox heading="New Appointments" />

        {/* table */}

        <Table isPatient={true}>
          <NewTbody />
        </Table>
      </div>
    </section>
  );
};

export default New;
