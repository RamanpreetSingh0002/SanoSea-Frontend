import React from "react";
import { ImSpinner3 } from "react-icons/im";
import TBox from "../../TBox";
import BookingTBody from "./BookingTBody";
import { useAppointments } from "../../../hooks";
import AppointmentPagination from "./AppointmentPagination";

const BookingTable = () => {
  const { appointments, busy } = useAppointments();

  return (
    <div style={{ position: "relative", height: "80.6vh" }}>
      <TBox heading="All Appointments" showDateTime={true} />

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
        <h6>No Appointments Found</h6>
      ) : (
        <>
          <table className="sub-admin-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Problem</th>
                {/* <th>Time</th> */}
                <th>Date</th>
                <th>Email</th>
                <th>Report</th>
                <th colSpan="2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appointment, index) => (
                <BookingTBody key={index} appointment={appointment} />
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

export default BookingTable;
