import React from "react";
import { ImSpinner3 } from "react-icons/im";
import { Link } from "react-router-dom";

const ListCard = ({ title, users, onOpen, busy }) => {
  return (
    <div className="list-card">
      <div className="list-card-header">
        <h6 className="card-title">{title}</h6>
        <button className="view-all" onClick={onOpen}>
          View All
        </button>
      </div>

      <div className="list-content">
        {busy ? (
          <div style={{ textAlign: "center" }}>
            <hr />
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
          <>
            <hr />
            <h6 style={{ textAlign: "center" }}>No {title} Found</h6>
          </>
        ) : (
          users?.map((user, index) => (
            <>
              <hr />
              <div key={index} className="list-item">
                <div className="list-profile-img">
                  <img src={user?.image} alt="profile" />
                </div>

                <div className="list-detail">
                  <h5>{user?.name}</h5>
                  <Link
                    to={"/auth/user-profile/" + user?.id}
                    state={{ throughDashboard: true }}
                    className="view-link"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default ListCard;
