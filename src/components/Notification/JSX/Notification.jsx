import React from "react";
import "../Style/Notification.css";

const Notification = ({ toasts, removeToast }) => {
  console.log("Toasts: ", toasts);

  // Get icon class based on type
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "check-circle-fill";
      case "error":
        return "x-circle-fill";
      case "warning":
        return "exclamation-triangle-fill";
      default:
        return "check-circle-fill";
    }
  };

  return (
    <div className="my-toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`my-toast-banner ${toast.type} ${
            toast.visible ? "active" : ""
          }`}
        >
          <div className="my-toast-content">
            <i className={`bi icon bi-${getIcon(toast.type)}`}></i>
            <div className="my-message">
              <span className="text text-1">{toast.type.toUpperCase()}</span>
              <span className="text text-2">{toast.message}</span>
            </div>
          </div>
          <i
            className="bi bi-x-lg close"
            onClick={() => removeToast(toast.id)}
          ></i>
          <div className={`my-progress ${toast.visible ? "active" : ""}`}></div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
