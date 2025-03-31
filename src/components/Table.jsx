import React from "react";
import TableHeader from "./TableHeader";

const Table = ({ children }) => {
  return (
    <table class="booking-table">
      <TableHeader />
      {children}
    </table>
  );
};

export default Table;
