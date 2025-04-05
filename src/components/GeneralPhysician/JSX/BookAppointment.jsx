import React, { useState } from "react";

import "../Style/BookAppointment.css";

const BookAppointment = ({ isClosing, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    doctorSpeciality: "",
  });

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className={`booking-modal ${isClosing ? "closing" : ""}`}>
      <div className="Appointments">
        <div className="Booking">
          <h2>Booking Appointment</h2>
        </div>

        <form>
          <div className="row">
            <div className="col-12">
              <div className="patient-name">
                <label for="name">Patient Name</label>
                <input type="Name" id="name" placeholder="Patient Name" />
              </div>
            </div>

            <div className="col-12">
              <div className="patient-email">
                <label for="email">Email ID</label>
                <input type="email" id="email" placeholder="Email ID" />
              </div>
            </div>

            <div className="col-12">
              <div className="phone-number">
                <label for="phoneNumber">Phone Number </label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="col-md-6">
              <label for="date">Select Date</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className={formData.date ? "filled" : "empty"}
              />
            </div>

            <div className="col-md-6">
              <label for="time">Select Time</label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className={formData.time ? "filled" : "empty"}
              />
            </div>

            <div className="col-12">
              <label for="doctorSpeciality">Doctor Speciality</label>
              <select
                id="doctorSpeciality"
                value={formData.doctorSpeciality}
                onChange={handleChange}
                className={`form-select ${
                  formData.doctorSpeciality ? "filled" : "empty"
                }`}
              >
                <option selected>Select Doctor Speciality</option>
                <option value="1">Emergency Medicine Specialist</option>
                <option value="2">Cardiologist</option>
                <option value="3">Pulmonologist (Lung Specialist)</option>
                <option value="4">
                  Orthopedic Specialist (Lung Specialist)
                </option>
                <option value="5">Neurologist</option>
                <option value="6">Gastroenterologist</option>
              </select>
            </div>

            <div className="mb-3">
              <label for="exampleFormControlTextarea1">
                Mention The Reason Consultation
              </label>

              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>

            <div className="booking-buttons">
              <button
                type="button"
                className="btn cancel-btn"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="button" className="btn save-btn">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
