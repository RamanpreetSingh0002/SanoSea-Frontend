import React from "react";
import AssignedPerson from "./AssignedPerson";

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
}) => {
  return (
    <tr>
      {/* Patient Assigned */}
      <td>
        <AssignedPerson img={patientImg} name={patientName} />
      </td>
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

      <td>
        <div class="assigned-status-view-detail">
          <a href="">Cancel Appointment</a>
        </div>
      </td>
    </tr>
  );
};

export default TRow;
