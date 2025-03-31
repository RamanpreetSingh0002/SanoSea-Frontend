import React from "react";

const SanoSeaBanner = ({ className, linkLabel }) => {
  return (
    <div className="banner_portion">
      <img src="/images/SanoSea Logo.png" alt="SanoSea" />

      <h2>Advanced Maritime Healthcare Services</h2>

      <p>
        Delivering premier maritime healthcare with advanced services and expert
        care, ensuring your well-being on every journey.
      </p>

      <button className={"banner_btn " + className}>
        <i className="fa-regular fa-circle-check"></i>
        <span>{linkLabel}</span>
      </button>
    </div>
  );
};

export default SanoSeaBanner;
