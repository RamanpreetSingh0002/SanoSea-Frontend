import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addCabDetails = async (appointmentId, cabData) => {
  const token = getToken();
  try {
    const { data } = await client.post(`/cab/add/${appointmentId}`, cabData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
