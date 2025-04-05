import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";

import {
  resendEmailVerificationToken,
  verifyUserEmail,
} from "../../../api/auth";
import Container from "../../Container";
import CustomLink from "../../CustomLink";
import { useAuth, useNotification } from "../../../hooks";

import "../Style/EmailVerification.css";

const OTP_LENGTH = 6;

const isValidOTP = otp => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));

    if (!valid) break;
  }

  return valid;
};

const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill("")); // State to store OTP inputs
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes timer
  // const [canResend, setCanResend] = useState(false); // State to manage resend availability
  const [busy, setBusy] = useState(false);
  const timerRef = useRef(null); // To store the interval ID

  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;

  const { state } = useLocation();
  const user = state?.user;
  const email = user.email;

  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  useEffect(() => {
    // Start the timer on component mount
    startTimer();
    return () => clearInterval(timerRef.current); // Clear the timer on unmount
  }, []);

  const startTimer = () => {
    const endTime = Date.now() + 120 * 1000; // 120 seconds in milliseconds

    setTimeLeft(120); // Initialize the timer to 120 seconds
    clearInterval(timerRef.current); // Clear any existing intervals

    timerRef.current = setInterval(() => {
      const remainingTime = Math.round((endTime - Date.now()) / 1000); // Calculate remaining time in seconds

      if (remainingTime <= 0) {
        clearInterval(timerRef.current);
        setTimeLeft(0); // Set to 0 when the timer ends
      } else {
        setTimeLeft(remainingTime); // Update the remaining time
      }
    }, 1000); // Update every second
  };

  const resendOTP = async () => {
    const { error, message } = await resendEmailVerificationToken(user.id);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    setOtp(new Array(6).fill("")); // Clear the OTP inputs
    startTimer(); // Restart the timer
  };

  const handleChange = (value, index) => {
    // Update the OTP array and move focus to the next input
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only allow one character per box
    setOtp(newOtp);

    // Automatically focus the next input field
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus(); // Focus previous input
    }
  };

  const handleSubmit = async e => {
    setBusy(true);
    e.preventDefault();

    if (!isValidOTP(otp)) {
      setBusy(false);
      // Display an error if OTP is invalid
      return updateNotification(
        "error",
        "Invalid OTP! Please enter a valid 6-digit OTP."
      );
    }

    // Submit OTP for verification
    const { error, message } = await verifyUserEmail({
      userId: user.id,
      OTP: otp.join(""),
    });

    if (error) {
      setBusy(false);
      return updateNotification("error", error); // Handle error response
    }
    setBusy(false);
    // If OTP is verified successfully
    updateNotification("success", message);
    isAuth(); // Refresh authentication state
    navigate("/auth/sign-in");
  };

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/auth/sign-in");
  }, [user, isLoggedIn, isVerified]);

  return (
    <Container>
      <h1>OTP Verification</h1>

      <p>
        Enter the OTP you received to{" "}
        <span style={{ color: "#064658", fontWeight: "500" }}>{email}</span>
      </p>

      <div className="otp-input">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="number"
            min="0"
            max="9"
            value={value}
            onChange={e => handleChange(e.target.value, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            required
          />
        ))}
      </div>

      <button onClick={handleSubmit}>
        {busy ? <ImSpinner3 className="animate-spin" /> : "Verify"}
      </button>

      <div className="resend-text">
        Didn't receive the code?
        <span
          className={`resend-link`}
          // className={`resend-link ${!canResend ? "disabled" : ""}`}
          onClick={resendOTP}
        >
          Resend Code
        </span>
        <br />
        <span id="timer">
          {timeLeft > 0
            ? `(${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                .toString()
                .padStart(2, "0")})`
            : "Code expired"}
        </span>
        <CustomLink className="back-login" to="/auth/sign-in">
          <i class="fa-solid fa-arrow-left"></i>
          Back to login
        </CustomLink>
      </div>
    </Container>
  );
};

export default EmailVerification;
