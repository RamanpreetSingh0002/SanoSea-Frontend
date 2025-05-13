import React, { useEffect, useState } from "react";

import { useAppointments, useAuth } from "../../../hooks";

import Card from "../../Card";
import AgentProfile from "../../AgentProfile";
import CabLocation from "../../CabLocation";
import "../Style/PatientDashboard.css";
import AllBooking from "../../AllBooking";
import TBox from "../../TBox";
import BookingTable from "../../Appointments/JSX/BookingTable";
import { fetchCurrentBooking } from "../../../api/appointment";
import { formatDate, formatTime } from "../../../utils/helper";
import { ImSpinner3 } from "react-icons/im";

const PatientDashboard = () => {
  const { fetchAppointmentsForUser, fetchParams, setFetchParams } =
    useAppointments();
  const [currBooking, setCurrBooking] = useState(null);
  const [busy, setBusy] = useState(false);

  console.log(currBooking);

  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem("selectedDate") || ""
  );

  const { authInfo } = useAuth();
  const { profile } = authInfo;

  // Fetch appointments when component mounts
  useEffect(() => {
    // Reset filter to "All Appointments" when navigating back
    setFetchParams(prev => ({
      ...prev,
      selectedDate: selectedDate,
    }));

    if (profile?.id)
      fetchAppointmentsForUser(
        profile?.id,
        fetchParams.pageNo,
        fetchParams.limit,
        "",
        selectedDate
      );
  }, [profile?.id, selectedDate]);

  // Handle date selection from `TBox`
  const handleDateSelect = date => {
    setSelectedDate(date);
    // localStorage.setItem("selectedDate", date);

    setFetchParams(prev => ({
      ...prev,
      selectedDate: date, // Update global state
    }));

    if (profile?.id)
      fetchAppointmentsForUser(
        profile?.id,
        fetchParams.pageNo,
        fetchParams.limit,
        "",
        date
      );
  };
  console.log(currBooking);

  useEffect(() => {
    const currentBooking = async () => {
      // if (!profile?.id) return;

      setBusy(true);
      const response = await fetchCurrentBooking(profile?.id);
      setBusy(false);
      console.log(response);

      if (!response.error) setCurrBooking(response.appointment);
    };

    if (profile?.id) currentBooking();
  }, [profile?.id]);

  return (
    <main id="main">
      {/* <!-- three divs --> */}
      <section id="patient-section">
        <div class="row">
          <Card className="booking">
            <h6>Current Bookings</h6>

            {busy || !profile?.id ? (
              <div
                style={{
                  height: "148px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <ImSpinner3 className="animate-spin" />
                <div className="loading-text">
                  Loading
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </div>
              </div>
            ) : !currBooking ? (
              <div
                style={{
                  height: "148px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "none",
                }}
                className="no-available"
              >
                No Current Booking
              </div>
            ) : (
              <>
                <h4>
                  {currBooking?.reason
                    ? currBooking?.reason
                    : "No Reason Provided"}
                </h4>
                <div class="patient-schedule">
                  {currBooking?.date && (
                    <div class="calender">
                      <img
                        src="/images/icons8-calendar-30.png"
                        alt="calender"
                      />
                      <p>{formatDate(currBooking?.date)}</p>
                    </div>
                  )}
                  {currBooking?.time && (
                    <div class="timer">
                      {/* <!-- <i class="fa-regular fa-clock"></i> --> */}
                      <img src="/images/icon-clock.png" alt="clock" />
                      <p>{formatTime(currBooking?.time)}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </Card>

          <Card className="booking">
            <h6>Your Doctor And Port Agent</h6>

            <div
              style={{
                height: "148px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
              }}
            >
              {busy || !profile?.id ? (
                <div
                  style={{
                    height: "148px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <ImSpinner3 className="animate-spin" />
                  <div className="loading-text">
                    Loading
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </div>
                </div>
              ) : (
                <div class="doctor-agent">
                  {!currBooking?.portAgent ? (
                    <div className="doctor-agent-card">
                      <p className="no-available">No Port Agent Available</p>
                    </div>
                  ) : (
                    <>
                      <AgentProfile user={currBooking?.portAgent} />
                    </>
                  )}

                  {!currBooking?.doctor ? (
                    <div className="doctor-agent-card">
                      <p className="no-available">No Doctor Available</p>
                    </div>
                  ) : (
                    <>
                      <AgentProfile user={currBooking?.doctor} />
                    </>
                  )}
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h6>Your Cab Detail</h6>

            {busy || !profile?.id ? (
              <div
                style={{
                  height: "148px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <ImSpinner3 className="animate-spin" />
                <div className="loading-text">
                  Loading
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </div>
              </div>
            ) : currBooking?.cabDetails ? (
              <div class="patient-cab-location">
                <div class="cab-driver">
                  <div class="cab-driver-name">
                    <strong>{currBooking?.cabDetails?.driverName}</strong>
                    <p>Cab Driver</p>
                  </div>

                  <div class="cab-driver-time">
                    <img src="/images/icon-clock.png" alt="clock" />
                    <p>{formatTime(currBooking?.pickupTime)}</p>
                  </div>
                </div>

                <div class="cab-location">
                  <CabLocation
                    address={currBooking?.cabDetails?.pickupLocation}
                    type="Pickup"
                  />
                  <CabLocation
                    address={currBooking?.cabDetails?.dropOffLocation}
                    type="Drop Off"
                  />
                </div>
              </div>
            ) : (
              <div
                style={{
                  height: "148px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "none",
                }}
                className="no-available"
              >
                No Cab Assigned Yet
              </div>
            )}
          </Card>
        </div>
      </section>

      <AllBooking>
        <TBox
          heading="All Bookings"
          onRefresh={() =>
            fetchAppointmentsForUser(
              profile?.id,
              0,
              fetchParams.limit,
              "",
              selectedDate
            )
          }
          showDateTime={true}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        <BookingTable height="58vh" showAddCab={true} showReport={true} />
      </AllBooking>
    </main>
  );
};

export default PatientDashboard;
