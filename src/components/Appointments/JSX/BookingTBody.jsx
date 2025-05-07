import React from "react";
import { Link } from "react-router-dom";

const BookingTBody = ({ appointment }) => {
  return (
    <tr>
      <td>
        <div className="doctor-profile">
          <img
            src={
              appointment?.patientId?.profilePhoto?.url || "/images/user.png"
            }
            alt="person"
          />
          <h5>{appointment?.patientId?.fullName}</h5>
        </div>
      </td>
      <td>
        <p className="doctor-patient-detail">
          {appointment?.reason || "No reason provided"}
        </p>
      </td>
      {/* <td>
        <div class="date-time-text">
          <p>{time}</p>
        </div>
      </td> */}
      <td>
        <div class="date-time-text">
          <p>
            {new Date(appointment?.dateOfAppointment).toLocaleDateString(
              "en-US",
              {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              }
            )}
          </p>
        </div>
      </td>
      <td>
        <p className="doctor-patient-detail">{appointment?.patientId?.email}</p>
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
        <div class={"assigned-status " + appointment?.status?.toLowerCase()}>
          <a href="">{appointment?.status}</a>
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

export default BookingTBody;
