import React, { useEffect, useState } from "react";

import FormField from "../../Form/FormField";
import DropdownSelect from "../../DropdownSelect";

import "../Style/BoxModal.css";

const BookAppointment = ({ isClosing, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    doctorSpeciality: "",
  });

  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null); // Track dropdown globally

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (!event.target.closest(".select-menu")) {
        setActiveDropdownIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`box-modal ${isClosing ? "closing" : ""}`}>
      <div className="internal-modal">
        <div className="box-heading">
          <h2>Booking Appointment</h2>
        </div>

        <form>
          <div className="row">
            <div className="col-12">
              <FormField
                // value={firstName}
                // onChange={handleChange}
                name="firstName"
                label="First Name"
                placeholder="First name"
                type="text"
              />
            </div>

            <div className="col-12">
              <FormField
                // value={firstName}
                // onChange={handleChange}
                name="lastName"
                label="Last Name"
                placeholder="Last name"
                type="text"
              />
            </div>

            <div className="col-12">
              <FormField
                // value={firstName}
                // onChange={handleChange}
                name="email"
                label="Email ID"
                placeholder="Email ID"
                type="email"
              />
            </div>

            <div className="col-12">
              <FormField
                // value={firstName}
                // onChange={handleChange}
                name="phoneNumber"
                label="Phone Number"
                placeholder="Phone Number"
                type="tel"
              />
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
              <div className="form_field">
                <label for="doctorSpeciality">Doctor Speciality</label>
                <DropdownSelect
                  id="doctorSpeciality"
                  // defaultClass="default-value"
                  defaultValue="Select Doctor Speciality"
                  options={[
                    "Emergency Medicine Specialist",
                    "Cardiologist",
                    "Pulmonologist (Lung Specialist)",
                    "Orthopedic Specialist (Lung Specialist)",
                    "Neurologist",
                    "Gastroenterologist",
                  ]}
                  index={0} // Unique index for tracking
                  activeDropdownIndex={activeDropdownIndex}
                  setActiveDropdownIndex={setActiveDropdownIndex}
                  //   includeLabel={true} // shows "Select State" label
                  //   onChange={handleDropdownChange}
                />
              </div>
            </div>

            <div className="col-12">
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
            </div>

            <div className="col-12">
              <div className="box-buttons">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
