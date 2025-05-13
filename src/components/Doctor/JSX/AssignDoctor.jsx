import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { fetchDoctorsBySpeciality } from "../../../api/user";
import { assignDoctorToAppointment } from "../../../api/appointment";
import { useAddDoctor, useAppointments, useNotification } from "../../../hooks";

import DropdownSelect from "../../DropdownSelect";

import "../Style/AssignDoctor.css";

const AssignDoctor = () => {
  const { isOpen, isClosing, handleClose, selectedAppointment } =
    useAddDoctor();
  const { fetchAppointments, fetchParams } = useAppointments();

  const [busy, setBusy] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const { updateNotification } = useNotification();

  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  const handleDropdownChange = selectedDoctor => {
    console.log(selectedDoctor);
    // Extract doctorId from selected doctor option
    const selectedDoctorObj = doctors.find(
      doctor =>
        `${doctor?.userId?.fullName} (${doctor?.userId?.email})` ===
        selectedDoctor
    );

    setSelectedDoctorId(selectedDoctorObj?.userId?._id || null);
  };

  // Fetch doctors based on appointment speciality
  useEffect(() => {
    if (!selectedAppointment) return;

    const fetchDoctors = async () => {
      const response = await fetchDoctorsBySpeciality(
        selectedAppointment?.doctorSpeciality
      );
      if (!response.error) setDoctors(response.doctors);
    };

    fetchDoctors();
  }, [selectedAppointment]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedDoctorId)
      return updateNotification("error", "Please select a doctor!");

    setBusy(true);
    const response = await assignDoctorToAppointment(
      selectedAppointment._id,
      selectedDoctorId
    );
    setBusy(false);

    if (response.error) return updateNotification("error", response.error);

    updateNotification("success", "Doctor assigned successfully!");
    handleClose(); // Close modal after assignment
    fetchAppointments(
      fetchParams.pageNo,
      fetchParams.limit,
      fetchParams.state,
      fetchParams.selectedDate
    );
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

  if (!isOpen) return null;

  return (
    <div className="box-overlay">
      <div className={`box-modal ${isClosing ? "closing" : ""}`}>
        <div className="internal-modal">
          <div className="box-heading">
            <h2>Assign Doctor</h2>
          </div>

          <form onSubmit={!busy ? handleSubmit : null}>
            <div className="patient-profile">
              <div className="patient-img">
                <img
                  src={
                    selectedAppointment?.patientId?.profilePhoto?.url ||
                    "/images/user.png"
                  }
                  alt="person"
                />
              </div>

              <div className="patient-info">
                <h5>{selectedAppointment?.patientId?.fullName}</h5>
                <p>Patient</p>
              </div>
            </div>

            <div className="appointment-reason">
              <h3>{selectedAppointment?.reason}</h3>
            </div>

            <div className="app-date-time">
              <div className="patient-info-date-time">
                <div>
                  <img src="/images/icons8-calendar-30.png" alt="calender" />
                </div>
                <p>
                  {new Date(
                    selectedAppointment?.dateOfAppointment
                  ).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="patient-info-date-time">
                <div>
                  <img src="/images/icon-clock.png" alt="clock" />
                </div>
                <p>11:40 AM</p>
              </div>
            </div>

            <div className="dr-speciality">
              <h6>Doctor Speciality</h6>
              <p>{selectedAppointment?.doctorSpeciality}</p>
            </div>

            {/* Doctor selection */}
            <div className="form_field">
              <label for="doctor">Allocate Doctor</label>
              <DropdownSelect
                id="doctor"
                // defaultClass="default-value"
                defaultValue={`Select ${selectedAppointment?.doctorSpeciality} Doctor`}
                options={doctors.map(
                  doctor =>
                    `${doctor?.userId?.fullName} (${doctor?.userId?.email})`
                )}
                index={0} // Unique index for tracking
                activeDropdownIndex={activeDropdownIndex}
                setActiveDropdownIndex={setActiveDropdownIndex}
                // value={formData.doctorSpeciality}
                onChange={handleDropdownChange}
              />
            </div>

            {/* Buttons  */}
            <div className="box-buttons mt-3">
              <button
                type="button"
                className="btn cancel-btn"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button type="submit" className="btn save-btn">
                {busy ? <ImSpinner3 className="animate-spin" /> : "Assign"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignDoctor;
