import React from "react";
import LabeledIconText from "../../LabeledIconText";

const PatientInfo = () => {
  return (
    <>
      <div className="patient-info-section">
        <div className="contact-detail">
          <LabeledIconText
            iconClass="fa-solid fa-envelope"
            label="Email-ID"
            value="carder@gmail.com"
          />
          <LabeledIconText
            iconClass="fa-solid fa-phone"
            label="Phone Number"
            value="9887767890"
          />
          <div className="patient-info-date-time">
            <div>
              <img src="/images/icons8-calendar-30.png" alt="calender" />
            </div>
            <p>Feb07,2025</p>
          </div>
          <div className="patient-info-date-time">
            <div>
              <img src="/images/icon-clock.png" alt="clock" />
            </div>
            <p>11:40 AM</p>
          </div>
        </div>
        <div className="download-info-button">
          <button>
            Download Medical Report
            <img alt="download" src="/images/icons-download.png" />
          </button>
        </div>
      </div>
      <h4 className="patient-info-symptom">
        Chest Pain Or Pressure And Pain That Radiates Pressure Pain Or Pressure
      </h4>
    </>
  );
};

export default PatientInfo;
