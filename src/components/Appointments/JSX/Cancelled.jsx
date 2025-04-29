import React from "react";

import TBox from "../../TBox";

import Table from "../../Table";
import TopNav from "../../Navbar/JSX/TopNav";
import SideNav from "../../Navbar/JSX/SideNav";
import "../Style/Appointment.css";
import CancelledTbody from "./CancelledTbody";

const Cancelled = () => {
  return (
    <section id="appointment-table">
      <div className="appointment-body">
        <TBox heading="Cancelled" showDateTime={true} />

        {/* table */}

        <Table isPatient={true}>
          <CancelledTbody />
        </Table>
      </div>
    </section>
  );
};

export default Cancelled;
