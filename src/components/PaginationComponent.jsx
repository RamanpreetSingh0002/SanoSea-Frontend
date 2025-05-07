import React from "react";
import { useApi } from "../hooks";

const PaginationComponent = ({
  pageNo,
  limit,
  total,
  totalPages,
  handlePageChange,
  position,
}) => {
  // const { fetchParams, totalUsers, fetchUsers } = useApi();
  // const { pageNo, limit } = fetchParams;

  // const totalPages = Math.ceil(totalUsers / limit);

  // // Handle Page Change
  // const handlePageChange = newPage => {
  //   if (newPage >= 0 && newPage < totalPages)
  //     fetchUsers(fetchParams.roles, newPage, limit);
  // };

  // Generate Pagination Buttons Dynamically
  const getPageNumbers = () => {
    let pages = [];

    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      if (pageNo <= 2) {
        pages = [0, 1, 2, "...", totalPages - 1];
      } else if (pageNo >= totalPages - 3) {
        pages = [0, "...", totalPages - 3, totalPages - 2, totalPages - 1];
      } else {
        pages = [
          0,
          "...",
          pageNo - 1,
          pageNo,
          pageNo + 1,
          "...",
          totalPages - 1,
        ];
      }
      //   pages = [0, 1, 2, "...", totalPages - 1]; // Example skipping large pages
    }
    return pages;
  };

  return (
    <div
      className={`pagination-container ${
        totalPages === 1 ? "inactive-pagination" : ""
      }`}
      style={{ position: position }}
    >
      <div className="page-info">
        <p>
          Showing Data {pageNo * limit + 1} to{" "}
          {Math.min((pageNo + 1) * limit, total)}
        </p>
      </div>

      {totalPages > 1 && (
        <div className="pagination-buttons">
          {/* Left Arrow */}
          <button
            onClick={() => handlePageChange(pageNo - 1)}
            disabled={pageNo === 0}
          >
            <i class="fa-solid fa-angle-left"></i>
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              className={pageNo === page ? "active" : ""}
            >
              {page === "..." ? "..." : page + 1}
            </button>
          ))}

          {/* Right Arrow */}
          <button
            onClick={() => handlePageChange(pageNo + 1)}
            disabled={pageNo === totalPages - 1}
          >
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginationComponent;
