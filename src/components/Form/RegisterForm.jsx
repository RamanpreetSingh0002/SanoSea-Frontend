import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth, useNotification } from "../../hooks";
import { signUpUser } from "../../api/auth";
import { isValidEmail } from "../../utils/helper";
import FormField from "./FormField";
import AuthActionSection from "./AuthActionSection";

const defaultUserInfo = {
  profilePhoto: null,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
  officeAddress: "",
};

const validateUserInfo = ({
  profilePhoto,
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
}) => {
  const isValidName = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

  if (profilePhoto && !profilePhoto.type?.startsWith("image"))
    return { error: "Invalid image/Profile photo file!" };

  if (!firstName.trim()) return { ok: false, error: "First name is missing!" };
  if (!isValidName.test(firstName) || !isValidName.test(lastName))
    return { ok: false, error: "Invalid name!" };

  if (!phoneNumber.trim())
    return { ok: false, error: "Phone number is missing!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const RegisterForm = ({ initialState, className, setResetForm }) => {
  const [userInfo, setUserInfo] = useState({ ...defaultUserInfo });
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showAddressField, setShowAddressField] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 981);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef();

  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const { updateNotification } = useNotification();

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 981);
  };

  const updateProfilePhoto = file => {
    const url = URL.createObjectURL(file);
    setSelectedProfilePhoto(url);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = ({ target }) => {
    const file = target.files[0];
    if (file) {
      updateProfilePhoto(file);
      return setUserInfo({ ...userInfo, profilePhoto: file });
    }
  };

  const handleSubmit = async e => {
    setBusy(true);

    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) {
      setBusy(false);
      return updateNotification("error", error);
    }

    const formData = new FormData();
    Object.keys(userInfo).forEach(key => {
      if (userInfo[key]) {
        formData.append(key, userInfo[key]);
      }
    });

    const response = await signUpUser(formData);

    setBusy(false);

    if (response.error) return updateNotification("error", response.error);

    setUserInfo({ ...defaultUserInfo });
    setSelectedProfilePhoto("");

    // navigate("/auth/sign-in");
    // Add this line to activate the login form
    // document.querySelector(".wrapper").classList.remove("active");

    // navigate("/");

    navigate("/auth/verify-email", {
      state: { user: response.user },
      replace: true,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize); // Track screen resizing
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Handle navigation for logged-in users based on roles
    if (isLoggedIn) {
      let landingPage = "/";
      switch (authInfo.profile?.role) {
        case "Patient":
          landingPage = "/auth/patient-dashboard";
          break;
        case "General Physician":
          landingPage = "/auth/general-physician-dashboard";
          break;
        case "Admin":
          landingPage = "/auth/coordinator-dashboard";
          break;
        case "Audit Manager":
          landingPage = "/auth/audit-manager-dashboard";
          break;
        case "Doctor":
          landingPage = "/auth/doctor-dashboard";
          break;
        case "Port Agent":
          landingPage = "/auth/port-agent-dashboard";
          break;
        case "Coordinator":
          landingPage = "/auth/coordinator-dashboard";
          break;
        default:
          landingPage = "/auth/default-dashboard";
      }

      navigate(landingPage);
    }
  }, [isLoggedIn, authInfo.profile?.role, navigate]);

  useEffect(() => {
    // Set initial state and reset form logic
    if (initialState) {
      setUserInfo({ ...initialState, profilePhoto: null });
      setSelectedProfilePhoto(initialState.profilePhoto);
    }

    setResetForm(() => {
      setUserInfo({ ...defaultUserInfo });
      setSelectedProfilePhoto("");
      setPasswordVisible(false);
      setShowAddressField(false);
    });
  }, [initialState, setResetForm]);

  const { firstName, lastName, phoneNumber, email, password, officeAddress } =
    userInfo;

  return (
    <div
      className={"form_portion " + className}
      style={
        showAddressField && isSmallScreen ? { padding: "44px 60px" } : undefined
      }
    >
      <h2 style={{ marginBottom: "15px" }}>Create Account</h2>

      <form onSubmit={!busy ? handleSubmit : null} className="row">
        {/* Profile Photo */}
        <div className="col-12">
          <div className="profile_wrapper">
            <div
              className="profile_upload"
              onClick={() => fileInputRef.current.click()} // Trigger file input click
            >
              <div className="profile_img">
                {selectedProfilePhoto ? (
                  <img
                    src={selectedProfilePhoto}
                    style={{ height: "100%", width: "100%" }}
                    alt=""
                  />
                ) : (
                  <i className="fa-regular fa-user"></i>
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

              <label htmlFor="profilePhoto" className="upload_icon">
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
              </label>
            </div>

            <label className="upload_profile">Upload Profile</label>
          </div>
        </div>

        {/* Name */}
        <div className="col-6">
          <FormField
            value={firstName}
            onChange={handleChange}
            name="firstName"
            label="First Name"
            placeholder="First name"
            type="text"
          />
        </div>
        <div className="col-6">
          <FormField
            value={lastName}
            onChange={handleChange}
            name="lastName"
            label="Last Name"
            placeholder="Last name"
            type="text"
          />
        </div>
        {/* Number */}
        <div className="col-12">
          <FormField
            value={phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone number"
            type="tel"
          />
        </div>

        {/* Email ID */}
        <div className="col-12">
          <FormField
            value={email}
            onChange={handleChange}
            id="register-email"
            name="email"
            label="Email ID"
            placeholder="Enter Email ID"
            iconClass="fa-envelope"
            type="email"
          />
        </div>

        {/* Password */}
        <div className="col-12">
          <FormField
            value={password}
            onChange={handleChange}
            id="register-password"
            name="password"
            label="Password"
            placeholder="Enter password"
            iconClass={passwordVisible ? "fa-eye-slash" : "fa-eye"}
            type={passwordVisible ? "text" : "password"}
            toggleVisibility={() => setPasswordVisible(!passwordVisible)}
          />
        </div>

        {/* Add Address */}
        <div className="col-12">
          {showAddressField ? (
            <div className="form_field">
              <label htmlFor="officeAddress">Office Address</label>
              <textarea
                id="officeAddress"
                name="officeAddress"
                value={officeAddress}
                onChange={handleChange}
                placeholder="Enter your office address"
                rows="4"
              ></textarea>
            </div>
          ) : (
            <div className="add_address_wrapper form_btns">
              <button type="button" onClick={() => setShowAddressField(true)}>
                <span>Add office address</span>
                <i className="fa-solid fa-location-dot"></i>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Section (Sign Up Button or Already Have An Account? Login) */}
        <AuthActionSection
          mainActionLabel="Sign up"
          busy={busy}
          secondaryText="Already Have An Account?"
          className="login_btn2"
          secondaryLabel="Login"
        />
      </form>
    </div>
  );
};

export default RegisterForm;
