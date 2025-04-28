import React, { useEffect, useState } from "react";

// import "../Style/BoxModal.css";
import FormField from "../../Form/FormField";
import DropdownSelect from "../../DropdownSelect";

import DoctorInputFields from "./DoctorInputFields";
import DoctorUploadSection from "./DoctorUploadSection";
import DoctorFooterActions from "./DoctorFooterActions";

import "../Style/DoctorForm.css";

const AddDoctor = ({ isClosing, onClose }) => {
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
        <h2 className="modal-title">Add Doctor</h2>

        <DoctorInputFields />
        <DoctorUploadSection />
        <DoctorFooterActions onClose={onClose} />
      </div>
    </div>
  );
};

export default AddDoctor;
