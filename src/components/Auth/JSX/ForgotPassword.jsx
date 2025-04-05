import React, { useState } from "react";

import Container from "../../Container";
import CustomLink from "../../CustomLink";
import { isValidEmail } from "../../../utils/helper";
import { forgetPassword } from "../../../api/auth";
import { useNotification } from "../../../hooks";

import "../Style/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { updateNotification } = useNotification();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isValidEmail(email))
      return updateNotification("error", "Invalid email!");

    const { error, message } = await forgetPassword(email);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
  };

  return (
    <Container>
      <h1>Forgot Password</h1>

      <p>Type your email address below and we'll send you a reset link</p>

      <form className="forgot-form">
        <div>
          <input
            // id="email"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Reset Password
        </button>

        <CustomLink className="back-login" to="/auth/sign-in">
          <i class="fa-solid fa-arrow-left"></i>
          Back to login
        </CustomLink>
      </form>
    </Container>
  );
};

export default ForgotPassword;
