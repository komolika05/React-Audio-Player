import React, { useState, useEffect } from "react";
import AudioPlayer from "./components/AudioPlayer";
import FileUpload from "./components/FileUpload";
import "./App.css";

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState(null);

  useEffect(() => {
    const storedIndex = localStorage.getItem("lastPlayingIndex");

    if (storedIndex !== null) {
      const index = parseInt(storedIndex, 10);
      setSelectedAudio(playlist[index]);
    }
  }, [playlist]);

  const handleFileChange = (selectedFile) => {
    const newAudio = {
      name: selectedFile.name,
      url: URL.createObjectURL(selectedFile),
    };

    setPlaylist([...playlist, newAudio]);

    if (!selectedAudio) {
      setSelectedAudio(newAudio);
    }
  };

  const handleAudioSelection = (index) => {
    setSelectedAudio(playlist[index]);
    localStorage.setItem("lastPlayingIndex", index);
  };

  return (
    <div className="main">
      <h1>React Audio Player</h1>
      <FileUpload onFileChange={handleFileChange} />
      {selectedAudio && (
        <AudioPlayer
          selectedAudio={selectedAudio}
          playlist={playlist}
          onAudioChange={handleAudioSelection}
        />
      )}
      <h2>Playlist</h2>
      <ul>
        {playlist.map((audio, index) => (
          <li key={index} onClick={() => handleAudioSelection(index)}>
            {audio.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
