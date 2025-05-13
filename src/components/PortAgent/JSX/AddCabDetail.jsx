import React, { useRef, useState } from "react";
import FormField from "../../Form/FormField";
import { useAddCab, useAppointments, useNotification } from "../../../hooks";
import { addCabDetails } from "../../../api/cab";
import { ImSpinner3 } from "react-icons/im";
import { formatTime } from "../../../utils/helper";

const AddCabDetail = () => {
  const { isOpen, isClosing, handleClose, selectedAppointment } = useAddCab();
  const [cabData, setCabData] = useState({});
  const [busy, setBusy] = useState(false);

  const [selectedPickupTime, setSelectedPickupTime] = useState("");
  const [selectedDropOffTime, setSelectedDropOffTime] = useState("");

  const pickupTimeRef = useRef(null);
  const dropOffTimeRef = useRef(null);

  const { fetchTodayAppointments, fetchParams } = useAppointments();
  const { updateNotification } = useNotification();

  if (!isOpen) return null;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setCabData(prev => ({ ...prev, [name]: value }));

    if (name === "pickupTime") setSelectedPickupTime(formatTime(value));
    if (name === "dropOffTime") setSelectedDropOffTime(formatTime(value));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setBusy(true);
    const response = await addCabDetails(selectedAppointment._id, cabData);
    setBusy(false);

    if (response.error) return updateNotification("error", response.error);

    updateNotification("success", "Doctor assigned successfully!");
    handleClose();
    setCabData({});
    fetchTodayAppointments(fetchParams.pageNo, fetchParams.limit);
  };

  return (
    <div className="box-overlay">
      <div className={`box-modal ${isClosing ? "closing" : ""}`}>
        <div className="internal-modal">
          <div className="box-heading">
            <h2>Add Cab Details</h2>
          </div>

          {/* Form Submission */}
          <form onSubmit={!busy ? handleSubmit : null}>
            <div className="row">
              <div className="col-12">
                <FormField
                  name="cabNumber"
                  label="Cab Number"
                  placeholder="Enter Cab Number"
                  type="text"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <FormField
                  name="driverName"
                  label="Driver Name"
                  placeholder="Enter Driver Name"
                  type="text"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <FormField
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  iconClass="fa-phone"
                  type="tel"
                  onChange={handleChange}
                />
              </div>

              <div className="col-6">
                <div className="form_field">
                  <label htmlFor="pickupTime">Pickup Time</label>
                  <div
                    style={{ position: "relative" }}
                    onClick={() => pickupTimeRef.current.showPicker()}
                  >
                    <input
                      id="pickupTime"
                      placeholder="Select Pickup Time"
                      value={selectedPickupTime}
                    />

                    <input
                      ref={pickupTimeRef}
                      name="pickupTime"
                      type="time"
                      onChange={handleChange}
                      value={cabData?.pickupTime}
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        opacity: "0",
                      }} // Hide the native input
                    />
                  </div>
                  <i className={"fa-solid icon fa-clock"}></i>
                </div>
              </div>

              <div className="col-6">
                <div className="form_field">
                  <label htmlFor="dropOffTime">Drop Off Time</label>
                  <div
                    style={{ position: "relative" }}
                    onClick={() => dropOffTimeRef.current.showPicker()}
                  >
                    <input
                      id="dropOffTime"
                      placeholder="Select Drop Off Time"
                      value={selectedDropOffTime}
                    />

                    <input
                      ref={dropOffTimeRef}
                      name="dropOffTime"
                      type="time"
                      value={cabData?.dropOffTime}
                      onChange={handleChange}
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        opacity: "0",
                      }} // Hide the native input
                    />
                  </div>
                  <i className={"fa-solid icon fa-clock"}></i>
                </div>
              </div>

              <div className="col-12">
                <FormField
                  name="pickupLocation"
                  label="Pickup Location"
                  placeholder="Enter Pickup Location"
                  iconClass="fa-location-dot"
                  type="text"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <FormField
                  name="dropOffLocation"
                  label="Drop Off Location"
                  placeholder="Enter Drop Off Location"
                  iconClass="fa-location-dot"
                  type="text"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <div className="box-buttons mt-3">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setCabData({});
                      handleClose();
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn add-btn"
                    style={{ width: "136px" }}
                  >
                    {busy ? (
                      <ImSpinner3 className="animate-spin" />
                    ) : (
                      "Add Cab Details"
                    )}
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

export default AddCabDetail;
