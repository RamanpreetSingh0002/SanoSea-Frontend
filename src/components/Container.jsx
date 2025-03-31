import React from "react";

const Container = ({ className, children }) => {
  return (
    <div className="outer-container">
      <div className="inner-container">{children}</div>
    </div>
  );
};

export default Container;
