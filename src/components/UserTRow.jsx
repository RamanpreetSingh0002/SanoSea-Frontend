import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import { useNeedPermission, useNotification } from "../hooks";
import DropdownSelect from "./DropdownSelect";

const UserTRow = ({
  onOpen,
  user,
  index,
  activeDropdownIndex,
  setActiveDropdownIndex,
}) => {
  const { handleOpenPermissionBox } = useNeedPermission();

  const location = useLocation();
  const isSubAdminPage = location.pathname === "/auth/sub-admin";
  const isPatientPage = location.pathname === "/auth/patient";

  const handleDeleteUser = async () => {
    handleOpenPermissionBox("Delete", user); // Open permission modal with selected option
  };

  return (
    <tr>
      <td>
        <div className="doctor-profile">
          <img
            src={user?.profilePhoto?.url || "/images/user.png"}
            alt="person"
          />
          <h5>{user?.fullName}</h5>
        </div>
      </td>

      <td>
        <p className="doctor-email">{user?.email}</p>
      </td>

      {isSubAdminPage && (
        <td>
          <p className="admin-role">{user?.roleId?.name}</p>
        </td>
      )}

      <td>
        <DropdownSelect
          user={user}
          onOpen={onOpen}
          defaultValue={user?.state}
          options={["Active", "Deactive", "Edit"]}
          includeLabel={true} // shows "Select State" label
          index={index}
          activeDropdownIndex={activeDropdownIndex}
          setActiveDropdownIndex={setActiveDropdownIndex}
        />
      </td>

      {isPatientPage && (
        <>
          {/* <td>
            <div class={"assigned-status " + statusClass}>
              <a href="">{statusLabel}</a>
            </div>
          </td> */}

          <td>
            <div class="assigned-status-download-report">
              <a href="">
                <img src="/images/icons-download.png" alt="download" />
                <span>Download Report</span>
              </a>
            </div>
          </td>
        </>
      )}

      <td>
        <div className="assigned-status-view-detail">
          <Link
            to={"/auth/user-profile/" + user?._id}
            state={{ fromSubAdmin: isSubAdminPage }}
            onClick={() => {
              localStorage.setItem("stateQuery", "");
              localStorage.setItem("activeState", "");
            }}
          >
            View Detail
          </Link>
        </div>
      </td>
      <td>
        <div className="delete-profile">
          <button onClick={handleDeleteUser}>Delete Profile</button>
        </div>
      </td>
    </tr>
  );
};

export default UserTRow;
