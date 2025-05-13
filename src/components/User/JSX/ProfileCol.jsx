import React from "react";
import { Link } from "react-router-dom";

const ProfileCol = ({ img, name, id }) => {
  return (
    <div className="list-item" style={{ padding: "0px" }}>
      <div className="list-profile-img">
        <img src={img || "/images/user.png"} alt="profile" />
      </div>

      <div className="list-detail">
        <h5>{name}</h5>
        <Link
          to={"/auth/user-profile/" + id}
          className="view-link"
          onClick={() => {
            localStorage.setItem("stateQuery", "");
            localStorage.setItem("activeState", "");
          }}
        >
          View Detail
        </Link>
      </div>
    </div>
  );
};

export default ProfileCol;
