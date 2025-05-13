import React from "react";
import { ImSpinner3 } from "react-icons/im";
import TBox from "../../TBox";
import { useAppointments, useAuth } from "../../../hooks";
import AppointmentPagination from "./AppointmentPagination";
import { useLocation } from "react-router-dom";
import AppointmentTBody from "./AppointmentTBody";

const AppointmentBookingTable = ({ onRefresh, selectedDate, onDateSelect }) => {
  const { appointments, fetchParams, busy } = useAppointments();

  const { authInfo } = useAuth();
  const { profile } = authInfo;
  const isCoordinator = profile?.role === "Coordinator";

  const isWaiting = fetchParams.state === "Waiting";
  const isUpcoming = fetchParams.state === "Upcoming";

  const location = useLocation();
  const isAppointmentPage = location.pathname === "/auth/appointments";

  const showAddDoctor =
    isCoordinator && isAppointmentPage && isWaiting ? true : false;
  const showReport =
    fetchParams.state === "" || fetchParams.state === "Complete";
  const showCancel = isAppointmentPage && (isWaiting || isUpcoming);

  return (
    <div style={{ position: "relative", height: "80.6vh" }}>
      <TBox
        heading={`${
          fetchParams?.state
            ? fetchParams?.state === "Waiting"
              ? "Unconfirmed"
              : fetchParams?.state
            : "All"
        } Appointments`}
        showDateTime={true}
        onRefresh={onRefresh}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
      />

      {/* table */}
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
                <th>Patient Name</th>
                <th>Problem</th>
                <th>Time</th>
                <th>Date</th>
                <th>Email</th>
                {showReport && <th>Report</th>}
                <th>Status</th>
                {showAddDoctor && <th> Assign</th>}
                <th></th>
                {showCancel && <th></th>}
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appointment, index) => (
                <AppointmentTBody
                  key={index}
                  appointment={appointment}
                  showAddDoctor={showAddDoctor}
                  showReport={showReport}
                  showCancel={showCancel}
                />
              ))}
            </tbody>
            {/* <tfoot>
            <tr>
              <td colSpan="8">
                
              </td>
            </tr>
          </tfoot> */}
          </table>
          {!busy && appointments && appointments?.length > 0 && (
            <AppointmentPagination />
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentBookingTable;
