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

export const getUserByRole = async (roles, pageNo, limit, search) => {
  const token = getToken();
  try {
    const { data } = await client.get("/admin/users-by-roles", {
      params: { roles, pageNo, limit, search },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getSingleUser = async userId => {
  const token = getToken();
  try {
    const { data } = await client.get("/admin/user/" + userId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteUser = async userId => {
  const token = getToken();
  try {
    const { data } = await client.delete("/admin/user/" + userId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateUserState = async (userId, state) => {
  const token = getToken();
  try {
    const { data } = await client.put("/admin/update-state/" + userId, state, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateUser = async (userId, userInfo) => {
  const token = getToken();
  try {
    const { data } = await client.put("/admin/user/" + userId, userInfo, {
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
