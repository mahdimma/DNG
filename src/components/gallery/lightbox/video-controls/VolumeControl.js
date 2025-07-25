import React, { useState, useRef, useEffect } from "react";
import { toPersianNumbers } from "./utils";
import styles from "../VideoControls.module.css";

const VolumeControl = ({ 
  volume, 
  isMuted, 
  handleVolumeChange, 
  toggleMute, 
  rtl 
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const volumeRef = useRef(null);

  // Show/hide volume slider with delay
  useEffect(() => {
    let timeoutId;
    if (isVolumeHovered) {
      setShowVolumeSlider(true);
    } else {
      timeoutId = setTimeout(() => setShowVolumeSlider(false), 300);
    }
    return () => clearTimeout(timeoutId);
  }, [isVolumeHovered]);

  return (
    <div 
      className={`flex items-center gap-4 ${rtl ? 'flex-row-reverse' : ''}`}
      onMouseEnter={() => setIsVolumeHovered(true)}
      onMouseLeave={() => setIsVolumeHovered(false)}
    >
      <div className="relative flex items-center bg-white/5 rounded-full p-1 backdrop-blur-sm border border-white/10">
        {/* Enhanced Volume Button */}
        <button
          onClick={toggleMute}
          className={`${styles.controlButton} text-white hover:bg-white/20 active:bg-white/30 rounded-full p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black/70`}
          aria-label={isMuted ? 'صدا روشن' : 'صدا خاموش'}
        >
          {isMuted || volume === 0 ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : volume < 0.5 ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>

        {/* Enhanced Volume Slider */}
        <div 
          ref={volumeRef}
          className={`${styles.volumeSlider} relative h-1.5 bg-white/20 rounded-full cursor-pointer group transition-all duration-300 overflow-hidden ${showVolumeSlider ? 'w-28 mx-3' : 'w-0'} ${rtl ? 'mr-3 ml-0' : ''}`}
        >
          {/* Hidden input for accessibility and better functionality */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              console.log('Input range changed:', e.target.value); // Debug log
              if (handleVolumeChange) {
                handleVolumeChange(e);
              }
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="تنظیم صدا"
          />
          
          {/* Volume track with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/15 to-white/10 rounded-full shadow-inner"></div>
          
          {/* Volume fill with enhanced styling */}
          <div 
            className="absolute top-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-200 shadow-sm"
            style={{ 
              width: `${(isMuted ? 0 : volume) * 100}%`,
              ...(rtl && { 
                right: 0, 
                left: 'auto',
                background: 'linear-gradient(to left, rgb(52, 211, 153), rgb(16, 185, 129))'
              })
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/60 to-emerald-400/60 rounded-full blur-[0.5px]"></div>
          </div>
          
          {/* Enhanced volume thumb */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-125 border border-emerald-400"
            style={{ 
              [rtl ? 'right' : 'left']: `calc(${(isMuted ? 0 : volume) * 100}% - 6px)`,
              transform: 'translateY(-50%)',
              boxShadow: '0 0 0 2px rgba(52, 211, 153, 0.3), 0 2px 8px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="absolute inset-0.5 bg-emerald-500 rounded-full"></div>
          </div>
          
          {/* Volume percentage display */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 font-persian whitespace-nowrap">
            {rtl ? toPersianNumbers(Math.round((isMuted ? 0 : volume) * 100).toString()) : Math.round((isMuted ? 0 : volume) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;
