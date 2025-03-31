import React from "react";
import CustomLink from "../CustomLink";

const AuthOptions = ({ rememberMe, onRememberMeChange }) => {
  return (
    <div className="remember_forgot_wrapper">
      <input
        type="checkbox"
        name="remember"
        id="remember"
        checked={rememberMe}
        onChange={onRememberMeChange}
      />
      <label for="remember">Remember Me</label>

      <CustomLink to="/auth/forgot-password" className="forgot_link">
        Forgot Password?
      </CustomLink>
    </div>
  );
};

export default AuthOptions;
