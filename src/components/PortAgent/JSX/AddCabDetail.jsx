import React from "react";
import FormField from "../../Form/FormField";

const AddCabDetail = ({ isClosing, onClose, width }) => {
  return (
    <div className={`box-modal ${isClosing ? "closing" : ""}`}>
      <div className="internal-modal">
        <div className="box-heading">
          <h2>Add Cab Details</h2>
        </div>

        {/* Form Submission */}
        {/* onSubmit={!busy ? handleSubmit : null} */}
        <form>
          <div className="row">
            <div className="col-12">
              {/* First Name Field */}
              <FormField
                // value={firstName}
                // onChange={handleChange}
                name="cabNumber"
                label="Cab Number"
                placeholder="Enter Cab Number"
                type="text"
              />
            </div>

            <div className="col-12">
              {/* First Name Field */}
              <FormField
                // value={firstName}
                // onChange={handleChange}
                name="driverName"
                label="Driver Name"
                placeholder="Enter Driver Name"
                type="text"
              />
            </div>

            <div className="col-12">
              {/* First Name Field */}
              <FormField
                // value={firstName}
                // onChange={handleChange}
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter Phone Number"
                iconClass="fa-solid fa-phone"
                type="text"
              />
            </div>

            <div className="col-6">
              {/* First Name Field */}
              <FormField
                // value={firstName}
                // onChange={handleChange}
                name="pickupTime"
                label="Pickup Time"
                placeholder="Select Time"
                iconClass="fa-solid fa-clock"
              />
            </div>
            <div className="col-6">
              {/* First Name Field */}
              <FormField
                // value={firstName}
                // onChange={handleChange}
                name="dropoffTime"
                label="Drop Off Time"
                placeholder="Select Time"
                iconClass="fa-solid fa-clock"
              />
            </div>

            <div className="col-12">
              {/* First Name Field */}
              <FormField
                // value={firstName}
                // onChange={handleChange}
                name="pickupLocation"
                label="Pickup Location"
                placeholder="Enter Pickup Location"
                iconClass="fa-solid fa-location-dot"
                type="text"
              />
            </div>

            <div className="col-12">
              {/* First Name Field */}
              <FormField
                // value={firstName}
                // onChange={handleChange}
                name="dropoffLocation"
                label="Drop Off Location"
                placeholder="Enter Drop Off Location"
                iconClass="fa-solid fa-location-dot"
                type="text"
              />
            </div>

            <div className="col-12">
              <div className="box-buttons mt-3">
                <button
                  type="button"
                  className="btn cancel-btn"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn add-btn"
                  style={{ width: width }}
                >
                  Add Cab Details
                  {/* {busy ? (
                    <ImSpinner3 className="animate-spin" />
                  ) : (
                    "Add Car Details"
                  )} */}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCabDetail;
