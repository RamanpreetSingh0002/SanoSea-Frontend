import React from "react";
import LabeledIconText from "../../LabeledIconText";
import { formatTime } from "../../../utils/helper";

const PatientInfo = ({ appointment }) => {
  return (
    <>
      <div className="patient-info-section">
        <div className="contact-detail">
          <LabeledIconText
            iconClass="fa-solid fa-envelope"
            label="Email-ID"
            value={appointment?.patient?.email}
          />
          <LabeledIconText
            iconClass="fa-solid fa-phone"
            label="Phone Number"
            value={appointment?.patient?.phoneNumber}
          />
          <div className="patient-info-date-time">
            <div>
              <img src="/images/icons8-calendar-30.png" alt="calender" />
            </div>
            <p>
              {new Date(appointment?.dateOfAppointment).toLocaleDateString(
                "en-US",
                {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                }
              )}
            </p>
          </div>
          <div className="patient-info-date-time">
            <div>
              <img src="/images/icon-clock.png" alt="clock" />
            </div>
            <p>{formatTime(appointment?.timeOfAppointment)}</p>
          </div>
        </div>
        <div className="download-info-button">
          <button>
            Download Medical Report
            <img alt="download" src="/images/icons-download.png" />
          </button>
        </div>
      </div>
      <h4 className="patient-info-symptom">{appointment?.reason}</h4>
    </>
  );
};

export default PatientInfo;
