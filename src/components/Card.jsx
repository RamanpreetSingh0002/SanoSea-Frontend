import React from "react";

const Card = ({ className, children }) => {
  return (
    <div class="col-md-4 col-sm-12">
      <div class={"patient-detail " + className}>{children}</div>
    </div>
  );
};

export default Card;
