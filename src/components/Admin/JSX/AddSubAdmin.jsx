import React, { useEffect, useState } from "react";

// import "../Style/BoxModal.css";
import FormField from "../../Form/FormField";
import DropdownSelect from "../../DropdownSelect";

const AddSubAdmin = ({ isClosing, onClose }) => {
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
          <h2>Add Sub Admins</h2>
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
                <label>Sub-Admin Role</label>
                <DropdownSelect
                  defaultClass="default-value"
                  defaultValue="Select Sub-Admin Type"
                  options={["Coordinator", "Audit Manager"]}
                  index={0} // Unique index for tracking
                  activeDropdownIndex={activeDropdownIndex}
                  setActiveDropdownIndex={setActiveDropdownIndex}
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
                style={{ width: "150px" }}
              >
                Add Sub-Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubAdmin;
