import React from "react";

const TableHeader = ({ isPatient, isPortAgent }) => {
  return (
    <thead>
      <tr class="booking-header">
        {!isPatient && <th>Patient Assigned</th>}
        <th>Doctor Assigned</th>
        <th>Port Agent Assigned</th>
        <th>Time</th>
        <th>Date</th>
        <th colspan={isPatient || isPortAgent ? "3" : "2"}>Status</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
