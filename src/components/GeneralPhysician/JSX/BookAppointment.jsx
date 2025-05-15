import React, { useEffect, useState } from "react";

import { useBooking, useNotification } from "../../../hooks";
import FormField from "../../Form/FormField";
import DropdownSelect from "../../DropdownSelect";

import { bookAppointment } from "../../../api/appointment";
import { ImSpinner3 } from "react-icons/im";
import { useDebounce } from "../../../utils/helper";

import "../Style/BoxModal.css";
import { fetchPatientsByName } from "../../../api/user";

const defaultInfo = {
  fullName: "",
  email: "",
  dateOfAppointment: "",
  timeOfAppointment: "",
  doctorSpeciality: "",
  reason: "",
};

const BookAppointment = () => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState({ ...defaultInfo });
  const [searchQuery, setSearchQuery] = useState("");
  const [patientOptions, setPatientOptions] = useState([]); // Stores fetched patients
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { isBookingOpen, isClosing, handleCloseBooking } = useBooking();
  const { updateNotification } = useNotification();

  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  // Handles dropdown role selection
  const handleDropdownChange = selectedSpeciality => {
    setFormData(prev => ({ ...prev, doctorSpeciality: selectedSpeciality }));
  };

  // Fetch patients when search query updates
  useEffect(() => {
    if (!debouncedSearch) {
      setPatientOptions([]); // Clear list when input is empty
      return;
    }

    const fetchPatients = async () => {
      const response = await fetchPatientsByName(debouncedSearch);
      setPatientOptions(response?.patients);
    };

    fetchPatients();
  }, [debouncedSearch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "fullName") {
      setSearchQuery(value); // Set search query for patient lookup

      if (value.trim() === "") {
        setPatientOptions([]); // Clear dropdown when input is empty
        setActiveDropdownIndex(null); // Close dropdown
      } else {
        setActiveDropdownIndex(0); // Open dropdown automatically if text exists
      }
    }
  };

  const handleSelectPatient = selectedPatient => {
    setFormData(prev => ({
      ...prev,
      fullName: selectedPatient.fullName,
      email: selectedPatient.email,
    }));

    setSearchQuery(""); // Clear search field after selection
    setPatientOptions([]); // Hide dropdown
    setActiveDropdownIndex(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setBusy(true);
    const response = await bookAppointment(formData);
    setBusy(false);

    if (response.error) return updateNotification("error", response.error);

    updateNotification("success", response.message);

    handleCloseBooking(); // Close modal after booking
    setFormData({ ...defaultInfo });
  };

  const handleClose = () => {
    handleCloseBooking();
    setFormData({ ...defaultInfo }); // Reset form fields
    setSearchQuery(""); // Clear search query
    setPatientOptions([]); // Clear patient options
    setActiveDropdownIndex(null); // Close dropdown
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

  if (!isBookingOpen) return null;

  return (
    <div className="box-overlay">
      <div className={`box-modal ${isClosing ? "closing" : ""}`}>
        <div className="internal-modal">
          <div className="box-heading">
            <h2>Booking Appointment</h2>
          </div>

          <form onSubmit={!busy ? handleSubmit : null}>
            <div className="row">
              <div className="col-12">
                <div className="form_field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    placeholder="Full name"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                  />

                  {/* Dropdown for patient selection */}
                  {patientOptions?.length > 0 && (
                    <DropdownSelect
                      // defaultClass="default-value"
                      // defaultValue="Select Doctor Speciality"
                      patientSelect={true}
                      options={patientOptions.map(
                        patient => `${patient?.fullName} (${patient?.email})`
                      )}
                      index={0} // Unique index for tracking
                      activeDropdownIndex={activeDropdownIndex}
                      setActiveDropdownIndex={setActiveDropdownIndex}
                      onChange={selectedOption => {
                        const selectedPatient = patientOptions.find(
                          patient =>
                            `${patient?.fullName} (${patient?.email})` ===
                            selectedOption
                        );
                        handleSelectPatient(selectedPatient);
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="col-12">
                <FormField
                  name="email"
                  label="Email ID"
                  placeholder="Email ID"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <div className="form_field">
                  <label for="date">Select Date</label>
                  <input
                    name="dateOfAppointment"
                    type="date"
                    id="date"
                    value={formData.dateOfAppointment}
                    onChange={handleChange}
                    className={formData.dateOfAppointment ? "filled" : "empty"}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form_field">
                  <label for="time">Select Time</label>
                  <input
                    name="timeOfAppointment"
                    type="time"
                    id="time"
                    value={formData.timeOfAppointment}
                    onChange={handleChange}
                    className={formData.timeOfAppointment ? "filled" : "empty"}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="form_field">
                  <label for="doctorSpeciality">Doctor Speciality</label>
                  <DropdownSelect
                    id="doctorSpeciality"
                    // defaultClass="default-value"
                    defaultValue="Select Doctor Speciality"
                    options={[
                      "Cardiologist",
                      "Orthopedic Surgeon",
                      "ENT Specialist (Otolaryngologist)",
                      "Psychiatrist",
                      "Surgeon (General)",
                      "Infectious Disease Specialist",
                    ]}
                    index={1} // Unique index for tracking
                    activeDropdownIndex={activeDropdownIndex}
                    setActiveDropdownIndex={setActiveDropdownIndex}
                    // value={formData.doctorSpeciality}
                    onChange={handleDropdownChange}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label for="reason">Mention The Reason Consultation</label>

                  <textarea
                    name="reason"
                    id="reason"
                    className="form-control"
                    rows="3"
                    value={formData.reason}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="col-12">
                <div className="box-buttons">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn save-btn">
                    {busy ? <ImSpinner3 className="animate-spin" /> : "Book"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
