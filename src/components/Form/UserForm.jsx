import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { ImSpinner3 } from "react-icons/im";

import { useApi, useNotification, useUserForm } from "../../hooks";
import { isValidEmail } from "../../utils/helper";

import UserInputFields from "./UserInputFields";
import DropdownSelect from "../DropdownSelect";
import DoctorUploadSection from "../Doctor/JSX/DoctorUploadSection";
import DoctorFooterActions from "../Doctor/JSX/DoctorFooterActions";

// Default sub-admin structure
const defaultUserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  roleName: "",
  doctorSpeciality: "",
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

const UserForm = ({ user, isClosing, onClose, header, width }) => {
  const [userInfo, setUserInfo] = useState({ ...defaultUserInfo });
  const [busy, setBusy] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null); // Tracks dropdown globally

  const { handleAddUser, handleUpdateUser, fetchUsers, fetchUser } = useApi();
  const { updateNotification } = useNotification();

  const { isUserFormOpen } = useUserForm();

  const location = useLocation();
  const path = location.pathname;
  console.log(path);

  const isUserProfile = path.startsWith("/auth/user-profile/");

  const showDoctorFormFields =
    path === "/auth/doctor" || userInfo?.roleName === "Doctor";

  // Function to determine default role name based on the current path
  const getRoleName = () => {
    if (path === "/auth/general-physician") return "General Physician";
    else if (path === "/auth/port-agent") return "Port Agent";
    else if (path === "/auth/doctor") return "Doctor";
    else if (user) return user?.roleId?.name || user?.role;
    else return ""; // Default empty role for Sub-Admin (user selects manually)
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
  const handleDropdownChange = selectedValue => {
    if (path === "/auth/doctor")
      setUserInfo(prev => ({ ...prev, doctorSpeciality: selectedValue }));
    else setUserInfo(prev => ({ ...prev, roleName: selectedValue }));
  };

  // Handles form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Validate before making API calls
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification("error", error);

    const formData = new FormData();
    Object.keys(userInfo).forEach(key => {
      if (userInfo[key]) {
        formData.append(key, userInfo[key]);
      }
    });

    // if (path === "/auth/doctor" && !userInfo.licenseProof)
    //   return updateNotification("error", "Doctor's license proof is required!");

    // Set busy before API call to prevent multiple requests
    setBusy(true);

    let response;
    if (user) {
      response = await handleUpdateUser(user?._id, formData); // Edit user
    } else {
      response = await handleAddUser(formData); // Add user
    }

    // Set busy to false before handling response
    setBusy(false);

    if (response.error) return updateNotification("error", response.error);

    updateNotification("success", response.message);

    if (isUserProfile) fetchUser(user?._id); // Fetch the updated user data

    fetchUsers(); // Refresh the user list
    onClose();
    setTimeout(() => setUserInfo({ ...defaultUserInfo }), 400); // Reset form data
  };

  console.log(userInfo?.roleName);

  const isSubAdmin = ["Coordinator", "Audit Manager"].includes(
    user?.roleId?.name || user?.role
  );

  // Reset form on close
  useEffect(() => {
    if (!isClosing) {
      setUserInfo(user || { ...defaultUserInfo, roleName: getRoleName() });
    }
  }, [isClosing, user]);

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

  // Handle dynamic roleName updates based on path changes
  useEffect(() => {
    setUserInfo(prev => ({
      ...prev,
      roleName: prev.roleName || getRoleName(), // Update role name dynamically
    }));
  }, [isUserFormOpen, path]); // Re-run effect whenever `path` changes

  // Update user info when user is available
  useEffect(() => {
    if (user) {
      setUserInfo({
        firstName: user?.firstName,
        lastName: user?.lastName,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
        doctorSpeciality: user?.doctorProfile?.doctorSpeciality,
        roleName: user?.roleId?.name || user?.role,
        licenseProof: user?.doctorProfile?.licenseProof?.public_id,
      });
    }
  }, [user]);

  if (!isUserFormOpen) return null;

  return (
    <div className="box-overlay">
      <div className={`box-modal ${isClosing ? "closing" : ""}`}>
        <div className="internal-modal">
          <div className="box-heading">
            <h2>
              {user ? "Edit" : "Add"} {header}
            </h2>
          </div>

          {/* Form Submission */}
          <form onSubmit={!busy ? handleSubmit : null}>
            <div className="row">
              <UserInputFields
                userInfo={userInfo}
                handleChange={handleChange}
              />

              {/* Dropdown Selection for Role */}
              {(path === "/auth/sub-admin" || isSubAdmin) && (
                <div className="col-12">
                  <div className="form_field">
                    <label>Sub-Admin Role</label>
                    <DropdownSelect
                      defaultClass="default-value"
                      defaultValue={
                        userInfo?.roleName
                          ? userInfo?.roleName
                          : "Select Sub-Admin Type"
                      }
                      options={["Coordinator", "Audit Manager"]}
                      index={0} // Unique index for tracking
                      activeDropdownIndex={activeDropdownIndex}
                      setActiveDropdownIndex={setActiveDropdownIndex}
                      onChange={handleDropdownChange}
                    />
                  </div>
                </div>
              )}

              {showDoctorFormFields ? (
                <>
                  <div className="form_field">
                    <label for="doctorSpeciality">Doctor Speciality</label>
                    <DropdownSelect
                      id="doctorSpeciality"
                      // defaultClass="default-value"
                      defaultValue={
                        userInfo?.doctorSpeciality
                          ? userInfo?.doctorSpeciality
                          : "Select Doctor Speciality"
                      }
                      options={[
                        "Pediatrician",
                        "Cardiologist",
                        "Dermatologist",
                        "Neurologist",
                        "Orthopedic Surgeon",
                        "ENT Specialist (Otolaryngologist)",
                        "Psychiatrist",
                        "Oncologist",
                        "Gastroenterologist",
                        "Endocrinologist",
                        "Pulmonologist",
                        "Hematologist",
                        "Rheumatologist",
                        "Radiologist",
                        "Anesthesiologist",
                        "Surgeon (General)",
                        "Plastic Surgeon",
                        "Ophthalmologist",
                        "Allergist / Immunologist",
                        "Infectious Disease Specialist",
                      ]}
                      index={1} // Unique index for tracking
                      activeDropdownIndex={activeDropdownIndex}
                      setActiveDropdownIndex={setActiveDropdownIndex}
                      onChange={handleDropdownChange}
                    />
                  </div>

                  <DoctorUploadSection handleFileUpload={handleFileUpload} />

                  <div className="col-12">
                    <button type="button" className="availability-btn">
                      Manage Availability <FaCalendarAlt />
                    </button>
                  </div>

                  <DoctorFooterActions
                    onClose={onClose}
                    busy={busy}
                    buttonLabel={`${user ? "Edit" : "Add"} ${header}`}
                  />
                </>
              ) : (
                <>
                  {/* Form Buttons */}
                  <div className="col-12">
                    <div className="box-buttons mt-3">
                      <button
                        type="button"
                        className="btn cancel-btn"
                        // data-bs-dismiss="modal"
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
                          `${user ? "Edit" : "Add"} ${header}`
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
    </div>
  );
};

export default UserForm;
