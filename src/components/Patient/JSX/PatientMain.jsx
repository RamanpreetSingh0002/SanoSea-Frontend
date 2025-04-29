import React from "react";
import Card from "../../Card";
import AgentProfile from "../../AgentProfile";
import CabLocation from "../../CabLocation";
import TBox from "../../TBox";
import Table from "../../Table";
import AllBooking from "../../AllBooking";
import PatientTbody from "./PatientTbody";

const PatientMain = () => {
  return (
    <div>
      {/* <!-- three divs --> */}
      <section id="patient-section">
        <div class="patient-detail-section">
          <div class="row">
            <Card className="booking">
              <h6>Current Bookings</h6>
              <h4>
                Chest Pain Or Pressure And Pain That Radiates Pressure Pain Or
                Pressure
              </h4>
              <div class="patient-schedule">
                <div class="calender">
                  <img src="/images/icons8-calendar-30.png" alt="calender" />
                  <p>Feb07,2025</p>
                </div>
                <div class="timer">
                  {/* <!-- <i class="fa-regular fa-clock"></i> --> */}
                  <img src="/images/icon-clock.png" alt="clock" />
                  <p>11:40 AM</p>
                </div>
              </div>
            </Card>

            <Card className="booking">
              <h6>Your Doctor And Port Agent</h6>

              <div class="doctor-agent">
                <AgentProfile
                  image="/images/person-dummy.jpg"
                  name="Wilson Vaccaro"
                  role="Port Agent"
                />

                <AgentProfile
                  image="/images/person-dummy.jpg"
                  name="Jaydon Bator"
                  role="Doctor"
                />
              </div>
            </Card>

            <Card>
              <h6>Your Cab Detail</h6>
              <div class="patient-cab-location">
                <div class="cab-driver">
                  <div class="cab-driver-name">
                    <strong>Wilson Vaccaro</strong>
                    <p>Cab Driver</p>
                  </div>

                  <div class="cab-driver-time">
                    {/* <!-- <i class="fa-regular fa-clock"></i> --> */}
                    <img src="/images/icon-clock.png" alt="clock" />
                    <p>11:40 AM</p>
                  </div>
                </div>

                <div class="cab-location">
                  <CabLocation
                    address="R.AI-Ani, B.Zhou, Q,Shi,A.Sagheer"
                    type="Pickup"
                  />
                  <CabLocation
                    address="M. Arif, G. Wang, T.Peng"
                    type="Drop Off"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <AllBooking>
        <TBox heading="All Bookings" showDateTime={true} />

        {/* table */}

        <Table isPatient={true}>
          <PatientTbody />
        </Table>
      </AllBooking>
    </div>
  );
};

export default PatientMain;
