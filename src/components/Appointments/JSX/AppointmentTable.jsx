import React, { useEffect, useState } from "react";
import { useAppointments } from "../../../hooks/index.js";
import ToggleAppointment from "../../ToggleAppointment";
import AppointmentBookingTable from "./AppointmentBookingTable.jsx";

const AppointmentTable = () => {
  const { fetchAppointments, fetchParams, setFetchParams } = useAppointments();
  // console.log(fetchParams);

  const [activeState, setActiveState] = useState(
    localStorage.getItem("activeState") || ""
  ); // Store current filter state

  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem("selectedDate") || ""
  );

  // Fetch appointments when component mounts
  useEffect(() => {
    // Reset filter to "All Appointments" when navigating back
    setFetchParams(prev => ({
      ...prev,
      state: activeState,
      selectedDate: selectedDate,
    }));

    fetchAppointments(
      fetchParams.pageNo,
      fetchParams.limit,
      activeState,
      selectedDate
    ); // Fetch filtered appointments
  }, [activeState, selectedDate]);

  const handleSetActiveState = state => {
    setActiveState(state);
    // localStorage.setItem("activeState", state);
  };

  // Handle date selection from `TBox`
  const handleDateSelect = date => {
    setSelectedDate(date);
    // localStorage.setItem("selectedDate", date);

    setFetchParams(prev => ({
      ...prev,
      selectedDate: date, // Update global state
    }));

    fetchAppointments(0, fetchParams.limit, activeState, date); // Fetch appointments by date
  };

  return (
    <div className="appointment-table">
      <ToggleAppointment
        setActiveState={handleSetActiveState}
        activeState={activeState}
      />

      <AppointmentBookingTable
        onRefresh={() =>
          fetchAppointments(0, fetchParams.limit, activeState, selectedDate)
        }
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default AppointmentTable;
