import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const bookAppointment = async formData => {
  const token = getToken();
  try {
    const { data } = await client.post("/appointment/book", formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const fetchAllAppointments = async (pageNo, limit, state, date) => {
  const token = getToken();
  try {
    const { data } = await client.get("/appointment/appointments", {
      params: { pageNo, limit, state, date },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const fetchUserAppointments = async (
  userId,
  pageNo,
  limit,
  state,
  date
) => {
  const token = getToken();
  try {
    const { data } = await client.get(
      `/appointment/appointments/user/${userId}`,
      {
        params: { pageNo, limit, state, date },
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const fetchAppointment = async appointmentId => {
  const token = getToken();
  try {
    const { data } = await client.get(
      `/appointment/appointments/${appointmentId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const assignDoctorToAppointment = async (appointmentId, doctorId) => {
  const token = getToken();
  try {
    const { data } = await client.post(
      `/appointment/assign-doctor/${appointmentId}`,
      { doctorId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const cancelAppointment = async appointmentId => {
  const token = getToken();

  try {
    const { data } = await client.put(
      `/appointment/cancel/${appointmentId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const fetchTodayBookings = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client.get("/appointment/today", {
      params: { pageNo, limit },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const fetchDashboardStats = async () => {
  const token = getToken();
  try {
    const { data } = await client.get("/appointment/dashboard-stats", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const fetchCurrentBooking = async patientId => {
  const token = getToken();
  try {
    const { data } = await client.get(
      `/appointment/current-booking/${patientId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const fetchNewlyAssignedAppointments = async () => {
  const token = getToken();
  const doctorId = "6818b6d439730375eb51ae11";
  try {
    const { data } = await client.get(
      "/appointment/newly-assigned/" + doctorId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const fetchDoctorAppointmentsByMonth = async (month, year) => {
  const token = getToken();
  const doctorId = "6818b6d439730375eb51ae11";
  try {
    const { data } = await client.get(
      `/appointment/doctor-appointments-month/${doctorId}/${month}/${year}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data; // Return appointments mapped to dates
  } catch (error) {
    return catchError(error);
  }
};
