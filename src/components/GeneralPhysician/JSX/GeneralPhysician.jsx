import React, { useState } from "react";

import TopNav from "../../Navbar/JSX/TopNav";
import SideNav from "../../Navbar/JSX/SideNav";
import GPMain from "./GPMain";
import BookAppointment from "./BookAppointment";

const GeneralPhysician = () => {
  const [isBookingOpen, setBookingOpen] = useState(false); // State to control booking modal
  const [isClosing, setClosing] = useState(false); // State to control closing animation

  const handleOpenBooking = () => {
    setBookingOpen(true); // Open booking modal
    setClosing(false); // Reset closing state
    document.body.classList.add("overflow-hidden"); // Prevent background scrolling
  };

  const handleCloseBooking = () => {
    document.body.classList.remove("overflow-hidden"); // Restore scrolling
    setClosing(true); // Trigger closing animation
    setTimeout(() => setBookingOpen(false), 400); // Wait for animation before removing modal
    // setBookingOpen(false); // Close booking modal
  };

  return (
    <div class="wrapper">
      <TopNav />
      <SideNav bookNow={true} onOpen={handleOpenBooking} />
      <GPMain />

      {isBookingOpen && (
        <div className="booking-overlay">
          <BookAppointment isClosing={isClosing} onClose={handleCloseBooking} />
        </div>
      )}
    </div>
  );
};

export default GeneralPhysician;
