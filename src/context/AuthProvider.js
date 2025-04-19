import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getIsAuth, signInUser } from "../api/auth";
import { useNotification } from "../hooks";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const handleLogin = async (email, password, rememberMe) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await signInUser({ email, password });

    if (error) {
      updateNotification("error", error);
      console.log(error);

      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    // Decide where to store the token based on "Remember Me"
    if (rememberMe) {
      localStorage.setItem("auth-token", user.token);
    } else {
      sessionStorage.setItem("auth-token", user.token);
    }

    // Determine the landing page based on the user's role
    let landingPage = "/";
    switch (user.role) {
      case "Patient":
        landingPage = "/auth/patient-dashboard";
        break;
      case "General Physician":
        landingPage = "/auth/general-physician-dashboard";
        break;
      case "Admin":
        landingPage = "/auth/admin-dashboard";
        // landingPage = "/auth/coordinator-dashboard";
        break;
      case "Audit Manager":
        landingPage = "/auth/sub-admin-dashboard";
        break;
      case "Doctor":
        landingPage = "/auth/doctor-dashboard";
        break;
      case "Port Agent":
        landingPage = "/auth/port-agent-dashboard";
        break;
      case "Coordinator":
        landingPage = "/auth/sub-admin-dashboard";
        break;
      default:
        landingPage = "/auth/default-dashboard";
    }

    // Navigate to the determined landing page
    navigate(landingPage, { replace: true });

    // Update authInfo state
    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
  };

  const isAuth = async () => {
    // Check for the token in localStorage first, then in sessionStorage
    const token =
      localStorage.getItem("auth-token") ||
      sessionStorage.getItem("auth-token");

    // If no token is found, exit the function
    if (!token) return;

    // Indicate the authentication process is in progress
    setAuthInfo({ ...authInfo, isPending: true });

    try {
      const { error, user } = await getIsAuth(token);

      if (error) {
        updateNotification("error", error);
        return setAuthInfo({ ...authInfo, isPending: false, error });
      }

      // Set the user information and mark as logged in
      setAuthInfo({
        profile: { ...user },
        isLoggedIn: true,
        isPending: false,
        error: "",
      });
    } catch (err) {
      console.error("Authentication failed:", err);
      setAuthInfo({
        ...authInfo,
        isPending: false,
        error: "Authentication failed",
      });
    }
  };

  const handleLogout = () => {
    // Remove token from both localStorage and sessionStorage
    localStorage.removeItem("auth-token");
    sessionStorage.removeItem("auth-token");

    navigate("/");
    setAuthInfo({ ...defaultAuthInfo });
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogin, handleLogout, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
