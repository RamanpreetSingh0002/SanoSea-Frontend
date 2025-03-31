import React, { useState } from "react";

import Container from "../../Container";

import "../Style/ForgotPassword.css";
import { isValidEmail } from "../../../utils/helper";
import { forgetPassword } from "../../../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isValidEmail(email)) return console.log("Invalid email!");

    // return updateNotification("error", "Invalid email!");

    const { error, message } = await forgetPassword(email);
    if (error) return console.log("Error: ", error);

    // return updateNotification("error", error);

    alert(message || "Link sent successfully!");
    console.log("Success: ", message);

    // updateNotification("success", message);
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
          Send
        </button>
      </form>
    </Container>
  );
};

export default ForgotPassword;
