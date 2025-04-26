import { catchError } from "../utils/helper";
import client from "./client";

export const signUpUser = async formData => {
  try {
    const { data } = await client.post("/user/sign-up", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const verifyUserEmail = async userInfo => {
  try {
    const { data } = await client.post("/user/verify-email", userInfo);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const signInUser = async userInfo => {
  try {
    const { data } = await client.post("/user/sign-in", userInfo);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getIsAuth = async token => {
  try {
    const { data } = await client.get("/user/is-auth", {
      headers: { Authorization: "Bearer " + token, accept: "application/json" },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const forgetPassword = async email => {
  try {
    const { data } = await client.post("/user/forget-password", { email });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const verifyPasswordResetToken = async (token, userId) => {
  try {
    const { data } = await client.post("/user/verify-pass-reset-token", {
      token,
      userId,
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const resetPassword = async passwordInfo => {
  try {
    const { data } = await client.post("/user/reset-password", passwordInfo);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const resendEmailVerificationToken = async userId => {
  try {
    const { data } = await client.post(
      "/user/resend-email-verification-token",
      { userId }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const changePassword = async passwordInfo => {
  try {
    const { data } = await client.post("/user/change-password", passwordInfo);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
