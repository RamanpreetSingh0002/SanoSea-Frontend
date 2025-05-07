import React from "react";
import { ImSpinner3 } from "react-icons/im";

const DoctorFooterActions = ({ onClose, busy, buttonLabel }) => {
  return (
    <>
      <div className="col-12">
        <button
          type="submit"
          className="btn create-btn"
          style={{ width: "100%", borderRadius: "8px", padding: "12px" }}
        >
          {busy ? <ImSpinner3 className="animate-spin" /> : buttonLabel}
        </button>
      </div>

      <div className="col-12">
        <button
          type="button"
          style={{ width: "100%", borderRadius: "8px", padding: "12px" }}
          className="btn cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default DoctorFooterActions;
