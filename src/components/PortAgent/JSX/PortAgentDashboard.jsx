import React, { useState } from "react";

import TBox from "../../TBox";
import Table from "../../Table";

import AllBooking from "../../AllBooking";
import PortAgentTbody from "./PortAgentTbody";

import Bits from "../../Bits";
import AddCabDetail from "./AddCabDetail";

const PortAgentDashboard = () => {
  const [isBoxOpen, setBoxOpen] = useState(false); // State to control boxmodal
  const [isClosing, setClosing] = useState(false); // State to control closing animation

  const handleOpenBox = () => {
    setBoxOpen(true); // Open box modal
    setClosing(false); // Reset closing state
    document.body.classList.add("overflow-hidden"); // Prevent background scrolling
  };

  const handleCloseBox = () => {
    document.body.classList.remove("overflow-hidden"); // Restore scrolling
    setClosing(true); // Trigger closing animation
    setTimeout(() => setBoxOpen(false), 400); // Wait for animation before removing modal
    // setBoxOpen(false); // Close box-modal
  };

  return (
    <>
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
          <TBox heading="Today Bookings" showDateTime={true} />

          {/* table */}

          <Table isPortAgent="true">
            <PortAgentTbody onOpen={handleOpenBox} />
          </Table>
        </AllBooking>

        {isBoxOpen && (
          <div className="box-overlay">
            <AddCabDetail
              isClosing={isClosing}
              onClose={handleCloseBox}
              width="136px"
            />
          </div>
        )}
      </main>
    </>
  );
};

export default PortAgentDashboard;
