import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useNotification } from "../../../hooks";
import Container from "../../Container";
import FormField from "../../Form/FormField";
import { changePassword } from "../../../api/auth";
import CustomLink from "../../CustomLink";

const ChangePassword = () => {
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [searchParams] = useSearchParams(); // To retrieve the email from the link
  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  // Retrieve the user's email from the link
  const email = searchParams.get("email");

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!password.current || !password.new || !password.confirm)
      return updateNotification("error", "All fields are required!");

    if (password.new.length < 8)
      return updateNotification(
        "error",
        "New Password must be at least 8 characters!"
      );

    if (password.new !== password.confirm)
      return updateNotification(
        "error",
        "New Password and Confirm Password do not match!"
      );

    // Send data to the backend
    const { error, message } = await changePassword({
      email,
      oldPassword: password.current,
      newPassword: password.new,
      confirmPassword: password.confirm,
    });

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    navigate("/auth/sign-in", { replace: true });
  };

  return (
    <Container>
      <h1>Change Password</h1>

      <form onSubmit={handleSubmit} className="change-password-form">
        <FormField
          value={password.current}
          onChange={handleChange}
          id="currentPassword"
          name="current"
          label="Current Password"
          placeholder="Enter your current password"
          type={currentPasswordVisible ? "text" : "password"}
          toggleVisibility={() =>
            setCurrentPasswordVisible(!currentPasswordVisible)
          }
          iconClass={currentPasswordVisible ? "fa-eye-slash" : "fa-eye"}
        />

        <FormField
          value={password.new}
          onChange={handleChange}
          id="newPassword"
          name="new"
          label="New Password"
          placeholder="Enter your new password"
          type={newPasswordVisible ? "text" : "password"}
          toggleVisibility={() => setNewPasswordVisible(!newPasswordVisible)}
          iconClass={newPasswordVisible ? "fa-eye-slash" : "fa-eye"}
        />

        <FormField
          value={password.confirm}
          onChange={handleChange}
          id="confirmPassword"
          name="confirm"
          label="Confirm New Password"
          placeholder="Confirm your new password"
          type={confirmPasswordVisible ? "text" : "password"}
          toggleVisibility={() =>
            setConfirmPasswordVisible(!confirmPasswordVisible)
          }
          iconClass={confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}
        />

        <button type="submit">Change Password</button>

        <CustomLink className="back-login" to="/auth/sign-in">
          <i class="fa-solid fa-arrow-left"></i>
          Back to login
        </CustomLink>
      </form>
    </Container>
  );
};

export default ChangePassword;
