import React, { useEffect, useState } from "react";

import { useAppointments, useAuth } from "../../../hooks";
import TBox from "../../TBox";
import BookingTable from "./BookingTable";
import "../Style/Appointment.css";

const Unconfirmed = () => {
  const {
    fetchAppointments,
    fetchAppointmentsForUser,
    fetchParams,
    setFetchParams,
  } = useAppointments();

  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem("selectedDate") || ""
  );

  const { authInfo } = useAuth();
  const { profile } = authInfo;

  const isPatient = profile?.role === "Patient";
  const isDoctor = profile?.role === "Doctor";

  // Fetch appointments when component mounts
  useEffect(() => {
    // Reset filter to "All Appointments" when navigating back
    setFetchParams(prev => ({
      ...prev,
      selectedDate: selectedDate,
    }));

    if (profile?.id)
      isPatient || isDoctor
        ? fetchAppointmentsForUser(
            profile?.id,
            fetchParams.pageNo,
            fetchParams.limit,
            "Waiting",
            selectedDate
          )
        : fetchAppointments(
            fetchParams.pageNo,
            fetchParams.limit,
            "Waiting",
            selectedDate
          ); // Fetch filtered appointments
  }, [profile?.id, selectedDate]);

  // Handle date selection from `TBox`
  const handleDateSelect = date => {
    setSelectedDate(date);
    // localStorage.setItem("selectedDate", date);

    setFetchParams(prev => ({
      ...prev,
      selectedDate: date, // Update global state
    }));

    if (profile?.id)
      isPatient || isDoctor
        ? fetchAppointmentsForUser(
            profile?.id,
            fetchParams.pageNo,
            fetchParams.limit,
            "Waiting",
            date
          )
        : fetchAppointments(
            fetchParams.pageNo,
            fetchParams.limit,
            "Waiting",
            date
          ); // Fetch appointments by date
  };

  return (
    <section id="appointment-table">
      <div className="appointment-body">
        <TBox
          heading="Unconfirmed"
          showDateTime={true}
          onRefresh={() =>
            isPatient || isDoctor
              ? fetchAppointmentsForUser(
                  profile?.id,
                  0,
                  fetchParams.limit,
                  "Waiting",
                  selectedDate
                )
              : fetchAppointments(0, fetchParams.limit, "Waiting", selectedDate)
          }
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        <BookingTable height="74vh" showAddCab={true} />
      </div>
    </section>
  );
};

export default Unconfirmed;
