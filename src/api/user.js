import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const updateUser = async (id, userInfo) => {
  const token = getToken();
  try {
    const { data } = await client.put("/user/update-user/" + id, userInfo, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateProfilePhoto = async userProfilePhoto => {
  const token = getToken();
  const formData = new FormData();
  formData.append("profilePhoto", userProfilePhoto); // Attach file

  try {
    const { data } = await client.post("/user/upload-profile-photo", formData, {
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

export const fetchPatientsByName = async search => {
  const token = getToken();
  try {
    const { data } = await client.get(`/user/patients?search=${search}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const fetchDoctorsBySpeciality = async speciality => {
  const token = getToken();
  try {
    const { data } = await client.get("/user/doctors", {
      params: { speciality },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
