import React, { useEffect } from "react";
import UserTablePage from "../../UserTablePage";
import { useApi } from "../../../hooks";

const PortAgentTable = () => {
  const { users, fetchingUsers, fetchParams, fetchUsers } = useApi();

  useEffect(() => {
    fetchUsers("Port Agent", fetchParams.pageNo, fetchingUsers.limit); // Fetch Port Agent
  }, []);

  return (
    <UserTablePage
      header="Port Agent"
      addBtn="Add New Port Agent"
      width={"134px"}
      users={users}
      busy={fetchingUsers}
    />
  );
};

export default PortAgentTable;
