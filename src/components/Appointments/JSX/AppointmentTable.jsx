import React, { useEffect, useState } from "react";
import { fetchAllAppointments } from "../../../api/appointment";
import ToggleAppointment from "../../ToggleAppointment";
import BookingTable from "./BookingTable.jsx";

const AppointmentTable = ({ padding }) => {
  // const [appointments, setAppointments] = useState([]);
  // const [busy, setBusy] = useState(false);

  // // Fetch appointments when component mounts
  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     setBusy(true);
  //     const response = await fetchAllAppointments(0, 6);
  //     setAppointments(response.appointments);
  //     setBusy(false);
  //   };

  //   fetchBookings();
  // }, []);

  // console.log(appointments);

  return (
    <div className="appointment-table" style={{ padding: padding }}>
      <ToggleAppointment />

      <BookingTable />
    </div>
  );
};

export default AppointmentTable;
