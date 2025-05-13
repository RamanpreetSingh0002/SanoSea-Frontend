import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../hooks";

const TBox = ({
  heading,
  showDateTime = false,
  onRefresh,
  selectedDate,
  onDateSelect,
}) => {
  // const [selectedDate, setSelectedDate] = useState("");
  // const [selectedTime, setSelectedTime] = useState("");

  const dateInputRef = useRef(null);
  // const timeInputRef = useRef(null);

  // const { fetchUsers } = useApi();

  // Show the date picker when clicking the calendar
  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // `showPicker` for modern browsers
    }
  };

  const formatDate = date => {
    const rawDate = new Date(date);
    const formattedDate = `${String(rawDate.getDate()).padStart(
      2,
      "0"
    )}/${String(rawDate.getMonth() + 1).padStart(
      2,
      "0"
    )}/${rawDate.getFullYear()}`;

    return formattedDate;
  };

  // Handle date change
  const handleDateChange = e => {
    const formattedDate = e.target.value;
    onDateSelect(formattedDate);
  };

  // Show the time picker programmatically
  // const openTimePicker = () => {
  //   if (timeInputRef.current) {
  //     timeInputRef.current.showPicker(); // Trigger the time picker
  //   }
  // };

  // Convert 24-hour time to 12-hour AM/PM format
  // const formatTimeTo12Hour = time => {
  //   const [hours, minutes] = time.split(":");
  //   const isAM = parseInt(hours) < 12;
  //   const formattedHours = (parseInt(hours) % 12 || 12)
  //     .toString()
  //     .padStart(2, "0");
  //   const period = isAM ? "AM" : "PM";
  //   return `${formattedHours}:${minutes} ${period}`;
  // };

  // Handle time selection and format to AM/PM
  // const handleTimeChange = e => {
  //   setSelectedTime(e.target.value); // Update state with formatted time
  // };

  return (
    <div class="all-booking-table">
      <h5>{heading}</h5>

      <div class="patient-booking-date-time">
        <div class="all-booking-date">
          {showDateTime && (
            <>
              <p>Date</p>

              <div
                class="all-booking-select-date-time"
                onClick={openDatePicker}
              >
                <p>
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "Select Date"}
                </p>

                <img
                  src="/images/icons8-calendar-30.png"
                  alt="calender"
                  style={{ cursor: "pointer" }}
                />

                {/* Hidden date input that triggers the calendar */}
                <input
                  ref={dateInputRef}
                  name="date"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  style={{
                    position: "absolute",
                    top: "5px", // Adjust to position below the parent div
                    left: "0px",
                    opacity: "0", // Hide the default styling
                    width: "112px",
                    height: "33px",
                  }}
                />
              </div>

              {/* <div
                class="all-booking-select-date-time"
                onClick={openTimePicker}
              >
                <p>
                  {selectedTime
                    ? formatTimeTo12Hour(selectedTime)
                    : "Select Time"}
                </p>

                <img
                  src="/images/icon-clock.png"
                  alt="clock"
                  style={{ cursor: "pointer" }}
                />

                {/* Hidden input for time picker *
                <input
                  ref={timeInputRef}
                  name="time"
                  type="time"
                  value={selectedTime} // Set the selected time as the current value
                  onChange={handleTimeChange}
                  style={{
                    position: "absolute",
                    top: "10px", // Adjust to position below the parent div
                    left: "0px",
                    opacity: "0",
                  }} // Hide the native input
                />
              </div> */}
            </>
          )}

          <div class="all-booking-refresh">
            <Link to="#" onClick={onRefresh}>
              Refresh
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TBox;
