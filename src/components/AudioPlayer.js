import React, { useState, useEffect } from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ selectedAudio, playlist, onAudioChange }) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (selectedAudio) {
      const newAudio = new Audio(selectedAudio.url);

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
    }
  }, [selectedAudio, isPlaying]);

  const playPauseHandler = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextHandler = () => {
    if (selectedAudio) {
      const currentIndex = playlist.findIndex(
        (audio) => audio === selectedAudio
      );
      const nextIndex = (currentIndex + 1) % playlist.length;
      const nextAudio = playlist[nextIndex];

      const newAudio = new Audio(nextAudio.url);

      newAudio.addEventListener("loadeddata", () => {
        setAudio(newAudio);
        onAudioChange(nextIndex);
        newAudio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      });
    }
  };

  const timeUpdateHandler = () => {};

  return (
    <div className="playing">
      {selectedAudio && (
        <>
          <h2>Now Playing: {selectedAudio.name}</h2>
          <audio
            controls
            src={selectedAudio.url}
            onEnded={playNextHandler}
            onTimeUpdate={timeUpdateHandler}
          />
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
