import React from "react";
import { Link, useLocation } from "react-router-dom";
import DropdownSelect from "./DropdownSelect";

const UserTRow = ({
  name,
  email,
  role,
  imgSrc,
  index,
  activeDropdownIndex,
  setActiveDropdownIndex,
}) => {
  const handleDropdownChange = value => {
    console.log("Selected Status:", value);
  };

  const location = useLocation();
  const isSubAdminPage = location.pathname === "/auth/sub-admin";

  return (
    <tr>
      <td>
        <div className="doctor-profile">
          <img src={imgSrc} alt="person" />
          <h5>{name}</h5>
        </div>
      </td>
      <td>
        <p className="doctor-email">{email}</p>
      </td>
      {isSubAdminPage && (
        <td>
          <p className="admin-role">{role}</p>
        </td>
      )}
      <td>
        <DropdownSelect
          defaultValue="Active"
          options={["Active", "Deactive", "Edit"]}
          includeLabel={true} // shows "Select State" label
          onChange={handleDropdownChange}
          index={index}
          activeDropdownIndex={activeDropdownIndex}
          setActiveDropdownIndex={setActiveDropdownIndex}
        />
      </td>

      <td>
        <div className="assigned-status-view-detail">
          <Link to="">View Detail</Link>
        </div>
      </td>
      <td>
        <div className="delete-profile">
          <button>Delete Profile</button>
        </div>
      </td>
    </tr>
  );
};

export default UserTRow;
