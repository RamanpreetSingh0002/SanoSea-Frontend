import React from "react";
import "./AuditManager/Style/InfoCardList.css";
import { Link } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";

const InfoCardList = ({ title, users, onClose, busy }) => {
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
        {busy ? (
          <div style={{ textAlign: "center" }}>
            <ImSpinner3 className="animate-spin" />
            <br />
            <div className="loading-text">
              Loading
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          </div>
        ) : users?.length === 0 ? (
          <h6 style={{ textAlign: "center" }}>No {title} Found</h6>
        ) : (
          users?.map((user, index) => (
            <div key={index} className="view-item">
              <div className="list-profile-img">
                <img src={user?.image} alt="profile" />
              </div>

              <div className="view-list">
                <div className="list-detail">
                  <h5>{user?.name}</h5>
                  <p className="view-link">Audit Manager</p>
                </div>

                <div>
                  <Link
                    to={"/auth/user-profile/" + user?.id}
                    state={{ throughModal: true }}
                    className="view-all"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InfoCardList;
