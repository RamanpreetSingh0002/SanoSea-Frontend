import React, { createContext, useState } from "react";
import BookAppointment from "../components/GeneralPhysician/JSX/BookAppointment";

export const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [isClosing, setClosing] = useState(false);

  // Open booking modal
  const handleOpenBooking = () => {
    setBookingOpen(true);
    setClosing(false);
    document.body.classList.add("overflow-hidden");
  };

  // Close booking modal
  const handleCloseBooking = () => {
    document.body.classList.remove("overflow-hidden");
    setClosing(true);
    setTimeout(() => setBookingOpen(false), 400);
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        isClosing,
        handleOpenBooking,
        handleCloseBooking,
      }}
    >
      {children}
      <BookAppointment />
    </BookingContext.Provider>
  );
};

export default BookingProvider;
