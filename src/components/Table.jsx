import React from "react";
import TableHeader from "./TableHeader";

const Table = ({ isPatient, isPortAgent, children }) => {
  return (
    <table class="booking-table">
      <TableHeader isPatient={isPatient} isPortAgent={isPortAgent} />

      {children}
    </table>
  );
};

export default Table;
