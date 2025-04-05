import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";

import Container from "../../Container";
import FormField from "../../Form/FormField";
import CustomLink from "../../CustomLink";
import { useAuth, useNotification } from "../../../hooks";
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

  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);

    if (error) {
      navigate("/auth/reset-password", { replace: true });

      updateNotification("error", error);
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

    if (!password.new.trim() || !password.confirm.trim())
      return updateNotification("error", "Password is missing!");

    if (password.new.trim().length < 8)
      return updateNotification("error", "Password must be 8 characters long!");

    if (password.new !== password.confirm)
      return updateNotification("error", "Password do not match!");

    const { error, message } = await resetPassword({
      newPassword: password.new,
      userId: id,
      token,
    });

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
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

        <CustomLink className="back-login" to="/auth/sign-in">
          <i class="fa-solid fa-arrow-left"></i>
          Back to login
        </CustomLink>
      </form>
    </Container>
  );
};

export default ResetPassword;
