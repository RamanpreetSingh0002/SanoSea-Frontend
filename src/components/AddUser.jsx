import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useNotification } from "../hooks";
import { isValidEmail } from "../utils/helper";
import { addUser } from "../api/admin";

import FormField from "./Form/FormField";
import DropdownSelect from "./DropdownSelect";

// Default sub-admin structure
const defaultUserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  roleName: "",
};

// Function to validate sub-admin input fields
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

const AddUser = ({ isClosing, onClose, header }) => {
  const [UserInfo, setUserInfo] = useState({ ...defaultUserInfo });
  const [busy, setBusy] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null); // Tracks dropdown globally

  const { updateNotification } = useNotification();

  const location = useLocation();
  const isSubAdminPage = location.pathname === "/auth/sub-admin";

  // Handles input field changes
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handles dropdown role selection
  const handleDropdownChange = selectedRole => {
    setUserInfo(prev => ({ ...prev, roleName: selectedRole }));
  };

  // Handles form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Validate before making API calls
    const { ok, error } = validateUserInfo(UserInfo);
    if (!ok) {
      updateNotification("error", error);
      return;
    }

    // Set busy before API call to prevent multiple requests
    setBusy(true);

    const response = await addUser(UserInfo);

    // Set busy to false before handling response
    setBusy(false);

    if (response.error) {
      return updateNotification("error", response.error);
    }

    // Reset input fields after successful submission
    setUserInfo({ ...defaultUserInfo });

    updateNotification("success", response.message);
    onClose();
  };

  // Closes dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (!event.target.closest(".select-menu")) {
        setActiveDropdownIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const { firstName, lastName, phoneNumber, email } = UserInfo;

  return (
    <div className={`box-modal ${isClosing ? "closing" : ""}`}>
      <div className="internal-modal">
        <div className="box-heading">
          <h2>Add {header}</h2>
        </div>

        {/* Form Submission */}
        <form onSubmit={!busy ? handleSubmit : null}>
          <div className="row">
            {/* First Name Field */}
            <div className="col-12">
              <FormField
                value={firstName}
                onChange={handleChange}
                name="firstName"
                label="First Name"
                placeholder="First name"
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
                placeholder="Last name"
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
                placeholder="Email ID"
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
                placeholder="Phone Number"
                iconClass="fa-solid fa-phone"
                type="tel"
              />
            </div>

            {/* Dropdown Selection for Role */}
            {isSubAdminPage && (
              <div className="col-12">
                <div className="form_field">
                  <label>Sub-Admin Role</label>
                  <DropdownSelect
                    defaultClass="default-value"
                    defaultValue="Select Sub-Admin Type"
                    options={["Coordinator", "Audit Manager"]}
                    index={0} // Unique index for tracking
                    activeDropdownIndex={activeDropdownIndex}
                    setActiveDropdownIndex={setActiveDropdownIndex}
                    onChange={handleDropdownChange}
                  />
                </div>
              </div>
            )}

            {/* Form Buttons */}
            <div className="box-buttons mt-3">
              <button
                type="button"
                className="btn cancel-btn"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn add-btn"
                style={{ width: "auto" }}
              >
                Add {header}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
