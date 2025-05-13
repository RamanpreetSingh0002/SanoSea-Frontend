import React, { useEffect, useState } from "react";
import "../Style/AppointmentCalender.css";
import { fetchDoctorAppointmentsByMonth } from "../../../api/appointment";
import { Link } from "react-router-dom";
import TBox from "../../TBox";
import { ImSpinner3 } from "react-icons/im";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dummyEvents = [
  {
    id: 1,
    title: "Doctor Visit",
    date: "2025-05-05",
    description: "General checkup",
  },
  {
    id: 2,
    title: "Meeting with Patient",
    date: "2025-05-12",
    description: "Discuss reports",
  },
  {
    id: 3,
    title: "Surgery Follow-up",
    date: "2025-05-12",
    description: "Post-op consultation",
  },
];

const AppointmentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [busy, setBusy] = useState(false);
  const [appointmentsByDate, setAppointmentsByDate] = useState({});

  const handleMonthChange = offset => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const getFormattedDate = date => {
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ); // Convert to local time before formatting
    return localDate.toISOString().split("T")[0];
  };

  const getEventsForDate = date => {
    const formattedDate = getFormattedDate(date);
    return appointmentsByDate[formattedDate] || 0;
  };

  const fetchAppointments = async () => {
    const month = currentDate.getMonth() + 1; // Convert to 1-based month index
    const year = currentDate.getFullYear();

    setBusy(true);
    const response = await fetchDoctorAppointmentsByMonth(month, year);
    setBusy(false);

    setAppointmentsByDate(response?.appointmentsByDate || {}); // Store fetched counts
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentDate]);

  const buildCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const firstDayIndex = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const prevMonthDays = prevLastDay.getDate();

    const grid = [];

    // Previous month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      grid.push({ date, currentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      grid.push({ date, currentMonth: true });
    }

    // Add next month days to fill the last row (if needed)
    const totalCells = grid.length;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
      for (let i = 1; i <= remainingCells; i++) {
        const date = new Date(year, month + 1, i);
        grid.push({ date, currentMonth: false });
      }
    }

    return grid;
  };

  const calendarDays = buildCalendarGrid();

  return (
    <div className="calendar-container">
      <div className="calendar-top-header">
        <div className="calendar-header">
          <h1>Appointments</h1>
          <h3>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
        </div>

        <div className="calendar-nav">
          <div className="nxt-prv-btns">
            <button onClick={() => handleMonthChange(-1)}>
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button onClick={() => handleMonthChange(1)}>
              <i class="fa-solid fa-angle-right"></i>
            </button>
          </div>

          <div class="all-booking-refresh">
            <Link
              to="#"
              onClick={() => fetchAppointments()}
              style={{
                width: "82px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {busy ? <ImSpinner3 className="animate-spin" /> : "Refresh"}
            </Link>
          </div>
        </div>
      </div>

      <div className="calendar-weekdays">
        {weekdays.map(day => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-days">
        {calendarDays.map(({ date, currentMonth }, idx) => {
          // const events = getEventsForDate(date);
          // const hasEvents = events.length > 0;

          const appointmentCount = getEventsForDate(date);
          const hasAppointments = appointmentCount > 0;

          return (
            <div
              key={idx}
              className={`day-cell ${currentMonth ? "" : "disabled-cell"} ${
                hasAppointments ? "has-appointments" : ""
              }`}
            >
              <div className="date-header">
                <span
                  className={`date-number ${hasAppointments ? "bold" : ""}`}
                >
                  {date.getDate()}
                </span>
                {hasAppointments && (
                  <span className="appointment-count">{appointmentCount}</span>
                )}
              </div>
              {hasAppointments && (
                <>
                  {console.log(getFormattedDate(date))}

                  <div className="appointment-label">Appointments</div>
                  <Link
                    onClick={() =>
                      localStorage.setItem("activeNav", "/auth/all-appointment")
                    }
                    to="/auth/all-appointment"
                    state={{ date: getFormattedDate(date), fromDrDash: true }}
                    className="view-details"
                  >
                    <span>View Details</span>{" "}
                    <i class="fa-solid fa-angle-right"></i>
                  </Link>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
