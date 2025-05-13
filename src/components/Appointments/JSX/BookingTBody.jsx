import React from "react";
import { Link } from "react-router-dom";
import { useAddCab } from "../../../hooks";
import { formatDate, formatTime } from "../../../utils/helper";
import ProfileCol from "../../User/JSX/ProfileCol";

const BookingTBody = ({
  appointment,
  isPortAgent,
  isPatient,
  showAddCab = false,
  showReason = false,
  showReport,
  showEmail = false,
}) => {
  const { handleOpen, setSelectedAppointment } = useAddCab();

  const handleAddClick = () => {
    setSelectedAppointment(appointment);
    handleOpen();
  };

  const checkShowAddCab = (status, assignedDoctor) => {
    return (
      (status === "New" || status === "Waiting" || status === "Upcoming") &&
      assignedDoctor
    );
  };

  const isReport =
    appointment?.status === "Complete" || appointment?.status === "Past";

  return (
    <tr>
      {!isPatient && (
        <td>
          <ProfileCol
            img={appointment?.patientId?.profilePhoto?.url}
            name={appointment?.patientId?.fullName}
            id={appointment?.patientId?._id}
          />
        </td>
      )}

      <td>
        {appointment?.assignedDoctorId ? (
          <ProfileCol
            img={appointment?.assignedDoctorId?.profilePhoto?.url}
            name={appointment?.assignedDoctorId?.fullName}
            id={appointment?.assignedDoctorId?._id}
          />
        ) : (
          <p className="doctor-patient-detail">No Doctor Assigned</p>
        )}
      </td>

      {!isPortAgent && (
        <td>
          {appointment?.portAgentId ? (
            <ProfileCol
              img={appointment?.portAgentId?.profilePhoto?.url}
              name={appointment?.portAgentId?.fullName}
              id={appointment?.portAgentId?._id}
            />
          ) : (
            <p className="doctor-patient-detail">No Port Agent</p>
          )}
        </td>
      )}

      {isPortAgent && (
        <td>
          {appointment?.coordinatorId ? (
            <ProfileCol
              img={appointment?.coordinatorId?.profilePhoto?.url}
              name={appointment?.coordinatorId?.fullName}
              id={appointment?.coordinatorId?._id}
            />
          ) : (
            <p className="doctor-patient-detail">No Coordinator</p>
          )}
        </td>
      )}

      {showReason && (
        <td>
          <p className="doctor-patient-detail">
            {appointment?.reason || "No reason provided"}
          </p>
        </td>
      )}

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

      {showEmail && (
        <td>
          <p className="doctor-patient-detail">
            {appointment?.patientId?.email}
          </p>
        </td>
      )}

      {/* <td>
          <p className="doctor-patient-detail">{phoneNumber}</p>
        </td> */}

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

      {isPortAgent && showAddCab && (
        <td>
          {checkShowAddCab(
            appointment?.status,
            appointment?.assignedDoctorId
          ) && (
            <div class="add-cab">
              <button type="button" onClick={handleAddClick}>
                Add Cab Details
              </button>
            </div>
          )}
        </td>
      )}

      <td>
        <div className="assigned-status-view-detail">
          <Link to={"/auth/booking-detail/" + appointment?._id}>
            View Detail
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default BookingTBody;
