import React from "react";

import { formatDate, formatTime } from "../../../utils/helper";

const NewAppointmentsInfo = ({ appointment }) => {
  return (
    <>
      <div className="patient-info-section">
        <div className="contact-detail">
          <div className="patient-info-date-time">
            <div>
              <img src="/images/icons8-calendar-30.png" alt="calender" />
            </div>
            <p>{formatDate(appointment?.dateOfAppointment)}</p>
          </div>

          {appointment?.timeOfAppointment && (
            <div className="patient-info-date-time">
              <div>
                <img src="/images/icon-clock.png" alt="clock" />
              </div>
              <p>{formatTime(appointment?.timeOfAppointment)}</p>
            </div>
          )}
        </div>
      </div>
      <h4 className="patient-info-symptom" style={{ marginBottom: "8px" }}>
        {appointment?.reason}
      </h4>
    </>
  );
};

export default NewAppointmentsInfo;
