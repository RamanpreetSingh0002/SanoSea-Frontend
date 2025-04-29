import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addUser = async userInfo => {
  const token = getToken();
  try {
    const { data } = await client.post("/admin/create", userInfo, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
