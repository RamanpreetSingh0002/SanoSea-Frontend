import React from "react";

const BookingDetailItem = ({
  imgSrc,
  iconClass,
  cabDetailHeader,
  cabDetailValue,
}) => {
  return (
    <div className="cab-detail-driver">
      <h6>{cabDetailHeader}</h6>
      <div className="cab-detail-port">
        <div>
          {imgSrc && <img src={imgSrc} />}
          {iconClass && <i className={iconClass}></i>}
        </div>

        <p>{cabDetailValue}</p>
      </div>
    </div>
  );
};

export default BookingDetailItem;
