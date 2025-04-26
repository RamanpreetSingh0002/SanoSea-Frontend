import React, { useRef, useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import FormField from "../../Form/FormField";

const DoctorInputFields = () => {
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
    }
  };

  return (
    <>
      <form className="profile-details">
        <div className="row">
          <div className="col-12">
            <FormField
              // value={userInfo.email}
              // onChange={handleChange}
              name="firstName"
              label="First Name"
              placeholder="Enter First Name"
              type="text"
            />
          </div>
          <div className="col-12">
            <FormField
              // value={userInfo.email}
              // onChange={handleChange}
              name="lastName"
              label="Last Name"
              placeholder="Enter Last Name"
              type="text"
            />
          </div>
          <div className="col-12">
            <FormField
              // value={userInfo.email}
              // onChange={handleChange}
              name="email"
              label="Email ID"
              placeholder="Enter Your Email ID"
              iconClass="fa-solid fa-envelope"
              type="email"
            />
          </div>
          <div className="col-12">
            <FormField
              // value={userInfo.email}
              // onChange={handleChange}
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter Your Phone Number"
              iconClass="fa-solid fa-phone"
              type="tel"
            />
          </div>
        </div>
      </form>{" "}
      {/* </div> */}
      {/* <div className="right-section"> */}{" "}
    </>
  );
};

export default DoctorInputFields;
