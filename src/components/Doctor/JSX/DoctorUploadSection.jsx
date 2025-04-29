import React, { useRef, useState } from "react";

const DoctorUploadSection = ({ handleFileUpload }) => {
  const fileUploadRef = useRef(); // Reference for file input
  const [selectedFile, setSelectedFile] = useState(null); // Store the selected file

  // Function to handle file selection
  const handleFileChange = event => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file); // Update state with selected file
      handleFileUpload(file); // Pass the file to the parent component
    }
  };

  return (
    <div className="col-12">
      <div>
        <p className="upload-label">Upload Medical License Or Other ID Proof</p>

        <button
          type="button"
          className="upload-btn"
          onClick={() => fileUploadRef.current.click()}
        >
          <i className="fa-solid fa-file-pdf"></i>
          {selectedFile ? <>{" " + selectedFile.name}</> : " Upload Now"}
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
    </div>
  );
};

export default DoctorUploadSection;
