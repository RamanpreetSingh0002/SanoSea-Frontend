import React from "react";
import { ImSpinner3 } from "react-icons/im";
import { useAppointments, useAuth } from "../../../hooks";
import { formatDate, formatTime } from "../../../utils/helper";
import BookingTBody from "./BookingTBody.jsx";
import AppointmentPagination from "./AppointmentPagination.jsx";
import { useLocation } from "react-router-dom";
import TodayBookingPagination from "./TodayBookingPagination.jsx";

const BookingTable = ({
  height,
  isToday = false,
  showAddCab = false,
  showReason = false,
  showReport = false,
  showEmail = false,
}) => {
  const { appointments, busy } = useAppointments();

  const { authInfo } = useAuth();
  const { profile } = authInfo;

  const isPortAgent = profile?.role === "Port Agent";
  const isPatient = profile?.role === "Patient";
  const isDoctor = profile?.role === "Doctor";

  return (
    <div style={{ position: "relative", height: height }}>
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
        <h6 style={{ textAlign: "center", padding: "15px" }}>
          No Appointments Found
        </h6>
      ) : (
        <>
          <table className="sub-admin-table">
            <thead>
              <tr>
                {!isPatient && <th>Patients</th>}
                {!isDoctor && <th>Doctor Assigned</th>}
                {!isPortAgent && <th>Port Agent</th>}
                {isPortAgent && <th>Coordinator</th>}
                {showReason && <th>Reason</th>}
                <th>Time</th>
                <th>Date</th>
                {showEmail && <th>Email</th>}
                {showReport && <th>Report</th>}
                <th>Status</th>
                {isPortAgent && showAddCab && <th></th>}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appointment, index) => (
                <BookingTBody
                  key={index}
                  appointment={appointment}
                  isPatient={isPatient}
                  isPortAgent={isPortAgent}
                  isDoctor={isDoctor}
                  showAddCab={showAddCab}
                  showReport={showReport}
                />
              ))}
            </tbody>
          </table>

          {isToday ? <TodayBookingPagination /> : <AppointmentPagination />}
        </>
      )}
    </div>
  );
};

export default BookingTable;
