import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../Style/SignInSignUp.css";

import LoginForm from "../../Form/LoginForm";
import RegisterForm from "../../Form/RegisterForm";
import TogglePanel from "../../TogglePanel";

import SanoSeaBanner from "../../SanoSeaBanner";

const SignInSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let resetLoginForm;
  let resetRegisterForm;

  useEffect(() => {
    const wrapper = document.querySelector(".wrapper");
    const loginForm = document.querySelector(".login");
    const registerForm = document.querySelector(".register");

    if (location.pathname === "/auth/sign-up") {
      wrapper.classList.add("active");

      // Reset register form
      if (resetRegisterForm) resetRegisterForm();
    } else if (location.pathname === "/auth/sign-in") {
      wrapper.classList.remove("active");

      // Reset login form
      if (resetLoginForm) resetLoginForm();
    }

    const registerBtn1 = document.querySelector(".signup_btn1");
    const registerBtn2 = document.querySelector(".signup_btn2");
    const loginBtn1 = document.querySelector(".login_btn1");
    const loginBtn2 = document.querySelector(".login_btn2");

    const handleSignupClick = () => {
      if (window.innerWidth <= 981)
        registerForm.scrollIntoView({ behavior: "smooth" });

      navigate("/auth/sign-up");
    };

    const handleSigninClick = () => {
      if (window.innerWidth <= 981)
        loginForm.scrollIntoView({ behavior: "smooth" });

      navigate("/auth/sign-in");
    };

    if (registerBtn1) registerBtn1.addEventListener("click", handleSignupClick);
    if (registerBtn2) registerBtn2.addEventListener("click", handleSignupClick);
    if (loginBtn1) loginBtn1.addEventListener("click", handleSigninClick);
    if (loginBtn2) loginBtn2.addEventListener("click", handleSigninClick);

    return () => {
      if (registerBtn1)
        registerBtn1.removeEventListener("click", handleSignupClick);
      if (registerBtn2)
        registerBtn2.removeEventListener("click", handleSignupClick);
      if (loginBtn1) loginBtn1.removeEventListener("click", handleSigninClick);
      if (loginBtn2) loginBtn2.removeEventListener("click", handleSigninClick);
    };
  }, [location.pathname, navigate]);

  return (
    <div className="wrapper overflow-hidden">
      <LoginForm
        className="form-box login"
        setResetForm={fn => (resetLoginForm = fn)}
      />

      <RegisterForm
        className="form-box register"
        setResetForm={fn => (resetRegisterForm = fn)}
      />

      <div class="toggle-box">
        <TogglePanel className="toggle-left">
          <SanoSeaBanner className="signup_btn1" linkLabel="Register Account" />
        </TogglePanel>

        <TogglePanel className="toggle-right">
          <SanoSeaBanner className="login_btn1" linkLabel="Login Account" />
        </TogglePanel>
      </div>
    </div>
  );
};

export default SignInSignUp;
