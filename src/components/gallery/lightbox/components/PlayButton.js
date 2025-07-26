import React, { useState } from "react";

/**
 * Enhanced Play Button Component - Responsive
 */
const PlayButton = ({ isPlaying, togglePlay }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={togglePlay}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-green-500/25 ${
        isPressed ? 'scale-95' : 'hover:scale-105'
      } border border-green-400/30`}
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200" />
      
      {isPlaying ? (
        <svg className="w-4 h-4 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform duration-200 relative z-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h6a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 13 18H7a1.5 1.5 0 0 1-1.5-1.5v-13Z"/>
        </svg>
      ) : (
        <svg className="w-4 h-4 md:w-6 md:h-6 text-white ml-0.5 group-hover:scale-110 transition-transform duration-200 relative z-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z"/>
        </svg>
      )}
      
      {/* Glow effect - reduced on mobile */}
      <div className="absolute inset-0 rounded-full bg-green-400/20 md:bg-green-400/30 blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default PlayButton;
