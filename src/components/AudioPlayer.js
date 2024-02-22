import React from "react";
import AudioPlayer from "react-audio-player";

const Player = ({ file, playNext }) => {
  if (!file || (typeof file === "object" && !Object.keys(file).length)) {
    return null; // Handle no file selected
  }

  return (
    <div>
      <AudioPlayer controls src={file.data} onEnded={playNext} />
    </div>
  );
};

export default Player;