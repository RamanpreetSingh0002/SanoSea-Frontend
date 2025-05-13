import { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";

import UserHeader from "../../UserHeader";
import NewAppointmentsInfo from "./NewAppointmentInfo";
import { fetchNewlyAssignedAppointments } from "../../../api/appointment";

import "../Style/NewAppointments.css";

const NewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setBusy(true);
      const response = await fetchNewlyAssignedAppointments();
      setBusy(false);
      console.log(response);

      if (response.error) return;

      setAppointments(response.appointments);
    };

    fetchAppointments();
  }, []);

  return (
    <div className="new-appointment-content">
      <div className="booking-section">
        <h4>Newly Assigned Appointments</h4>
      </div>
      <div className="booking-user-detail">
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
        ) : !appointments || appointments?.length === 0 ? (
          <h6
            style={{ textAlign: "center", padding: "15px", fontSize: "14px" }}
          >
            No Appointments Found
          </h6>
        ) : (
          appointments.map((appointment, index) => (
            <UserHeader
              key={index}
              imgSrc={
                appointment?.patientId.profilePhoto?.url || "/images/user.png"
              }
              name={appointment?.patientId.fullName}
              role="Patient"
            >
              <NewAppointmentsInfo appointment={appointment} />
            </UserHeader>
          ))
        )}
      </div>
    </div>
  );
};

export default NewAppointments;
