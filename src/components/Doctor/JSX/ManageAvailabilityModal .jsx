import React, { useState } from "react";

const ManageAvailabilityModal = ({ isClosing, onClose }) => {
  const [availability, setAvailability] = useState({
    days: [],
    hours: "",
  });

  const handleDayChange = event => {
    const { value, checked } = event.target;
    setAvailability(prev => ({
      ...prev,
      days: checked
        ? [...prev.days, value]
        : prev.days.filter(day => day !== value),
    }));
  };

  const handleHourChange = event => {
    setAvailability({ ...availability, hours: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Availability:", availability);
    // Send data to backend (API call here)
    onClose(); // Close modal after saving
  };

  return (
    <div className={`box-modal ${isClosing ? "closing" : ""}`}>
      <div className="internal-modal">
        <h2>Manage Availability</h2>
        <form onSubmit={handleSubmit}>
          <label>Select Available Days:</label>
          <div className="days-selection">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map(day => (
              <label key={day}>
                <input
                  type="checkbox"
                  value={day}
                  onChange={handleDayChange}
                  checked={availability.days.includes(day)}
                />
                {day}
              </label>
            ))}
          </div>

          <label>Set Time Slot:</label>
          <input
            type="text"
            placeholder="e.g., 9:00 AM - 12:00 PM"
            value={availability.hours}
            onChange={handleHourChange}
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn cancel-btn">
              Cancel
            </button>
            <button type="submit" className="btn save-btn">
              Save Availability
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageAvailabilityModal;
