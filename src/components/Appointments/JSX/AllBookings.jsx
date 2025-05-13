import React, { useEffect, useState } from "react";
import AllBooking from "../../AllBooking";
import TBox from "../../TBox";
import BookingTable from "./BookingTable";
import { useAppointments, useAuth } from "../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";

const AllBookings = () => {
  const {
    fetchAppointments,
    fetchAppointmentsForUser,
    fetchParams,
    setFetchParams,
  } = useAppointments();

  const navigate = useNavigate();

  const location = useLocation();
  const isFromDrDash = location.state?.fromDrDash;
  const date = location.state?.date;

  const [selectedDate, setSelectedDate] = useState(
    date || localStorage.getItem("selectedDate") || ""
  );

  const { authInfo } = useAuth();
  const { profile } = authInfo;

  const isDoctor = profile?.role === "Doctor";

  // Fetch appointments when component mounts
  useEffect(() => {
    // Reset filter to "All Appointments" when navigating back
    setFetchParams(prev => ({
      ...prev,
      selectedDate,
    }));

    if (profile?.id)
      isDoctor
        ? fetchAppointmentsForUser(
            "6818b6d439730375eb51ae11",
            fetchParams.pageNo,
            fetchParams.limit,
            "",
            selectedDate
          )
        : fetchAppointments(
            fetchParams.pageNo,
            fetchParams.limit,
            "",
            selectedDate
          ); // Fetch filtered appointments
  }, [selectedDate]);

  // Handle date selection from `TBox`
  const handleDateSelect = date => {
    setSelectedDate(date);
    // localStorage.setItem("selectedDate", date);

    setFetchParams(prev => ({
      ...prev,
      selectedDate: date, // Update global state
    }));

    if (profile?.id)
      isDoctor
        ? fetchAppointmentsForUser(
            profile?.id,
            fetchParams.pageNo,
            fetchParams.limit,
            "",
            date
          )
        : fetchAppointments(fetchParams.pageNo, fetchParams.limit, "", date); // Fetch appointments by date
  };

  return (
    <section id="appointment-table">
      {isFromDrDash && (
        <div className="booking-detail-header">
          <button
            className="back-btn"
            onClick={() => {
              localStorage.setItem("activeNav", "/auth/doctor-dashboard");
              navigate(-1);
            }}
            style={{ marginBottom: "10px" }}
          >
            <i class="fa-solid fa-arrow-left"></i> Back
          </button>
        </div>
      )}

      <div className="appointment-body">
        <TBox
          heading="All Bookings"
          showDateTime={true}
          onRefresh={() =>
            isDoctor
              ? fetchAppointmentsForUser(
                  profile?.id,
                  0,
                  fetchParams.limit,
                  "",
                  selectedDate
                )
              : fetchAppointments(0, fetchParams.limit, "", selectedDate)
          }
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        <BookingTable height="74vh" showAddCab={true} showReport={true} />
      </div>
    </section>
  );
};

export default AllBookings;
