import React from "react";

import LabeledIconText from "../../LabeledIconText";
import CabLocation from "../../CabLocation";
import BookingDetailItem from "./BookingDetailItem";
import { formatDate, formatTime } from "../../../utils/helper";

const PortAgentInfo = ({ appointment }) => {
  return (
    <div className="port-agent-info-section">
      <div className="contact-detail">
        <LabeledIconText
          iconClass="fa-solid fa-envelope"
          label="Email-ID"
          value={appointment?.portAgent?.email}
        />
        <LabeledIconText
          iconClass="fa-solid fa-phone"
          label="Phone Number"
          value={appointment?.portAgent?.phoneNumber}
        />
      </div>

      {appointment?.cabDetails && (
        <div className="port-agent-info-cab">
          <div className="row">
            <div className="col-3">
              <div class="cab-location">
                <CabLocation
                  address={appointment?.cabDetails?.pickupLocation}
                  type="Pickup"
                />
                <CabLocation
                  address={appointment?.cabDetails?.dropOffLocation}
                  type="Drop Off"
                />
              </div>
            </div>

            <div className="col-6">
              <div className="port-agent-booking-detail">
                <div className="row">
                  <div className="col-4 ">
                    <BookingDetailItem
                      imgSrc="/images/icon-clock.png"
                      cabDetailHeader="Pickup Time"
                      cabDetailValue={formatTime(
                        appointment?.cabDetails?.pickupTime
                      )}
                    />
                  </div>

                  <div className="col-4 ">
                    <BookingDetailItem
                      iconClass="fa-solid fa-car-side"
                      cabDetailHeader="Cab Number"
                      cabDetailValue={appointment?.cabDetails?.cabNumber}
                    />
                  </div>

                  <div className="col-4 ">
                    <BookingDetailItem
                      imgSrc="/images/icons8-calendar-30.png"
                      cabDetailHeader="Date of Booking"
                      cabDetailValue={formatDate(
                        appointment?.dateOfAppointment
                      )}
                    />
                  </div>

                  <div className="col-4 ">
                    <BookingDetailItem
                      imgSrc="/images/icon-clock.png"
                      cabDetailHeader="Drop Off Time"
                      cabDetailValue={formatTime(
                        appointment?.cabDetails?.dropOffTime
                      )}
                    />
                  </div>

                  <div className="col-4 ">
                    <BookingDetailItem
                      cabDetailHeader="Driver Name"
                      cabDetailValue={appointment?.cabDetails?.driverName}
                    />
                  </div>

                  <div className="col-4 ">
                    <BookingDetailItem
                      iconClass="fa-solid fa-phone"
                      cabDetailHeader="Driver Contact Number"
                      cabDetailValue={appointment?.cabDetails?.phoneNumber}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-3">
              <div className="download-info-button">
                <button>
                  Download Invoice
                  <img alt="download" src="/images/icons-download.png" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortAgentInfo;
