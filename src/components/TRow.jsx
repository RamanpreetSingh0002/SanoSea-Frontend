import React from "react";
import AssignedPerson from "./AssignedPerson";
import { Link } from "react-router-dom";

const TRow = ({
  patientImg,
  patientName,
  doctorImg,
  doctorName,
  portAgentImg,
  portAgentName,
  time,
  date,
  statusClass,
  statusLabel,
  actionType,
  isPortAgent = false,
}) => {
  return (
    <tr>
      {/* Patient Assigned */}
      {patientName && (
        <td>
          <AssignedPerson img={patientImg} name={patientName} />
        </td>
      )}
      {/* Doctor assigned */}
      <td>
        <AssignedPerson img={doctorImg} name={doctorName} />
      </td>
      {/* Port Agent Assigned */}
      <td>
        <AssignedPerson img={portAgentImg} name={portAgentName} />
      </td>

      {/* Time */}
      <td>
        <div class="date-time-text">
          <p>{time}</p>
        </div>
      </td>

      {/* Date */}
      <td>
        <div class="date-time-text">
          <p>{date}</p>
        </div>
      </td>

      <td>
        <div class={"assigned-status " + statusClass}>
          <a href="">{statusLabel}</a>
        </div>
      </td>

      {!patientName && (
        <td>
          <div class="assigned-status-download-report">
            <a href="">
              <img src="/images/icons-download.png" alt="download" />
              <span>Download Report</span>
            </a>
          </div>
        </td>
      )}

      {isPortAgent && (
        <td>
          <div class="add-cab-details">
            <button to="/auth/booking-detail">Add Cab Details</button>
          </div>
        </td>
      )}

      <td>
        <div class="assigned-status-view-detail">
          <Link to="/auth/booking-detail">{actionType}</Link>
        </div>
      </td>
    </tr>
  );
};

export default TRow;
