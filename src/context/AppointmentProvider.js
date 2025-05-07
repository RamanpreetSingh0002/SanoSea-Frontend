import React, { createContext, useEffect, useState } from "react";
import { fetchAllAppointments } from "../api/appointment";

export const AppointmentContext = createContext();

const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [fetchParams, setFetchParams] = useState({
    pageNo: localStorage.getItem("currentPage")
      ? parseInt(localStorage.getItem("currentPage"))
      : 0,
    state: localStorage.getItem("stateQuery") || "",
    limit: 5,
  });
  const [busy, setBusy] = useState(false);

  // Fetch appointments with pagination & state filtering
  const fetchAppointments = async (
    pageNo = fetchParams.pageNo,
    limit = fetchParams.limit,
    state = fetchParams.state
  ) => {
    setBusy(true);
    localStorage.setItem("currentPage", pageNo); // Store page number in local storage
    localStorage.setItem("stateQuery", state); // Store state query in local storage
    setFetchParams({ pageNo, limit, state }); // Update parameters in state

    const response = await fetchAllAppointments(pageNo, limit, state);
    setBusy(false);

    if (!response.error) {
      setAppointments(response.appointments);
      setTotalAppointments(response.pagination?.totalAppointments || 0);
    }
  };

  useEffect(() => {
    fetchAppointments(); // Fetch appointments on mount
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        totalAppointments,
        busy,
        fetchParams,
        setFetchParams,
        fetchAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentProvider;
