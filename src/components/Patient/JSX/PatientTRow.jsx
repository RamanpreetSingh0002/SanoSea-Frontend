import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropdownSelect from "../../DropdownSelect";

const PatientTRow = ({
  name,
  imgSrc,
  email,
  index,
  statusClass,
  statusLabel,
  activeDropdownIndex,
  setActiveDropdownIndex,
}) => {
  const handleDropdownChange = (value) => {
    console.log("Selected Status:", value);
  };

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
        <div class={"assigned-status " + statusClass}>
          <a href="">{statusLabel}</a>
        </div>
      </td>

      <td>
        <div class="assigned-status-download-report">
          <a href="">
            <img src="/images/icons-download.png" alt="download" />
            <span>Download Report</span>
          </a>
        </div>
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

export default PatientTRow;
