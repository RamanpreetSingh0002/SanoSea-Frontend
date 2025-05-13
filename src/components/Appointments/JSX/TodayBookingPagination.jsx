import React from "react";
import { useAppointments } from "../../../hooks";
import PaginationComponent from "../../PaginationComponent";

const TodayBookingPagination = () => {
  const { fetchParams, totalAppointments, fetchTodayAppointments } =
    useAppointments();
  const { pageNo, limit } = fetchParams;

  console.log(totalAppointments);
  console.log(pageNo);
  console.log(limit);

  const totalPages = Math.ceil(totalAppointments / limit);

  // Handle Page Change
  const handlePageChange = newPage => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchTodayAppointments(newPage, limit);
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

export default TodayBookingPagination;
