import React, { useState, useRef, useCallback } from "react";
import { formatDisplayTime } from "./utils";
import styles from "../VideoControls.module.css";

const ProgressBar = ({ 
  videoCurrentTime, 
  videoDuration, 
  videoBuffered, 
  handleSeek,
  rtl,
  formatTime
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef(null);

  // Enhanced seek handler with better UX
  const handleProgressClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!progressRef.current || !videoDuration) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, rtl ? (rect.width - clickX) / rect.width : clickX / rect.width));
    const seekTime = percentage * videoDuration;
    
    if (handleSeek) {
      handleSeek(seekTime);
    }
  }, [rtl, videoDuration, handleSeek]);

  // Progress drag handler
  const handleProgressDrag = useCallback((e) => {
    if (isDragging && e.buttons === 1) { // Only if dragging and left mouse button is pressed
      handleProgressClick(e);
    }
  }, [isDragging, handleProgressClick]);

  return (
    <div 
      ref={progressRef}
      className={`${styles.progressContainer} w-full h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer group relative overflow-hidden hover:h-2 transition-all duration-300 shadow-inner`}
      onClick={handleProgressClick}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleProgressClick(e);
      }}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleProgressDrag}
    >
      {/* Background track with subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full"></div>
      
      {/* Buffered progress */}
      <div 
        className="absolute inset-0 bg-white/30 rounded-full transition-all duration-500"
        style={{ 
          width: `${videoBuffered}%`,
          ...(rtl && { 
            right: 0, 
            left: 'auto',
            transform: 'scaleX(-1)'
          })
        }}
      ></div>
      
      {/* Current progress with enhanced gradient */}
      <div 
        className="absolute top-0 h-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 rounded-full transition-all duration-200 ease-out shadow-lg shadow-emerald-500/30"
        style={{ 
          width: `${videoDuration > 0 ? (videoCurrentTime / videoDuration) * 100 : 0}%`,
          ...(rtl && { 
            right: 0, 
            left: 'auto',
            background: 'linear-gradient(to left, rgb(5 150 105), rgb(34 197 94), rgb(16 185 129))'
          })
        }}
      >
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/80 to-green-400/80 rounded-full opacity-80 blur-[1px] animate-pulse"></div>
      </div>
      
      {/* Enhanced progress thumb */}
      <div 
        className={`${styles.progressThumb} absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 border-emerald-400 cursor-grab active:cursor-grabbing hover:scale-150 ${isDragging ? 'scale-150 opacity-100 shadow-2xl' : ''}`}
        style={{ 
          [rtl ? 'right' : 'left']: `calc(${videoDuration > 0 ? (videoCurrentTime / videoDuration) * 100 : 0}% - 7px)`,
          transform: 'translateY(-50%)',
          boxShadow: '0 0 0 3px rgba(52, 211, 153, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="absolute inset-0.5 bg-emerald-500 rounded-full"></div>
      </div>
      
      {/* Hover overlay with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      
      {/* Enhanced time tooltip */}
      <div 
        className="absolute -top-12 bg-black/95 text-white text-sm px-4 py-2 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 font-persian whitespace-nowrap backdrop-blur-sm border border-white/20 shadow-xl"
        style={{ 
          [rtl ? 'right' : 'left']: `calc(${videoDuration > 0 ? (videoCurrentTime / videoDuration) * 100 : 0}% - 30px)`,
          transform: 'translateX(-50%)'
        }}
      >
        {formatDisplayTime(videoCurrentTime, formatTime, rtl)}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
