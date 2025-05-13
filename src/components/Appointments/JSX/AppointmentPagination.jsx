import React from "react";
import { useAppointments } from "../../../hooks";
import PaginationComponent from "../../PaginationComponent";

const AppointmentPagination = () => {
  const { fetchParams, totalAppointments, fetchAppointments } =
    useAppointments();
  const { pageNo, limit } = fetchParams;

  const totalPages = Math.ceil(totalAppointments / limit);

  // Handle Page Change
  const handlePageChange = newPage => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchAppointments(
        newPage,
        limit,
        fetchParams.state,
        fetchParams.selectedDate
      );
    }
  };

  return (
    <PaginationComponent
      pageNo={pageNo}
      limit={limit}
      total={totalAppointments}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
      //   position="relative"
    />
  );
};

export default AppointmentPagination;
