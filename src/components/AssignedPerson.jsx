import React from "react";

const AssignedPerson = ({ img, name, link }) => {
  return (
    <div class="assigned-flex-wrapper">
      <div class="assigned-person-img">
        <img src={img} alt="male" />
      </div>
      <div class="assigned-person-content">
        <h5>{name}</h5>
        <a href="">View Detail</a>
      </div>
    </div>
  );
};

export default AssignedPerson;
