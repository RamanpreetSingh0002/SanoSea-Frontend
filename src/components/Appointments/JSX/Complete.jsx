import React from "react";

import TBox from "../../TBox";

import Table from "../../Table";
import TopNav from "../../Navbar/JSX/TopNav";
import SideNav from "../../Navbar/JSX/SideNav";
import "../Style/Appointment.css";
import CompleteTbody from "./CompleteTbody";

const Complete = () => {
  return (
    <div>
      <TopNav />
      <SideNav />
      <section id="appointment-table">
        <div className="appointment-body">
          <TBox heading="Completed" />

          {/* table */}

          <Table isPatient={true}>
            <CompleteTbody />
          </Table>
        </div>
      </section>
    </div>
  );
};

export default Complete;
