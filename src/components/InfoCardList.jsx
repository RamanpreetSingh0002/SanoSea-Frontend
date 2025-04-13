import React from "react";
import "./AuditManager/Style/InfoCardList.css";

const InfoCardList = ({ title, data, onClose }) => {
  return (
    <div>
      <div className="view-list-header">
        <h6>{title}</h6>
        <div className="list-close-button" onClick={onClose}>
          <div className="list-close"></div>
        </div>
      </div>

      <hr />

      <div>
        {data?.map((item, index) => (
          <div key={index} className="view-item">
            <div className="list-profile-img">
              <img src={item.image} alt="profile" />
            </div>

            <div className="view-list">
              <div className="list-detail">
                <h5>{item.name}</h5>
                <p className="view-link">Audit Manager</p>
              </div>

              <div className="view-all">
                <a href="#">View Detail</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCardList;
