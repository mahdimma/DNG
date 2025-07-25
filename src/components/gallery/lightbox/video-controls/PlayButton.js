import React from "react";
import styles from "../VideoControls.module.css";

const PlayButton = ({ isPlaying, togglePlay }) => {
  return (
    <button
      onClick={togglePlay}
      className={`${styles.controlButton} group p-4 text-white rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black/70 shadow-lg backdrop-blur-sm border border-white/20`}
      aria-label={isPlaying ? 'توقف' : 'پخش'}
    >
      {isPlaying ? (
        <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5.5 4A1.5 1.5 0 004 5.5v9A1.5 1.5 0 005.5 16h1A1.5 1.5 0 008 14.5v-9A1.5 1.5 0 006.5 4h-1zM12.5 4A1.5 1.5 0 0011 5.5v9a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0013.5 4h-1z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
      )}
    </button>
  );
};

export default PlayButton;
