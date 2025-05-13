import React from "react";
import { Link } from "react-router-dom";
import { useAddDoctor, useNeedPermission } from "../../../hooks";
import { formatDate, formatTime } from "../../../utils/helper";

const AppointmentTBody = ({
  appointment,
  showAddDoctor,
  showReport,
  showCancel,
}) => {
  const { handleOpenPermissionBox } = useNeedPermission();
  const { handleOpen, setSelectedAppointment } = useAddDoctor();

  const handleAssignClick = () => {
    setSelectedAppointment(appointment); // Store selected appointment in state
    handleOpen(); // Open the Assign Doctor modal
  };

  const handleCancel = async () => {
    handleOpenPermissionBox("Cancel", appointment); // Open permission modal with selected option
  };

  const isReport =
    appointment?.status === "Complete" || appointment?.status === "Past";

  return (
    <tr>
      <td>
        <div className="doctor-profile">
          <img
            src={
              appointment?.patientId?.profilePhoto?.url || "/images/user.png"
            }
            alt="person"
          />
          <h5>{appointment?.patientId?.fullName}</h5>
        </div>
      </td>

      <td>
        <p className="doctor-patient-detail">
          {appointment?.reason || "No reason provided"}
        </p>
      </td>

      <td>
        <div class="date-time-text">
          <p>{formatTime(appointment?.timeOfAppointment)}</p>
        </div>
      </td>

      <td>
        <div class="date-time-text">
          <p>{formatDate(appointment?.dateOfAppointment)}</p>
        </div>
      </td>

      <td>
        <p className="doctor-patient-detail">{appointment?.patientId?.email}</p>
      </td>

      {showReport && (
        <td>
          {isReport ? (
            <div class="assigned-status-download-report">
              <a href="">
                <img src="/images/icons-download.png" alt="download" />
                <span>Download Report</span>
              </a>
            </div>
          ) : (
            <p className="doctor-patient-detail">No Report</p>
          )}
        </td>
      )}

      <td>
        <div class={"assigned-status " + appointment?.status?.toLowerCase()}>
          <a href="">{appointment?.status}</a>
        </div>
      </td>

      {showAddDoctor && (
        <td>
          <div class="assign-doctor">
            <button to="/auth/add-doctor" onClick={handleAssignClick}>
              Assign Doctor
            </button>
          </div>
        </td>
      )}

      <td>
        <div className="assigned-status-view-detail">
          <Link to={"/auth/booking-detail/" + appointment?._id}>
            View Detail
          </Link>
        </div>
      </td>

      {showCancel && (
        <td>
          <div className="cancel-appointment">
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default AppointmentTBody;
