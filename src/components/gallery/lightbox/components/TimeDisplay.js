import React from "react";

/**
 * Enhanced Time Display Component - Responsive
 */
const TimeDisplay = ({ videoCurrentTime, videoDuration, formatTime }) => {
  return (
    <div className="flex items-center gap-1 md:gap-2 text-white text-xs md:text-sm font-mono bg-gray-900/60 backdrop-blur-md px-2 md:px-4 py-1.5 md:py-2.5 rounded-lg md:rounded-xl border border-green-500/20 shadow-lg">
      <div className="flex items-center gap-1">
        <span className="tabular-nums font-semibold text-green-400">{formatTime(videoCurrentTime)}</span>
        <span className="text-white/40 text-xs">/</span>
        <span className="tabular-nums text-white/80">{formatTime(videoDuration)}</span>
      </div>
      
      {/* Progress indicator - hidden on small screens */}
      <div className="hidden md:block w-2 h-2 rounded-full bg-green-500 opacity-60 animate-pulse" />
    </div>
  );
};

export default TimeDisplay;
