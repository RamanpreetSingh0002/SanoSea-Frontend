import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addSubAdmin = async subAdminInfo => {
  const token = getToken();
  try {
    const { data } = await client.post("/admin/create", subAdminInfo, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
