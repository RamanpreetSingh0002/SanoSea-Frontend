import React, { useEffect } from "react";
import { useApi } from "../../../hooks";
import UserTablePage from "../../UserTablePage";

const GeneralPhysicianTable = () => {
  const { users, fetchingUsers, fetchParams, fetchUsers } = useApi();

  useEffect(() => {
    fetchUsers("General Physician", fetchParams.pageNo, fetchingUsers.limit); // Fetch General Physician
  }, []);

  return (
    <UserTablePage
      header="General Physician"
      addBtn="Add New General Physician"
      width={"180px"}
      users={users}
      busy={fetchingUsers}
    />
  );
};

export default GeneralPhysicianTable;
