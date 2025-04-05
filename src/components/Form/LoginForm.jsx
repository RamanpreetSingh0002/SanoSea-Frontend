import React, { useEffect, useState } from "react";

import FormField from "./FormField";
import AuthOptions from "./AuthOptions";
import AuthActionSection from "./AuthActionSection";
import { isValidEmail } from "../../utils/helper";
import { useAuth, useNotification } from "../../hooks";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const LoginForm = ({ className, setResetForm }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { updateNotification } = useNotification();

  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleRememberMeChange = e => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    handleLogin(userInfo.email, userInfo.password, rememberMe);
  };

  useEffect(() => {
    setResetForm(() => {
      setUserInfo({ email: "", password: "" });
      setRememberMe(false);
      setPasswordVisible(false);
    });
  }, [setResetForm]);

  return (
    <div className={"form_portion " + className}>
      <div className="logo_wrapper">
        <img src="/images/SanoSea.png" alt="Ship" />
      </div>

      <h2>Welcome Back</h2>
      <p>For Better Experience, Order Tracking & Regular Updates</p>

      <form onSubmit={handleSubmit} className="row">
        {/* Email ID */}
        <div className="col-12">
          <FormField
            value={userInfo.email}
            onChange={handleChange}
            id="login-email"
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
            value={userInfo.password}
            onChange={handleChange}
            id="login-password"
            name="password"
            label="Password"
            placeholder="Enter password"
            iconClass={passwordVisible ? "fa-eye-slash" : "fa-eye"}
            type={passwordVisible ? "text" : "password"}
            toggleVisibility={() => setPasswordVisible(!passwordVisible)}
          />
        </div>

        {/* Remember and Forgot */}
        <div className="col-12">
          <AuthOptions
            type="signin"
            rememberMe={rememberMe}
            onRememberMeChange={handleRememberMeChange}
          />
        </div>

        {/* Bottom Section (Login Button or New User? Register) */}
        <AuthActionSection
          mainActionLabel="Login"
          busy={isPending}
          secondaryText="New User?"
          className="signup_btn2"
          secondaryLabel="Register"
        />
      </form>
    </div>
  );
};

export default LoginForm;
