import React from "react";

const Player = ({ file }) => {
  if (!file || (typeof file === "object" && !Object.keys(file).length)) {
    return null; // Handle no file selected
  }

  return (
    <div>
      <audio controls src={file.data} />
    </div>
  );
};

export default Player;