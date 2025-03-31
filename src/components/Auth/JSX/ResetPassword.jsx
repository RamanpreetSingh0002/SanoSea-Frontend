import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Container from "../../Container";
import { useAuth } from "../../../hooks";
import FormField from "../../Form/FormField";
import { ImSpinner3 } from "react-icons/im";
import { resetPassword, verifyPasswordResetToken } from "../../../api/auth";

import "../Style/ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState({ new: "", confirm: "" });
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [searchParams] = useSearchParams();
  const { handleLogout } = useAuth();

  const token = searchParams.get("token");
  const id = searchParams.get("id");

  // const { updateNotification } = useNotification();

  const navigate = useNavigate();

  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);

    if (error) {
      navigate("/auth/reset-password", { replace: true });
      console.log(error);

      // updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }
    setIsValid(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!password.new.trim()) return console.log("Password is missing!");

    // return updateNotification("error", "Password is missing!");

    if (password.new.trim().length < 8)
      return console.log("Password must be 8 characters long!");
    // return updateNotification("error", "Password must be 8 characters long!");

    if (password.new !== password.confirm)
      return console.log("Password do not match!");
    // return updateNotification("error", "Password do not match!");

    const { error, message } = await resetPassword({
      newPassword: password.new,
      userId: id,
      token,
    });

    if (error) return console.log(error);

    // return updateNotification("error", error);

    console.log(message);

    // updateNotification("success", message);
    handleLogout();
    navigate("/auth/sign-in", { replace: true });
  };

  if (isVerifying)
    return (
      <Container>
        <h1>Please wait we are verifying your token!</h1>
        <ImSpinner3 className="animate-spin" />
      </Container>
    );

  if (!isValid)
    return (
      <Container>
        <h1>Sorry, the token is invalid!</h1>
      </Container>
    );

  return (
    <Container>
      <h1>Reset Password</h1>

      <form onSubmit={handleSubmit} className="reset-form">
        <FormField
          value={password.new}
          onChange={handleChange}
          id="newPassword"
          name="new"
          label="New Password"
          placeholder="********"
          iconClass={newPasswordVisible ? "fa-eye-slash" : "fa-eye"}
          type={newPasswordVisible ? "text" : "password"}
          toggleVisibility={() => setNewPasswordVisible(!newPasswordVisible)}
          required
        />

        <FormField
          value={password.confirm}
          onChange={handleChange}
          id="confirmPassword"
          name="confirm"
          label="Confirm Password"
          placeholder="********"
          iconClass={confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}
          type={confirmPasswordVisible ? "text" : "password"}
          toggleVisibility={() =>
            setConfirmPasswordVisible(!confirmPasswordVisible)
          }
          required
        />

        <button type="submit">Confirm</button>
      </form>
    </Container>
  );
};

export default ResetPassword;
