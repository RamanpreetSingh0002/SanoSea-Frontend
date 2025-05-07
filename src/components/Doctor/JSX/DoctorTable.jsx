import React, { useEffect } from "react";
import { useApi } from "../../../hooks";
import UserTablePage from "../../UserTablePage";
import "../Style/DoctorForm.css";

const DoctorTable = () => {
  const { users, fetchingUsers, fetchParams, fetchUsers } = useApi();

  useEffect(() => {
    fetchUsers("Doctor", fetchParams.pageNo, fetchingUsers.limit); // Fetch Doctor
  }, []);

  return (
    <UserTablePage
      header="Doctor"
      addBtn="Add New Doctor"
      width={"108px"}
      users={users}
      busy={fetchingUsers}
    />
  );
};

export default DoctorTable;
