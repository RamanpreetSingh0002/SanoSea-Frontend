import React from "react";

const AdminBookingCard = ({ data }) => {
  const {
    name,
    role,
    email,
    phone,
    additionalInfo,
    downloadLink,
    downloadLabel,
    avatar,
  } = data;
  return (
    <div className="booking-card">
      <div className="card-header">
        <img src={avatar} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="role">{role}</p>
        </div>
      </div>
      <div className="card-content">
        <p>
          <strong>Email-ID:</strong> {email}
        </p>
        <p>
          <strong>Phone Number:</strong> {phone}
        </p>
        {additionalInfo &&
          additionalInfo.map((info, idx) => (
            <p key={idx}>
              <strong>{info.label}:</strong> {info.value}
            </p>
          ))}
      </div>
      {downloadLink && (
        <a href={downloadLink} className="download-btn" download>
          {downloadLabel}
        </a>
      )}
    </div>
  );
};

export default AdminBookingCard;
