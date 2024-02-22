import React, { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer"; // Import AudioPlayer component

const Playlist = ({ playlist }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Update selectedFile when playlist changes
    setSelectedFile(playlist[0] || null);
  }, [playlist]);

  const handleSelect = (index) => {
    setSelectedFile(playlist[index]);
  };

  return (
    <div>
      {playlist.length > 0 && (
        <ul>
          {playlist.map((file, index) => (
            <li key={index} onClick={() => handleSelect(index)}>
              <p>
                {file.name} ({file.size} bytes)
              </p>
            </li>
          ))}
        </ul>
      )}
      {selectedFile && (
        <div>
          <h3>Playing: {selectedFile.name}</h3>
          <AudioPlayer file={selectedFile} />
        </div>
      )}
    </div>
  );
};

export default Playlist;