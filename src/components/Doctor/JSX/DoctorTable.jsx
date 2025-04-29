import React from "react";

import UserTablePage from "../../UserTablePage";
import "../Style/DoctorForm.css";

const DoctorTable = () => {
  return (
    <UserTablePage header="Doctor" addBtn="Add New Doctor" width={"108px"} />
  );
};

export default DoctorTable;
