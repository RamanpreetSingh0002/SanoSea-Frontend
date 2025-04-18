import React from "react";
import { Link } from "react-router-dom";

const DoctorPatientTBody = ({
  name,
  problem,
  time,
  date,
  email,
  statusClass,
  statusLabel,
}) => {
  return (
    <tr>
      <td>
        <div className="doctor-profile">
          <img src="/images/person.jpg" alt="person" />
          <h5>{name}</h5>
        </div>
      </td>
      <td>
        <p className="doctor-patient-detail">{problem}</p>
      </td>
      <td>
        <div class="date-time-text">
          <p>{time}</p>
        </div>
      </td>
      <td>
        <div class="date-time-text">
          <p>{date}</p>
        </div>
      </td>
      <td>
        <p className="doctor-patient-detail">{email}</p>
      </td>
      {/* <td>
        <p className="doctor-patient-detail">{phoneNumber}</p>
      </td> */}
      <td>
        <div class="assigned-status-download-report">
          <a href="">
            <img src="/images/icons-download.png" alt="download" />
            <span>Download Report</span>
          </a>
        </div>
      </td>
      <td>
        <div class={"assigned-status " + statusClass}>
          <a href="">{statusLabel}</a>
        </div>
      </td>

      <td>
        <div className="assigned-status-view-detail">
          <Link to="">View Detail</Link>
        </div>
      </td>
    </tr>
  );
};

export default DoctorPatientTBody;
