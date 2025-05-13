import React, { createContext, useEffect, useState } from "react";
import {
  fetchAllAppointments,
  fetchTodayBookings,
  fetchUserAppointments,
} from "../api/appointment";

export const AppointmentContext = createContext();

const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);

  // Reset stateQuery to default (empty) if the page is reloaded
  // useEffect(() => {
  //   localStorage.setItem("stateQuery", "");
  //   // localStorage.removeItem("stateQuery"); // Clear stored state
  // }, []);

  const [fetchParams, setFetchParams] = useState({
    pageNo: localStorage.getItem("currentPage")
      ? parseInt(localStorage.getItem("currentPage"))
      : 0,
    state: localStorage.getItem("stateQuery") || "",
    limit: 5,
    userId: null,
    selectedDate: localStorage.getItem("selectedDate") || "",
  });

  const [busy, setBusy] = useState(false);

  // Fetch appointments with pagination & state filtering
  const fetchAppointments = async (
    pageNo = fetchParams.pageNo,
    limit = fetchParams.limit,
    state = fetchParams.state,
    date = fetchParams.selectedDate
  ) => {
    setBusy(true);
    localStorage.setItem("currentPage", pageNo);
    localStorage.setItem("stateQuery", state);
    localStorage.setItem("selectedDate", date);

    setFetchParams({ pageNo, limit, state, selectedDate: date }); // Update parameters in state

    const response = await fetchAllAppointments(pageNo, limit, state, date);
    setBusy(false);

    if (!response.error) {
      setAppointments(response.appointments);
      setTotalAppointments(response.pagination?.totalAppointments || 0);
    }
  };

  // Fetch appointments for a specific user (patient or doctor)
  const fetchAppointmentsForUser = async (
    userId,
    pageNo = fetchParams.pageNo,
    limit = fetchParams.limit,
    state = fetchParams.state,
    date = fetchParams.selectedDate
  ) => {
    setBusy(true);
    localStorage.setItem("currentPage", pageNo);
    localStorage.setItem("stateQuery", state);
    localStorage.setItem("selectedDate", date);

    setFetchParams({ userId, pageNo, limit, state, selectedDate: date });

    const response = await fetchUserAppointments(
      userId,
      pageNo,
      limit,
      state,
      date
    );
    setBusy(false);

    if (!response.error) {
      setAppointments(response.appointments);
      setTotalAppointments(response.pagination?.totalAppointments || 0);
    }
  };

  const fetchTodayAppointments = async (
    pageNo = fetchParams.pageNo,
    limit = fetchParams.limit
  ) => {
    setBusy(true);
    localStorage.setItem("currentPage", pageNo);
    setFetchParams({ pageNo, limit });

    const response = await fetchTodayBookings(pageNo, limit); //  Call API for today's bookings
    setBusy(false);

    if (!response.error) {
      setAppointments(response.appointments);
      setTotalAppointments(response.pagination?.totalAppointments || 0);
    }
  };

  // useEffect(() => {
  //   fetchAppointments(); // Fetch appointments on mount
  // }, []);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        totalAppointments,
        busy,
        fetchParams,
        setFetchParams,
        fetchAppointments,
        fetchAppointmentsForUser,
        fetchTodayAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentProvider;
