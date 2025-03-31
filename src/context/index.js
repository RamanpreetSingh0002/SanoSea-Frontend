import React from "react";
import AuthProvider from "./AuthProvider";

const ContextProviders = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextProviders;
