import React from "react";
import "../Style/GeneralPhysician.css";
import Bits from "../../Bits";
import TBox from "../../TBox";
import Table from "../../Table";
import GpTbody from "./GpTbody";

const GPMain = () => {
  return (
    <main>
      <section id="patient-section">
        <div class="patient-detail-section">
          <div class="row">
            <Bits
              heading="Upcoming Appointments"
              count="44"
              iconClass="fa-solid fa-user"
            />

            <Bits
              heading="New Appointment Booked Today"
              count="15"
              iconClass="fa-brands fa-microsoft"
            />

            <Bits
              heading="Completed Appointments"
              count="22"
              iconClass="fa-solid fa-clock"
            />

            <Bits
              heading="Cancelled Appointments"
              count="40"
              iconClass="fa-solid fa-circle-xmark"
            />
          </div>
        </div>
      </section>

      {/* patient detail table */}
      <section id="all-booking">
        <div class="all-booking-wrapper">
          <TBox heading="Today Bookings" />

          {/* table */}

          <Table>
            <GpTbody />
          </Table>
        </div>
      </section>
    </main>
  );
};

export default GPMain;
