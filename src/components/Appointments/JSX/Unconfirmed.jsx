import React from "react";
import UnconfirmedTbody from "./UnconfirmedTbody";
import TBox from "../../TBox";
import AllBooking from "../../AllBooking";
import Table from "../../Table";
import TopNav from "../../Navbar/JSX/TopNav";
import SideNav from "../../Navbar/JSX/SideNav";
import "../Style/Appointment.css";

const Unconfirmed = () => {
  return (
    <section id="appointment-table">
      <div className="appointment-body">
        <TBox heading="Unconfirmed" />

        {/* table */}

        <Table isPatient={true}>
          <UnconfirmedTbody />
        </Table>
      </div>
    </section>
  );
};

export default Unconfirmed;
