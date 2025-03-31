import React from "react";

const TogglePanel = ({ className, children }) => {
  return <div className={"toggle-panel " + className}>{children}</div>;
};

export default TogglePanel;
