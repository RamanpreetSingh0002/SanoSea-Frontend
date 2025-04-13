import React, { useState } from "react";

// import "../Style/BoxModal.css";
import FormField from "../../Form/FormField";
import DropdownSelect from "../../DropdownSelect";

const AddDoctor = ({ isClosing, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    doctorSpeciality: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className={`box-modal ${isClosing ? "closing" : ""}`}>
      <div className="internal-modal">
        <div className="box-heading">
          <h2>Add New Doctor</h2>
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

            <div className="col-12">
              <div className="form_field mb-3">
                <label>Doctor Type</label>
                <DropdownSelect
                  defaultClass="default-value"
                  defaultValue="Select Doctor Type"
                  options={[
                    "Emergency Medicine Specialist",
                    "Cardiologist",
                    "Pulmonologist (Lung Specialist)",
                    "Orthopedic Specialist (Lung Specialist)",
                    "Neurologist",
                    "Gastroenterologist",
                  ]}
                  //   includeLabel={true} // shows "Select State" label
                  //   onChange={handleDropdownChange}
                />
              </div>
            </div>

            <div className="box-buttons">
              <button
                type="button"
                className="btn cancel-btn"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn save-btn"
                style={{ width: "120px" }}
              >
                Add Doctor
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
