import React from "react";

const Bits = ({ heading, count, iconClass }) => {
  return (
    <div class="col-md-3 col-sm-12">
      <div class="patient-detail booking">
        <h6>{heading}</h6>
        <div class="calender-icon">
          <h4>{count}</h4>
          <div class="appointment-icons">
            <img src="/images/icons8-calendar-50.png" alt="" />
            <i class={iconClass}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bits;
