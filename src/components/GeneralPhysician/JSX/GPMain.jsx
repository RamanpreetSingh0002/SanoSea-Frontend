import React from "react";

import Bits from "../../Bits";
import TBox from "../../TBox";
import Table from "../../Table";
import GpTbody from "./GpTbody";
import AllBooking from "../../AllBooking";

import "../Style/GeneralPhysician.css";

const GPMain = () => {
  return (
    <main>
      <section id="appointment-section">
        <div class="appointment-detail-section">
          <div class="row">
            <Bits
              col="3"
              heading="Upcoming Appointments"
              count="44"
              iconClass="fa-solid fa-user"
            />

            <Bits
              col="3"
              heading="New Appointment Booked Today"
              count="15"
              iconClass="fa-brands fa-microsoft"
            />

            <Bits
              col="3"
              heading="Completed Appointments"
              count="22"
              iconClass="fa-solid fa-clock"
            />

            <Bits
              col="3"
              heading="Cancelled Appointments"
              count="40"
              iconClass="fa-solid fa-circle-xmark"
            />
          </div>
        </div>
      </section>

      {/* patient detail table */}
      <AllBooking>
        <TBox heading="Today Bookings" />

        {/* table */}

        <Table>
          <GpTbody />
        </Table>
      </AllBooking>
    </main>
  );
};

export default GPMain;
