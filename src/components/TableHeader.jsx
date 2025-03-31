import React from "react";

const TableHeader = () => {
  return (
    <thead>
      <tr class="booking-header">
        <th>Patient Assigned</th>
        <th>Doctor Assigned</th>
        <th>Port Agent Assigned</th>
        <th>Time</th>
        <th>Date</th>
        <th colspan="2">Status</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
