import React from "react";
import FormField from "./FormField";

const ProfileForm = () => (
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
            style={{ color: "#898b90" }}
            type="text"
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
            type="text"
          />
        </div>
      </div>

      <div className="button-row">
        <button type="button" className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="save-btn">
          Save Change
        </button>
      </div>
    </form>
  </div>
);

export default ProfileForm;
