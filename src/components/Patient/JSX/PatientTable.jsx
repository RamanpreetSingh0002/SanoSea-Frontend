import React, { useEffect } from "react";
import { useApi } from "../../../hooks";
import UserTablePage from "../../UserTablePage";

const PatientTable = () => {
  const { users, fetchingUsers, fetchParams, fetchUsers } = useApi();

  useEffect(() => {
    fetchUsers("Patient", fetchParams.pageNo, fetchingUsers.limit); // Fetch Patient
  }, []);

  return <UserTablePage header="Patient" users={users} busy={fetchingUsers} />;
};

export default PatientTable;
