import React from "react";
import { ImSpinner3 } from "react-icons/im";

const AuthActionSection = ({
  mainActionLabel,
  busy,
  secondaryText,
  className,
  secondaryLabel,
  onClick,
}) => {
  return (
    <>
      <div className="col-12">
        <button type="submit" onClick={onClick} className="main_action_wrapper">
          {busy ? <ImSpinner3 className="animate-spin" /> : mainActionLabel}
        </button>
      </div>

      <div className="col-12">
        <div className="secondary_action_wrapper">
          <p className="m-0">{secondaryText}</p>
          <span className={className}>{secondaryLabel}</span>
        </div>
      </div>
    </>
  );
};

export default AuthActionSection;
