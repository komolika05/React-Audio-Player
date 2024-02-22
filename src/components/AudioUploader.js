import React, { useRef } from "react";

const AudioUploader = ({ playlist, setPlaylist }) => {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const newFiles = event.target.files;
    const validFiles = [];

    // Validate file type (MP3 in this case)
    for (const file of newFiles) {
      if (file.type === "audio/mpeg") {
        validFiles.push(file);
      } else {
        console.error("Invalid file type:", file.type);
      }
    }

    createPlaylist(validFiles);
  };

  const createPlaylist = (newFiles) => {
    playlist.concat(
      newFiles.map(async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          setPlaylist([
            ...playlist,
            { name: file.name, data: event.target.result },
          ]);
        };
      })
    );
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        multiple
        onChange={handleFileChange}
        hidden
        accept=".mp3"
      />
      <button onClick={handleClick}>Upload MP3 Files</button>
      <p>Uploaded files:</p>
    </div>
  );
};

export default AudioUploader;