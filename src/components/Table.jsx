import React from "react";
import TableHeader from "./TableHeader";

const Table = ({ isPatient, children }) => {
  return (
    <table class="booking-table">
      <TableHeader isPatient={isPatient} />
      {children}
    </table>
  );
};

export default Table;
