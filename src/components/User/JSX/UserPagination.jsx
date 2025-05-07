import React from "react";
import PaginationComponent from "../../PaginationComponent";
import { useApi } from "../../../hooks";

const UserPagination = () => {
  const { fetchParams, totalUsers, fetchUsers } = useApi();
  const { pageNo, limit } = fetchParams;

  const totalPages = Math.ceil(totalUsers / limit);

  // ✅ Handle Page Change
  const handlePageChange = newPage => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchUsers(fetchParams.roles, newPage, limit);
    }
  };

  return (
    <PaginationComponent
      pageNo={pageNo}
      limit={limit}
      total={totalUsers}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  );
};

export default UserPagination;
