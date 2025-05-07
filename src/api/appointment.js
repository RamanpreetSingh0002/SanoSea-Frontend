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

export const fetchAllAppointments = async (pageNo, limit, state) => {
  const token = getToken();
  try {
    const { data } = await client.get("/appointment/appointments", {
      params: { pageNo, limit, state },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
