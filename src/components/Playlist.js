import React, { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer"; // Import AudioPlayer component
import { useLocalStorage } from "react-use";

const Playlist = ({ playlist }) => {
  const [currentIndex, setCurrentIndex] = useLocalStorage("currentIndex", 0); // Use useLocalStorage hook
  const [selectedFile, setSelectedFile] = useState(
    playlist[currentIndex] || null
  );

  useEffect(() => {
    // Update selectedFile when playlist changes
    setSelectedFile(playlist[currentIndex] || null);
  }, [playlist, currentIndex]);

  const handleSelect = (index) => {
    setSelectedFile(playlist[index]);
    setCurrentIndex(index); // Update current index on selection
  };

  const handlePlayNext = () => {
    const currentFileIdx = playlist.findIndex(
      (f) => f.name === selectedFile.name
    );

    const nextIndex = (currentFileIdx + 1) % playlist.length;
    setSelectedFile(playlist[nextIndex]);
    setCurrentIndex(nextIndex);
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
          <AudioPlayer file={selectedFile} playNext={handlePlayNext} />
        </div>
      )}
    </div>
  );
};

export default Playlist;
