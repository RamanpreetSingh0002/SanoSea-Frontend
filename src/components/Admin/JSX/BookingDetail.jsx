import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchAppointment } from "../../../api/appointment";
import UserHeader from "../../UserHeader";
import PatientInfo from "../../Patient/JSX/PatientInfo";
import PortAgentInfo from "../../PortAgent/JSX/PortAgentInfo";
import LabeledIconText from "../../LabeledIconText";

import "../Style/BookingDetail.css";
import { ImSpinner3 } from "react-icons/im";
import { useNotification } from "../../../hooks";

const BookingDetail = () => {
  const { appointmentId } = useParams();
  const [busy, setBusy] = useState(false);
  const [appointment, setAppointment] = useState(null);

  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  useEffect(() => {
    const handleFetchAppointment = async () => {
      setBusy(true);
      const response = await fetchAppointment(appointmentId);
      setBusy(false);

      if (response.error) return updateNotification("error", response.error);

      setAppointment(response.appointment);
    };

    if (appointmentId) {
      handleFetchAppointment();
    }
  }, [appointmentId]);

  return (
    <>
      <main>
        <div className="booking-detail">
          <div className="booking-detail-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <i class="fa-solid fa-arrow-left"></i> Back
            </button>
            {!busy && (
              <button style={{ cursor: "default" }}>Booking Detail</button>
            )}
          </div>

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
          ) : !appointment ? (
            <h6 style={{ textAlign: "center", padding: "15px" }}>
              No Appointment Found
            </h6>
          ) : (
            <div className="booking-detail-content">
              <div className="booking-section">
                <h4>Booking Detail</h4>
                <div
                  class={
                    "assigned-status " + appointment?.status?.toLowerCase()
                  }
                >
                  <a
                    href=""
                    style={{
                      fontSize: "12px",
                      padding: "2px 10px",
                      width: "auto",
                    }}
                  >
                    {appointment?.status}
                  </a>
                </div>
              </div>

              <div className="booking-user-detail">
                {/* Patient Info */}
                {appointment?.patient && (
                  <UserHeader
                    imgSrc={
                      appointment?.patient?.profilePhoto || "/images/user.png"
                    }
                    name={appointment?.patient?.fullName}
                    role={appointment?.patient?.role}
                  >
                    <PatientInfo appointment={appointment} />
                  </UserHeader>
                )}

                {/* Port Agent Info */}
                {appointment?.portAgent && (
                  <UserHeader
                    imgSrc={
                      appointment?.portAgent?.profilePhoto || "/images/user.png"
                    }
                    name={appointment?.portAgent?.fullName}
                    role={appointment?.portAgent?.role}
                  >
                    <PortAgentInfo appointment={appointment} />
                  </UserHeader>
                )}

                {/* general physician */}
                {appointment?.generalPhysician && (
                  <UserHeader
                    imgSrc={
                      appointment?.generalPhysician?.profilePhoto ||
                      "/images/user.png"
                    }
                    name={appointment?.generalPhysician?.fullName}
                    role={appointment?.generalPhysician?.role}
                  >
                    <div className="contact-detail">
                      <LabeledIconText
                        iconClass="fa-solid fa-envelope"
                        label="Email-ID"
                        value={appointment?.generalPhysician?.email}
                      />
                      <LabeledIconText
                        iconClass="fa-solid fa-phone"
                        label="Phone Number"
                        value={appointment?.generalPhysician?.phoneNumber}
                      />
                      {/* <LabeledIconText
                        iconClass="fa-solid fa-ship"
                        label="Ship ID"
                        value="2345676"
                      /> */}
                    </div>
                  </UserHeader>
                )}

                {/* surgeon*/}
                {appointment?.doctor && (
                  <UserHeader
                    imgSrc={
                      appointment?.doctor?.profilePhoto || "/images/user.png"
                    }
                    name={appointment?.doctor?.fullName}
                    role={`Doctor (${appointment?.doctor?.doctorSpeciality})`}
                    // experience="10 years"
                  >
                    <div className="contact-detail">
                      <LabeledIconText
                        iconClass="fa-solid fa-envelope"
                        label="Email-ID"
                        value={appointment?.doctor?.email}
                      />
                      <LabeledIconText
                        iconClass="fa-solid fa-phone"
                        label="Phone Number"
                        value={appointment?.doctor?.phoneNumber}
                      />
                      {appointment?.doctor?.officeAddress && (
                        <LabeledIconText
                          iconClass="fa-solid fa-location-dot"
                          label="Office Address"
                          value={appointment?.doctor?.officeAddress}
                        />
                      )}
                    </div>
                  </UserHeader>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default BookingDetail;
