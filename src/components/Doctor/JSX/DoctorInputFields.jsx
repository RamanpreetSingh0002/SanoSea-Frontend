import React, { useRef, useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import FormField from "../../Form/FormField";

const DoctorInputFields = () => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState("");
  const fileInputRef = useRef();

  const updateProfilePhoto = (file) => {
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
          <div className="col-md-6">
            <FormField
              // value={userInfo.email}
              // onChange={handleChange}
              id="firstName"
              name="firstName"
              label="First Name"
              placeholder="Enter First Name"
              // iconClass="fa-solid fa-pen"
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
              // iconClass="fa-solid fa-pen"
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
              iconClass="fa-solid fa-envelope"
              style={{ color: "#cccccc" }}
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
              iconClass="fa-solid fa-phone-flip"
              style={{ color: "#cccccc" }}
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
