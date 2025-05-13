import React, { useContext, useEffect, useRef, useState } from "react";
import FormField from "../../Form/FormField.jsx";

import { AuthContext } from "../../../context/AuthProvider.js";
import { useNotification } from "../../../hooks/index.js";
import { changePassword } from "../../../api/auth.js";
import { isValidEmail } from "../../../utils/helper.js";
import { updateProfilePhoto, updateUser } from "../../../api/user.js";

import { ImSpinner3 } from "react-icons/im";

import "../Style/EditProfile.css";

const defaultUserInfo = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  officeAddress: "",
};

const validateUserInfo = ({ firstName, lastName, phoneNumber, email }) => {
  const isValidName = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

  if (!firstName.trim()) return { ok: false, error: "First name is missing!" };
  if (!isValidName.test(firstName))
    return { ok: false, error: "Invalid first name!" };

  // Check lastName only if it's provided (optional)
  if (lastName && !isValidName.test(lastName))
    return { ok: false, error: "Invalid last name!" };

  if (!phoneNumber.trim())
    return { ok: false, error: "Phone number is missing!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  return { ok: true };
};

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({ ...defaultUserInfo });
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState("");

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [profilePhotoBusy, setProfilePhotoBusy] = useState(false);
  const [profileBusy, setProfileBusy] = useState(false);
  const [changePassBusy, setChangePassBusy] = useState(false);

  const fileInputRef = useRef();

  const { authInfo, isAuth, handleLogout } = useContext(AuthContext);
  const { profile } = authInfo;

  const { updateNotification } = useNotification();

  const handleFileChange = async ({ target }) => {
    const file = target.files[0];

    if (file) {
      const previousPhoto = profile?.profilePhoto?.url || "/images/user.png"; // Store old photo

      setSelectedProfilePhoto(URL.createObjectURL(file)); // Update UI instantly

      setProfilePhotoBusy(true);
      const response = await updateProfilePhoto(file); // Upload file
      setProfilePhotoBusy(false);

      if (response.error) {
        updateNotification("error", response.error);

        // Restore previous profile photo if an error occurs
        setSelectedProfilePhoto(previousPhoto);
        return;
      }

      // Automatically refresh user data using isAuth()
      await isAuth(); // Ensures profilePhoto updates globally

      updateNotification("success", response.message);
    }
  };

  const handleUserInfoChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleUserInfoSubmit = async e => {
    e.preventDefault();

    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification("error", error);

    setProfileBusy(true);
    const response = await updateUser(profile?.id, userInfo);
    setProfileBusy(false);

    if (response.error) return updateNotification("error", response.error);

    // Automatically refresh user data using isAuth()
    await isAuth(); // This will fetch the latest user info from the backend

    updateNotification("success", response.message);
  };

  const handlePasswordChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault();

    if (!password.current || !password.new || !password.confirm)
      return updateNotification("error", "All fields are required!");

    if (password.new.length < 8)
      return updateNotification(
        "error",
        "New Password must be at least 8 characters!"
      );

    if (password.new !== password.confirm)
      return updateNotification(
        "error",
        "New Password and Confirm Password do not match!"
      );

    setChangePassBusy(true);

    // Send data to the backend
    const { error, message } = await changePassword({
      email: profile?.email,
      oldPassword: password.current,
      newPassword: password.new,
      confirmPassword: password.confirm,
    });

    setChangePassBusy(false);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    setPassword({ current: "", new: "", confirm: "" });

    handleLogout();
  };

  useEffect(() => {
    if (profile) {
      setUserInfo({
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        phoneNumber: profile?.phoneNumber,
        email: profile?.email,
        officeAddress: profile?.officeAddress,
      });
      setSelectedProfilePhoto(profile?.profilePhoto?.url || "/images/user.png");
    }
  }, [profile]);

  return (
    <section className="profile-section">
      <div className="user-profile">
        {/* Profile Photo */}
        <div className="profile_wrapper">
          <div
            className="profile_upload"
            onClick={() => fileInputRef.current.click()} // Trigger file input click
          >
            <div
              className="profile_img"
              style={{ height: "177px", width: "177px", position: "relative" }}
            >
              {profilePhotoBusy && (
                <ImSpinner3
                  className="animate-spin"
                  style={{
                    height: "25px",
                    width: "25px",
                    position: "absolute",
                  }}
                />
              )}
              <img src={selectedProfilePhoto} alt="Profile" />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              name="profilePhoto"
              id="profilePhoto"
              onChange={handleFileChange}
              hidden
            />

            <label
              htmlFor="profilePhoto"
              className="upload_icon"
              style={{
                height: "40px",
                width: "40px",
                border: "2px solid white",
                background: " #005c75",
              }}
            >
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
            </label>
          </div>

          <label className="upload_profile">Upload Profile</label>
        </div>

        <div className="section-container mt-3">
          {/* Update user profile */}
          <div className="profile-right-custom">
            <form onSubmit={handleUserInfoSubmit} className="profile-form">
              <div className="row">
                <div className="col-md-6">
                  <FormField
                    value={userInfo.firstName}
                    onChange={handleUserInfoChange}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter First Name"
                    iconClass="fa-solid fa-pen"
                    type="text"
                  />
                </div>

                <div className="col-md-6">
                  <FormField
                    value={userInfo.lastName}
                    onChange={handleUserInfoChange}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    iconClass="fa-solid fa-pen"
                    type="text"
                  />
                </div>

                <div className="col-md-6">
                  <FormField
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    name="email"
                    label="Email ID"
                    placeholder="Enter Your Email ID"
                    iconClass="fa-solid fa-pen"
                    type="email"
                  />
                </div>

                <div className="col-md-6">
                  <FormField
                    value={userInfo.phoneNumber}
                    onChange={handleUserInfoChange}
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Enter Your Phone Number"
                    iconClass="fa-solid fa-pen"
                    type="tel"
                  />
                </div>

                <div className="col-md-6">
                  <FormField
                    value={userInfo.officeAddress}
                    onChange={handleUserInfoChange}
                    name="address"
                    label="Address "
                    placeholder="Enter Your Address"
                    iconClass="fa-solid fa-pen"
                    type="text"
                  />
                </div>

                <div className="col-md-6">
                  <div className="button-row">
                    <button
                      type="submit"
                      style={{ width: "145px" }}
                      className="save-btn"
                    >
                      {profileBusy ? (
                        <ImSpinner3 className="animate-spin" />
                      ) : (
                        "Save Change"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="change-password">
            <form onSubmit={handlePasswordSubmit}>
              <div className="row" style={{ gap: "8px" }}>
                <div className="col-12">
                  <FormField
                    value={password.current}
                    onChange={handlePasswordChange}
                    id="currentPassword"
                    name="current"
                    label="Current Password"
                    placeholder="Enter Your Current Password"
                    iconClass={
                      currentPasswordVisible ? "fa-eye-slash" : "fa-eye"
                    }
                    type={currentPasswordVisible ? "text" : "password"}
                    toggleVisibility={() =>
                      setCurrentPasswordVisible(!currentPasswordVisible)
                    }
                  />
                </div>

                <div className="col-12">
                  <FormField
                    value={password.new}
                    onChange={handlePasswordChange}
                    id="newPassword"
                    name="new"
                    label="New Password"
                    placeholder="Enter Your New Password"
                    iconClass={newPasswordVisible ? "fa-eye-slash" : "fa-eye"}
                    type={newPasswordVisible ? "text" : "password"}
                    toggleVisibility={() =>
                      setNewPasswordVisible(!newPasswordVisible)
                    }
                  />
                </div>

                <div className="col-12">
                  <FormField
                    value={password.confirm}
                    onChange={handlePasswordChange}
                    id="confirmPassword"
                    name="confirm"
                    label="Confirm Password"
                    placeholder="Confirm Your New Password"
                    iconClass={
                      confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"
                    }
                    type={confirmPasswordVisible ? "text" : "password"}
                    toggleVisibility={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  />
                </div>

                <div className="col-12">
                  <button className="chng-pass">
                    {changePassBusy ? (
                      <ImSpinner3 className="animate-spin" />
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
