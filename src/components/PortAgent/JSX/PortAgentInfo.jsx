import React from "react";

import LabeledIconText from "../../LabeledIconText";
import CabLocation from "../../CabLocation";
import BookingDetailItem from "./BookingDetailItem";

const PortAgentInfo = () => {
  return (
    <div className="port-agent-info-section">
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
      </div>

      <div className="port-agent-info-cab">
        <div className="row">
          <div className="col-3">
            <div class="cab-location">
              <CabLocation
                address="R.AI-Ani, B.Zhou, Q,Shi,A.Sagheer"
                type="Pickup"
              />
              <CabLocation address="M. Arif, G. Wang, T.Peng" type="Drop Off" />
            </div>
          </div>

          <div className="col-6">
            <div className="port-agent-booking-detail">
              <div className="row">
                <div className="col-4 ">
                  <BookingDetailItem
                    imgSrc="/images/icon-clock.png"
                    cabDetailHeader="Pickup Time"
                    cabDetailValue="11:40 AM"
                  />
                </div>

                <div className="col-4 ">
                  <BookingDetailItem
                    iconClass="fa-solid fa-car-side"
                    cabDetailHeader="Cab Number"
                    cabDetailValue="8765456769"
                  />
                </div>

                <div className="col-4 ">
                  <BookingDetailItem
                    imgSrc="/images/icons8-calendar-30.png"
                    cabDetailHeader="Date of Booking"
                    cabDetailValue="Jan 20,2025"
                  />
                </div>

                <div className="col-4 ">
                  <BookingDetailItem
                    imgSrc="/images/icon-clock.png"
                    cabDetailHeader="Drop Off Time"
                    cabDetailValue="2:40 AM"
                  />
                </div>

                <div className="col-4 ">
                  <BookingDetailItem
                    cabDetailHeader="Driver Name"
                    cabDetailValue="Alfredo Carder"
                  />
                </div>

                <div className="col-4 ">
                  <BookingDetailItem
                    iconClass="fa-solid fa-phone"
                    cabDetailHeader="Driver Contact Number"
                    cabDetailValue="9768364732"
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
    </div>
  );
};

export default PortAgentInfo;
