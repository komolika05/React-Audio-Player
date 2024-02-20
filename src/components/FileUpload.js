import React from "react";

const FileUpload = ({ onFileChange }) => {
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    for (let i = 0; i < selectedFiles.length; i++) {
      const selectedFile = selectedFiles[i];
      onFileChange(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" accept=".mp3" onChange={handleFileChange} multiple />
    </div>
  );
};

export default FileUpload;
