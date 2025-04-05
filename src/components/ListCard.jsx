import React from "react";

const ListCard = ({ title, data, onOpen }) => {
  return (
    <div className="list-card">
      <div className="list-card-header">
        <h6 className="card-title">{title}</h6>
        <button className="view-all" onClick={onOpen}>
          View All
        </button>
      </div>

      <div className="list-content">
        {data?.map((item, index) => (
          <>
            <hr />
            <div key={index} className="list-item">
              <div className="list-profile-img">
                <img src={item.image} alt="profile" />
              </div>
              <div className="list-detail">
                <h5>{item.name}</h5>
                <a href={item.link} className="view-link">
                  View Detail
                </a>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ListCard;
