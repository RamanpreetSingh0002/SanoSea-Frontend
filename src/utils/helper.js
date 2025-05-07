import { useState, useEffect } from "react";

export const isValidEmail = email => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return isValid.test(email);
};

export const getToken = () =>
  localStorage.getItem("auth-token") || sessionStorage.getItem("auth-token");

export const catchError = error => {
  const { response } = error;
  if (response?.data) return response.data;

  return { error: error.message || error };
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
