import React from "react";

import TBox from "../../TBox";
import AllBooking from "../../AllBooking";
import Table from "../../Table";
import TopNav from "../../Navbar/JSX/TopNav";
import SideNav from "../../Navbar/JSX/SideNav";
import "../Style/Appointment.css";
import UpcomingTbody from "./UpcomingTbody";

const Upcoming = () => {
  return (
    <div>
      <TopNav />
      <SideNav />
      <section id="appointment-table">
        <div className="appointment-body">
          <TBox heading="Upcoming" />

          {/* table */}

          <Table isPatient={true}>
            <UpcomingTbody />
          </Table>
        </div>
      </section>
    </div>
  );
};

export default Upcoming;
