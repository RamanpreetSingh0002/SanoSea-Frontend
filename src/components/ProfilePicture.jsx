import React, { useRef, useState } from "react";
import FormField from "./Form/FormField";

const ProfilePicture = () => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState("");
  const fileInputRef = useRef();

  const updateProfilePhoto = file => {
    const url = URL.createObjectURL(file);
    setSelectedProfilePhoto(url);
  };
  const handleFileChange = ({ target }) => {
    const file = target.files[0];
    if (file) {
      updateProfilePhoto(file);
      // return setUserInfo({ ...userInfo, profilePhoto: file });
      return;
    }
  };

  return (
    <div className="profile-left">
      {/* <div className="profile-picture">
        <img src="../images/person-dummy.jpg" alt="Profile" />
        <p>Edit Picture</p>
      </div> */}

      {/* Profile Photo */}
      <div className="col-12">
        <div className="profile_wrapper">
          <div
            className="profile_upload"
            onClick={() => fileInputRef.current.click()} // Trigger file input click
          >
            <div
              className="profile_img"
              style={{ height: "177px", width: "177px" }}
            >
              {selectedProfilePhoto ? (
                <img src={selectedProfilePhoto} alt="" />
              ) : (
                // <i className="fa-regular fa-user"></i>
                <img src="../images/person-dummy.jpg" alt="Profile" />
              )}
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
      </div>

      <div className="section-conatiner">
        {/* <div className="left-section"> */}{" "}
        <div className="profile-right-custom">
          <form className="profile-form">
            <div className="row">
              <div className="col-md-6">
                <FormField
                  // value={userInfo.email}
                  // onChange={handleChange}
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  placeholder="Enter First Name"
                  iconClass="fa-solid fa-pen"
                  style={{ color: "#898b90" }}
                  type="text"
                />
              </div>
              <div className="col-md-6">
                <FormField
                  // value={userInfo.email}
                  // onChange={handleChange}
                  id="lasttName"
                  name="lasttName"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  iconClass="fa-solid fa-pen"
                  style={{ color: "#898b90" }}
                  type="text"
                />
              </div>
              <div className="col-md-6">
                <FormField
                  // value={userInfo.email}
                  // onChange={handleChange}
                  id="emailID"
                  name="emailID"
                  label="Email ID"
                  placeholder="Enter Your Email ID"
                  iconClass="fa-solid fa-pen"
                  // style={{ color: "#898b90" }}
                  type="email"
                />
              </div>
              <div className="col-md-6">
                <FormField
                  // value={userInfo.email}
                  // onChange={handleChange}
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter Your Phone Number"
                  iconClass="fa-solid fa-pen"
                  style={{ color: "#898b90" }}
                  type="tel"
                />
              </div>
              <div className="col-md-6">
                <FormField
                  // value={userInfo.email}
                  // onChange={handleChange}
                  id="address"
                  name="address"
                  label="Address "
                  placeholder="Enter Your Address"
                  iconClass="fa-solid fa-pen"
                  style={{ color: "#898b90" }}
                  type="text"
                />
              </div>
              <div className="col-md-6">
                {" "}
                <div className="button-row">
                  <button type="button" className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save Change
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>{" "}
        {/* </div> */}
        {/* <div className="right-section"> */}{" "}
        <div className="change-password">
          <FormField
            // value={userInfo.password}
            // onChange={handleChange}
            id="oldPassword"
            name="oldPassword"
            label="Old Password"
            placeholder="Enter Your Old Password"
            iconClass={oldPasswordVisible ? "fa-eye-slash" : "fa-eye"}
            type={oldPasswordVisible ? "text" : "password"}
            toggleVisibility={() => setOldPasswordVisible(!oldPasswordVisible)}
          />

          <FormField
            // value={userInfo.password}
            // onChange={handleChange}
            id="newPassword"
            name="newPassword"
            label="New Password"
            placeholder="Enter Your New Password"
            iconClass={newPasswordVisible ? "fa-eye-slash" : "fa-eye"}
            type={newPasswordVisible ? "text" : "password"}
            toggleVisibility={() => setNewPasswordVisible(!newPasswordVisible)}
          />

          <FormField
            // value={userInfo.password}
            // onChange={handleChange}
            id="confirmPassword"
            name="ConfirmPassword"
            label="confirm Password"
            placeholder="Confirm Your Old Password"
            iconClass={confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}
            type={confirmPasswordVisible ? "text" : "password"}
            toggleVisibility={() =>
              setConfirmPasswordVisible(!confirmPasswordVisible)
            }
          />

          <button className="chng-pass"> Change Password </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProfilePicture;
