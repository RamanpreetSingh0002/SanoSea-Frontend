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
    const roleLandingPages = {
      Admin: "/auth/management-dashboard",
      Coordinator: "/auth/management-dashboard",
      AuditManager: "/auth/management-dashboard",
      GeneralPhysician: "/auth/general-physician-dashboard",
      Doctor: "/auth/doctor-dashboard",
      PortAgent: "/auth/port-agent-dashboard",
      Patient: "/auth/patient-dashboard",
    };

    // Normalize role format by removing spaces
    const normalizedRole = authInfo.profile?.role.replace(/\s+/g, "");

    const landingPage =
      roleLandingPages[normalizedRole] || "/auth/default-dashboard";

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

    localStorage.setItem("currentPage", 0); // Reset to first page when navigating from sideNav
    localStorage.removeItem("activeState");
    localStorage.setItem("stateQuery", "");
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("activeNav");
    // localStorage.removeItem("searchQuery");

    navigate("/");
    setAuthInfo({ ...defaultAuthInfo });
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authInfo, setAuthInfo, handleLogin, handleLogout, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
