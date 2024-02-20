import React, { useState, useEffect } from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ selectedAudio, playlist, onAudioChange }) => {
  const [audio, setAudio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const newAudio = new Audio();
    newAudio.src = selectedAudio.url;

    newAudio.addEventListener("loadeddata", () => {
      setAudio(newAudio);

      if (isPlaying) {
        newAudio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    });

    return () => {
      newAudio.pause();
      newAudio.src = "";
    };
  }, [selectedAudio, isPlaying]);

  const playPauseHandler = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const playNextHandler = () => {
    const currentIndex = playlist.findIndex((audio) => audio === selectedAudio);
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextAudio = playlist[nextIndex];

    const newAudio = new Audio();
    newAudio.src = nextAudio.url;

    newAudio.addEventListener("loadeddata", () => {
      setAudio(newAudio);
      setAudio(nextAudio);
      onAudioChange(nextIndex);
      if (isPlaying) {
        newAudio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    });
  };

  const timeUpdateHandler = () => {};

  return (
    <div className="playing">
      <h2>Now Playing: {selectedAudio.name}</h2>
      <audio
        controls
        src={selectedAudio.url}
        onEnded={playNextHandler}
        onTimeUpdate={timeUpdateHandler}
      />
    </div>
  );
};

export default AudioPlayer;
