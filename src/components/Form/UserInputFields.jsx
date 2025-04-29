import React from "react";
import FormField from "./FormField";

const UserInputFields = ({ userInfo, handleChange }) => {
  const { firstName, lastName, email, phoneNumber } = userInfo;

  return (
    <>
      <div className="col-12">
        {/* First Name Field */}
        <FormField
          value={firstName}
          onChange={handleChange}
          name="firstName"
          label="First Name"
          placeholder="Enter First Name"
          type="text"
        />
      </div>

      {/* Last Name Field */}
      <div className="col-12">
        <FormField
          value={lastName}
          onChange={handleChange}
          name="lastName"
          label="Last Name"
          placeholder="Enter Last Name"
          type="text"
        />
      </div>

      {/* Email Field */}
      <div className="col-12">
        <FormField
          value={email}
          onChange={handleChange}
          name="email"
          label="Email ID"
          placeholder="Enter Email ID"
          iconClass="fa-solid fa-envelope"
          type="email"
        />
      </div>

      {/* Phone Number Field */}
      <div className="col-12">
        <FormField
          value={phoneNumber}
          onChange={handleChange}
          name="phoneNumber"
          label="Phone Number"
          placeholder="Enter Phone Number"
          iconClass="fa-solid fa-phone"
          type="tel"
        />
      </div>
    </>
  );
};

export default UserInputFields;
