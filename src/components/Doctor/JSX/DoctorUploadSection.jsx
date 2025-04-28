import React, { useRef } from "react";

const DoctorUploadSection = () => {
  const fileUploadRef = useRef(); // Reference for file input

  // Function to handle file selection
  const handleFileChange = event => {
    const file = event.target.files[0];

    if (file) {
      console.log("Selected file:", file.name);
      // You can add further processing (e.g., uploading to a server)
    }
  };

  return (
    <div className="upload-section">
      <p className="upload-label">Upload Medical License Or Other ID Proof</p>

      <button
        className="upload-btn"
        onClick={() => fileUploadRef.current.click()}
      >
        <i className="fa-solid fa-file-pdf"></i> Upload Now
      </button>

      <input
        ref={fileUploadRef}
        type="file"
        accept="application/pdf"
        name="idProof"
        id="idProof"
        onChange={handleFileChange} // Handle file selection
        hidden
      />
    </div>
  );
};

export default DoctorUploadSection;
