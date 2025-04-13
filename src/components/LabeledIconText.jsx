import React from "react";

const LabeledIconText = ({ iconClass, label, value }) => {
  return (
    <div className="labeled-icon-section">
      <div className="labeled-icon-text">
        <i class={iconClass}></i>
        <strong>{label}</strong>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default LabeledIconText;
