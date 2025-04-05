import React from "react";

const Bits = ({ heading, count, iconClass, image, col }) => {
  return (
    <div class={`col-md-${col} col-sm-12`}>
      <div class="appointment-detail booking">
        <h6>{heading}</h6>
        <div class="calender-icon">
          <h4>{count}</h4>
          <div class="appointment-icons">
            <img src={image || "/images/icons8-calendar-50.png"} alt="" />
            {iconClass && <i class={iconClass}></i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bits;
