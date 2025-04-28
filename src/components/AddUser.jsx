import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormField from "../../Form/FormField";
import DropdownSelect from "../../DropdownSelect";

import { useNotification } from "../../../hooks";
import { addSubAdmin } from "../../../api/admin";
import { isValidEmail } from "../../../utils/helper";

// Default sub-admin structure
const defaultSubAdminInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  roleName: "",
};

// Function to validate sub-admin input fields
const validateSubAdminInfo = ({ firstName, lastName, phoneNumber, email }) => {
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

const AddUser = ({ isClosing, onClose }) => {
  const [subAdminInfo, setSubAdminInfo] = useState({ ...defaultSubAdminInfo });
  const [busy, setBusy] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null); // Tracks dropdown globally

  const { updateNotification } = useNotification();

  // Handles input field changes
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setSubAdminInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handles dropdown role selection
  const handleDropdownChange = (selectedRole) => {
    setSubAdminInfo((prev) => ({ ...prev, roleName: selectedRole }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before making API calls
    const { ok, error } = validateSubAdminInfo(subAdminInfo);
    if (!ok) {
      updateNotification("error", error);
      return;
    }

    // Set busy before API call to prevent multiple requests
    setBusy(true);

    const response = await addSubAdmin(subAdminInfo);

    // Set busy to false before handling response
    setBusy(false);

    if (response.error) {
      return updateNotification("error", response.error);
    }

    // Reset input fields after successful submission
    setSubAdminInfo({ ...defaultSubAdminInfo });

    updateNotification("success", response.message);
    onClose();
  };

  // Closes dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".select-menu")) {
        setActiveDropdownIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const { firstName, lastName, phoneNumber, email } = subAdminInfo;

  return (
    <div className={`box-modal ${isClosing ? "closing" : ""}`}>
      <div className="internal-modal">
        <div className="box-heading">
          <h2>Add Sub Admins</h2>
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
            <div className="col-12">
              <div className="form_field mb-3">
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

            {/* Form Buttons */}
            <div className="box-buttons">
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
                style={{ width: "150px" }}
              >
                Add Sub-Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
