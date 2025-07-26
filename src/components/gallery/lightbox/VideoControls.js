import React, { useState, useEffect } from "react";
import { formatTime } from "./utils";

// Import separate components
import ProgressBar from "./components/ProgressBar";
import PlayButton from "./components/PlayButton";
import TimeDisplay from "./components/TimeDisplay";
import VolumeControl from "./components/VolumeControl";
import QualityIndicator from "./components/QualityIndicator";

/**
 * Main Video Controls Component - LTR Layout
 */
const VideoControls = ({ 
  isPlaying, 
  videoCurrentTime, 
  videoDuration, 
  videoBuffered, 
  volume, 
  isMuted, 
  togglePlay, 
  handleSeek, 
  handleVolumeChange, 
  toggleMute 
}) => {
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and auto-hide controls
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-hide controls after inactivity (more aggressive on mobile)
  useEffect(() => {
    const resetTimeout = () => {
      clearTimeout(controlsTimeout);
      setShowControls(true);
      const hideDelay = isMobile ? 2000 : 3000; // Faster hide on mobile
      setControlsTimeout(setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, hideDelay));
    };

    resetTimeout();
    
    return () => clearTimeout(controlsTimeout);
  }, [isPlaying, controlsTimeout, isMobile]);

  const handleControlsInteraction = () => {
    clearTimeout(controlsTimeout);
    setShowControls(true);
  };

  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
        showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      onMouseEnter={() => !isMobile && handleControlsInteraction()}
      onMouseMove={handleControlsInteraction}
      onTouchStart={() => isMobile && handleControlsInteraction()}
    >
      {/* Compact control container with LTR layout */}
      <div 
        className="bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-lg border-t border-green-500/20 p-3 md:p-4"
        dir="ltr"
      >
        {/* Progress Bar */}
        <ProgressBar
          videoCurrentTime={videoCurrentTime}
          videoDuration={videoDuration}
          videoBuffered={videoBuffered}
          handleSeek={handleSeek}
          formatTime={formatTime}
        />

        {/* Controls Layout - Standard LTR */}
        <div className="flex items-center justify-between">
          {/* Left controls (Play + Time) */}
          <div className="flex items-center gap-3 md:gap-4">
            <PlayButton 
              isPlaying={isPlaying} 
              togglePlay={togglePlay} 
            />
            
            <TimeDisplay
              videoCurrentTime={videoCurrentTime}
              videoDuration={videoDuration}
              formatTime={formatTime}
            />
          </div>

          {/* Right controls (Volume + Quality) */}
          <div className="flex items-center gap-2 md:gap-3">
            <VolumeControl
              volume={volume}
              isMuted={isMuted}
              handleVolumeChange={handleVolumeChange}
              toggleMute={toggleMute}
            />
            
            <QualityIndicator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
