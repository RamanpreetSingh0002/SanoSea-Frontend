import React, { useEffect, useState } from "react";
import { useAppointments } from "../../../hooks";
import ToggleAppointment from "../../ToggleAppointment";
import AppointmentBookingTable from "../../Appointments/JSX/AppointmentBookingTable";

const UserAppointmentTable = ({ userId }) => {
  const { fetchAppointmentsForUser, fetchParams, setFetchParams } =
    useAppointments();
  const [activeState, setActiveState] = useState(
    localStorage.getItem("activeState") || ""
  );
  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem("selectedDate") || ""
  );

  useEffect(() => {
    // Fetch appointments for the specific doctor when component mounts
    setFetchParams(prev => ({
      ...prev,
      state: activeState, // Ensure correct state persists after refresh
      userId: userId, // Fetch only this user's appointments
      selectedDate: selectedDate,
    }));

    fetchAppointmentsForUser(
      userId,
      fetchParams.pageNo,
      fetchParams.limit,
      activeState,
      selectedDate
    ); // Use active state for fetching
  }, [userId, activeState, selectedDate]);

  const handleSetActiveState = state => {
    setActiveState(state);
    // localStorage.setItem("activeState", state);
  };

  const handleDateSelect = date => {
    setSelectedDate(date);
    // localStorage.setItem("selectedDate", date); // Store selected date globally

    setFetchParams(prev => ({
      ...prev,
      selectedDate: date,
    }));

    fetchAppointmentsForUser(userId, 0, fetchParams.limit, activeState, date);
  };

  return (
    <div className="appointment-table" style={{ padding: "0px" }}>
      <ToggleAppointment
        setActiveState={handleSetActiveState}
        activeState={activeState}
      />

      <AppointmentBookingTable
        onRefresh={() =>
          fetchAppointmentsForUser(
            userId,
            fetchParams.pageNo,
            fetchParams.limit,
            activeState,
            selectedDate
          )
        }
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default UserAppointmentTable;
