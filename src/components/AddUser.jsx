import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { ImSpinner3 } from "react-icons/im";

import { useNotification } from "../hooks";
import { isValidEmail } from "../utils/helper";
import { addUser } from "../api/admin";

import DropdownSelect from "./DropdownSelect";
import UserInputFields from "./Form/UserInputFields";
import DoctorUploadSection from "./Doctor/JSX/DoctorUploadSection";
import DoctorFooterActions from "./Doctor/JSX/DoctorFooterActions";

// Default sub-admin structure
const defaultUserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  roleName: "",
  licenseProof: null,
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

const AddUser = ({ isClosing, onClose, header, width }) => {
  const [userInfo, setUserInfo] = useState({ ...defaultUserInfo });
  const [busy, setBusy] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null); // Tracks dropdown globally

  const { updateNotification } = useNotification();

  const location = useLocation();
  const path = location.pathname;

  // Function to determine default role name based on the current path
  const getRoleName = () => {
    if (path === "/auth/general-physician") return "General Physician";
    if (path === "/auth/port-agent") return "Port Agent";
    if (path === "/auth/doctor") return "Doctor";
    return ""; // Default empty role for Sub-Admin (user selects manually)
  };

  // Handles input field changes
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = file => {
    setUserInfo(prev => ({ ...prev, licenseProof: file }));
  };

  // Handles dropdown role selection
  const handleDropdownChange = selectedRole => {
    setUserInfo(prev => ({ ...prev, roleName: selectedRole }));
  };

  // Handles form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Validate before making API calls
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) {
      updateNotification("error", error);
      return;
    }

    const formData = new FormData();
    Object.keys(userInfo).forEach(key => {
      if (userInfo[key]) {
        formData.append(key, userInfo[key]);
      }
    });

    if (path === "/auth/doctor") {
      // Ensure the document is uploaded before submitting
      if (!userInfo.licenseProof) {
        updateNotification("error", "Doctor's license proof is required!");
        return;
      }
    }

    // Set busy before API call to prevent multiple requests
    setBusy(true);

    const response = await addUser(formData); // API call for user creation

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

  useEffect(() => {
    setUserInfo(prev => ({
      ...prev,
      roleName: getRoleName(), // Update role name dynamically
    }));
  }, [path]); // Re-run effect whenever `path` changes

  return (
    <div className={`box-modal ${isClosing ? "closing" : ""}`}>
      <div className="internal-modal">
        <div className="box-heading">
          <h2>Add {header}</h2>
        </div>

        {/* Form Submission */}
        <form onSubmit={!busy ? handleSubmit : null}>
          <div className="row">
            <UserInputFields userInfo={userInfo} handleChange={handleChange} />

            {/* Dropdown Selection for Role */}
            {path === "/auth/sub-admin" && (
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

            {path === "/auth/doctor" ? (
              <>
                <DoctorUploadSection handleFileUpload={handleFileUpload} />

                <div className="col-12">
                  <button type="button" className="availability-btn">
                    Manage Availability <FaCalendarAlt />
                  </button>
                </div>

                <DoctorFooterActions onClose={onClose} busy={busy} />
              </>
            ) : (
              <>
                {/* Form Buttons */}
                <div className="col-12">
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
                      style={{ width: width }}
                    >
                      {busy ? (
                        <ImSpinner3 className="animate-spin" />
                      ) : (
                        `Add ${header}`
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
