import React, { useEffect } from "react";
import { useApi } from "../../../hooks";
import UserTablePage from "../../UserTablePage";

import "../Style/SubAdmin.css";

const SubAdminTable = () => {
  const { users, fetchingUsers, fetchParams, fetchUsers } = useApi();

  useEffect(() => {
    fetchUsers(
      "Coordinator,Audit Manager",
      fetchParams.pageNo,
      fetchingUsers.limit
    ); // Fetch Coordinator & Audit Manager
  }, []);

  return (
    <UserTablePage
      header="Sub Admin"
      addBtn="Add Sub Admin"
      width={"134px"}
      users={users}
      busy={fetchingUsers}
    />
  );
};

export default SubAdminTable;
