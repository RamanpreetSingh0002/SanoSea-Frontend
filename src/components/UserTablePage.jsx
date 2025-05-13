import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";

import UserTRow from "./UserTRow";
import TBox from "./TBox";

import { useApi, useAuth, useUserForm } from "../hooks";
import { useDebounce } from "../utils/helper";
import UserPagination from "./User/JSX/UserPagination";

const UserTablePage = ({ header, addBtn, width, users, busy }) => {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false); // Manage visibility
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || "" // Restore search on refresh
  );

  const { fetchUsers, fetchParams } = useApi(); // Use context to fetch users
  const { handleOpenUserForm } = useUserForm(); // Use context to open UserForm
  const { authInfo } = useAuth();
  const { profile } = authInfo;

  const location = useLocation();
  const isSubAdminPage = location.pathname === "/auth/sub-admin";
  const isPatientPage = location.pathname === "/auth/patient";

  const handleOpen = (user = null) => {
    handleOpenUserForm(user, header, width); // Open UserForm with user data
  };

  // Toggle search bar visibility
  const handleSearchClick = () => {
    setSearchVisible(prev => !prev);
  };

  const debouncedSearch = useDebounce(searchQuery, 500);
  useEffect(() => {
    if (debouncedSearch === "") {
      // If search is empty, fetch users without search
      fetchUsers(fetchParams.roles, fetchParams.pageNo, fetchParams.limit, "");

      const removeInput = setTimeout(() => {
        setSearchVisible(false); // Hide search bar after 5 seconds
        setSearchQuery(""); // Reset search query
        localStorage.setItem("searchQuery", ""); // Clear search query in local storage
      }, 5000);

      return () => {
        clearTimeout(removeInput);
      };
    }
    // Fetch users when search query changes
    if (searchQuery)
      fetchUsers(
        fetchParams.roles,
        fetchParams.pageNo,
        fetchParams.limit,
        debouncedSearch
      );

    if (localStorage.getItem("searchQuery") !== "") setSearchVisible(true); // Show search bar if there's a query
  }, [debouncedSearch]);

  return (
    <main>
      <section id="sub-admin-section">
        <div className="sub-admin-header">
          <h4>{header}</h4>
          <div className="doctor-btn">
            {/* search-btn */}
            <button className="search-btn" onClick={handleSearchClick}>
              <i className="fa-solid fa-search"></i>
            </button>

            {/* Add transition effect */}
            <div
              className={`form_field search-field ${
                searchVisible ? "visible" : ""
              }`}
            >
              <input
                name="search"
                value={searchQuery}
                placeholder="Search"
                onChange={e => setSearchQuery(e.target.value)} // Auto-fetches results
              />
            </div>

            {profile?.role === "Admin" && !isPatientPage && (
              <button className="add-user-btn" onClick={() => handleOpen()}>
                <img src="/images/icon-plus-white.png" alt="icon-plus" />
                {addBtn}
              </button>
            )}
          </div>
        </div>

        <div
          className="sub-admin-box"
          // style={{ height: !busy && users && users?.length > 0 && "auto" }}
        >
          <TBox heading={header} onRefresh={fetchUsers} />

          {busy ? (
            <div style={{ textAlign: "center" }}>
              <ImSpinner3 className="animate-spin" />
              <br />
              <div className="loading-text">
                Loading
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            </div>
          ) : !users || users?.length === 0 ? (
            <h6 style={{ textAlign: "center", padding: "15px" }}>
              No {header + "s"} Found
            </h6>
          ) : (
            <>
              <table className="sub-admin-table">
                <thead>
                  <tr>
                    <th>{header + "s"}</th>
                    <th>Email</th>
                    {isSubAdminPage && <th>Role</th>}
                    <th>State</th>

                    {isPatientPage && (
                      <>
                        {/* <th>Status</th> */}
                        <th>Report</th>
                      </>
                    )}
                    <th colSpan="2"></th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, index) => (
                    <UserTRow
                      key={index}
                      onOpen={() => handleOpen(user)}
                      user={user}
                      index={index}
                      activeDropdownIndex={activeDropdownIndex}
                      setActiveDropdownIndex={setActiveDropdownIndex}
                    />
                  ))}
                </tbody>
              </table>

              <UserPagination />
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default UserTablePage;
