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

export const formatTime = time => {
  if (!time) return "Invalid Time";

  const [hours, minutes] = time.split(":"); // Extract hours & minutes
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // ✅ Convert to 12-hour format
  });
};

export const formatDate = dateString => {
  if (!dateString) return "Invalid Date"; // Handle null/undefined cases

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};
