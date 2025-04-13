import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropdownSelect from "../../DropdownSelect";

const SubAdminRow = ({ name, type, role }) => {
  const handleDropdownChange = (value) => {
    console.log("Selected Status:", value);
  };

  return (
    <tr>
      <td>
        <div className="admin-profile">
          <img src="/images/person.jpg" alt="person" />
          <h5>{name}</h5>
        </div>
      </td>
      <td>
        <p className="admin-type">{type}</p>
      </td>
      <td>
        <p className="admin-role">{role}</p>
      </td>
      <td>
        <DropdownSelect
          defaultValue="Active"
          options={["Active", "Deactive", "Edit"]}
          includeLabel={true} // shows "Select State" label
          onChange={handleDropdownChange}
        />
      </td>
      <td>
        <div className="assigned-status-view-detail">
          <Link to="">View Detail</Link>
        </div>
      </td>
    </tr>
  );
};

export default SubAdminRow;
