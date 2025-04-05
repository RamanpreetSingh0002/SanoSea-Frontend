import React, { createContext, useState } from "react";
import Notification from "../components/Notification/JSX/Notification";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const timeout = 5000; // Time to auto-remove the toast (in ms)

  // Add a new toast to the list
  const updateNotification = (type, message) => {
    const id = Date.now(); // Unique id for each toast
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message, type, visible: true },
    ]);

    // Auto-remove toast after timeout
    setTimeout(() => removeToast(id), timeout);
  };

  // Remove toast by ID
  const removeToast = (id) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );

    // Delay removal from DOM
    setTimeout(
      () =>
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        ),
      400
    );
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {/* Use the Notification component here */}
      <Notification toasts={toasts} removeToast={removeToast} />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
