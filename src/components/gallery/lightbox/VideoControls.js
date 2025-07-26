import React, { useState, useRef, useEffect } from "react";
import { formatTime } from "./utils";

/**
 * Check if the document is in RTL mode
 */
const isRTL = () => {
  return document.documentElement.dir === 'rtl' || 
         document.documentElement.lang === 'fa' ||
         document.documentElement.lang === 'ar';
};

/**
 * Modern Progress Bar Component
 */
const ProgressBar = ({ 
  videoCurrentTime, 
  videoDuration, 
  videoBuffered, 
  handleSeek, 
  rtl, 
  formatTime 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTime, setTooltipTime] = useState(0);
  const [tooltipX, setTooltipX] = useState(0);
  const progressRef = useRef(null);

  const progress = videoDuration ? (videoCurrentTime / videoDuration) * 100 : 0;

  const handleMouseMove = (e) => {
    if (!progressRef.current || !videoDuration) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const time = pos * videoDuration;
    
    setTooltipTime(time);
    setTooltipX(e.clientX - rect.left);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleSeek(e);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e) => {
      if (isDragging && progressRef.current) {
        handleSeek(e);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, handleSeek]);

  return (
    <div className="mb-4 relative">
      <div 
        ref={progressRef}
        className="relative h-2 bg-white/20 rounded-full cursor-pointer group transition-all duration-200 hover:h-3"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
      >
        {/* Buffered progress */}
        <div 
          className="absolute inset-0 bg-white/30 rounded-full transition-all duration-300"
          style={{ width: `${videoBuffered}%` }}
        />
        
        {/* Current progress */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
        
        {/* Progress thumb */}
        <div 
          className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"
          style={{ 
            left: `${progress}%`, 
            transform: 'translateY(-50%) translateX(-50%)',
            ...(isDragging && { opacity: 1, transform: 'translateY(-50%) translateX(-50%) scale(1.2)' })
          }}
        />

        {/* Time tooltip */}
        {showTooltip && (
          <div 
            className="absolute -top-10 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none transition-opacity duration-200"
            style={{ 
              left: `${tooltipX}px`, 
              transform: 'translateX(-50%)',
              opacity: showTooltip ? 1 : 0
            }}
          >
            {formatTime(tooltipTime)}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Modern Play Button Component
 */
const PlayButton = ({ isPlaying, togglePlay }) => {
  return (
    <button
      onClick={togglePlay}
      className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 group"
      aria-label={isPlaying ? 'توقف' : 'پخش'}
    >
      {isPlaying ? (
        <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h6a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 13 18H7a1.5 1.5 0 0 1-1.5-1.5v-13Z"/>
        </svg>
      ) : (
        <svg className="w-5 h-5 text-white ml-0.5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z"/>
        </svg>
      )}
    </button>
  );
};

/**
 * Modern Time Display Component
 */
const TimeDisplay = ({ videoCurrentTime, videoDuration, rtl, formatTime }) => {
  return (
    <div className="flex items-center gap-1 text-white text-sm font-mono bg-black/20 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
      <span className="tabular-nums">{formatTime(videoCurrentTime)}</span>
      <span className="text-white/60">/</span>
      <span className="tabular-nums text-white/80">{formatTime(videoDuration)}</span>
    </div>
  );
};

/**
 * Modern Volume Control Component with enhanced UI
 */
const VolumeControl = ({ 
  volume, 
  isMuted, 
  handleVolumeChange, 
  toggleMute, 
  rtl 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVolumeTooltip, setShowVolumeTooltip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const volumeRef = useRef(null);
  const buttonRef = useRef(null);

  // Keyboard controls for volume
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === buttonRef.current) {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowRight':
            e.preventDefault();
            const newVolumeUp = Math.min(1, volume + 0.1);
            handleVolumeChange({ target: { value: newVolumeUp } });
            setShowVolumeTooltip(true);
            setTimeout(() => setShowVolumeTooltip(false), 1000);
            break;
          case 'ArrowDown':
          case 'ArrowLeft':
            e.preventDefault();
            const newVolumeDown = Math.max(0, volume - 0.1);
            handleVolumeChange({ target: { value: newVolumeDown } });
            setShowVolumeTooltip(true);
            setTimeout(() => setShowVolumeTooltip(false), 1000);
            break;
          case 'Home':
            e.preventDefault();
            handleVolumeChange({ target: { value: 1 } });
            setShowVolumeTooltip(true);
            setTimeout(() => setShowVolumeTooltip(false), 1000);
            break;
          case 'End':
            e.preventDefault();
            handleVolumeChange({ target: { value: 0 } });
            setShowVolumeTooltip(true);
            setTimeout(() => setShowVolumeTooltip(false), 1000);
            break;
          case ' ':
          case 'Enter':
            e.preventDefault();
            toggleMute();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [volume, handleVolumeChange, toggleMute]);

  // Get appropriate volume icon
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3.63 3.63a.996.996 0 0 0-1.41 1.41L7.29 10.1 7 10.17v4.66c0 .45.54.67.85.35l2.79-2.79 2.79 2.79c.31.32.85.1.85-.35V11.5l6.29 6.29a.996.996 0 1 0 1.41-1.41L3.63 3.63zM16 7.83c1.38 1.38 2.27 3.24 2.27 5.17 0 1.93-.89 3.79-2.27 5.17l1.42 1.42C19.55 17.46 20.5 14.85 20.5 13s-.95-4.46-3.08-6.59L16 7.83zm-2.5 2.5c.48.48.77 1.1.77 1.67s-.29 1.19-.77 1.67l1.42 1.42C15.9 13.9 16.5 12.5 16.5 11s-.6-2.9-1.58-4.09l-1.42 1.42z"/>
        </svg>
      );
    } else if (volume < 0.33) {
      return (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10.17v4.66c0 .45.54.67.85.35l2.79-2.79 2.79 2.79c.31.32.85.1.85-.35V6.17c0-.45-.54-.67-.85-.35L9.65 8.61 6.85 5.82c-.31-.32-.85-.1-.85.35v4zm5.5-.67c.48.48.77 1.1.77 1.67s-.29 1.19-.77 1.67l1.42 1.42C14.9 13.9 15.5 12.5 15.5 11s-.6-2.9-1.58-4.09l-1.42 1.42z"/>
        </svg>
      );
    } else if (volume < 0.66) {
      return (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 10.17v4.66c0 .45.54.67.85.35l2.79-2.79 2.79 2.79c.31.32.85.1.85-.35V6.17c0-.45-.54-.67-.85-.35L7.65 8.61 4.85 5.82c-.31-.32-.85-.1-.85.35v4zm7.5-.67c.48.48.77 1.1.77 1.67s-.29 1.19-.77 1.67l1.42 1.42C14.9 13.9 15.5 12.5 15.5 11s-.6-2.9-1.58-4.09l-1.42 1.42z"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 10.17v4.66c0 .45.54.67.85.35l2.79-2.79 2.79 2.79c.31.32.85.1.85-.35V6.17c0-.45-.54-.67-.85-.35L5.65 8.61 2.85 5.82c-.31-.32-.85-.1-.85.35v4zm5.5-.67c.48.48.77 1.1.77 1.67s-.29 1.19-.77 1.67l1.42 1.42C11.9 13.9 12.5 12.5 12.5 11s-.6-2.9-1.58-4.09L9.5 8.33zm3-3c1.38 1.38 2.27 3.24 2.27 5.17 0 1.93-.89 3.79-2.27 5.17l1.42 1.42C15.05 17.46 16 14.85 16 13s-.95-4.46-3.08-6.59L11.5 7.83z"/>
        </svg>
      );
    }
  };

  const handleSliderChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newVolume = rtl ? 1 - pos : pos;
    
    handleVolumeChange({ target: { value: newVolume } });
    setShowVolumeTooltip(true);
    
    // Hide tooltip after a delay
    setTimeout(() => setShowVolumeTooltip(false), 1000);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleSliderChange(e);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e) => {
      if (isDragging && volumeRef.current) {
        handleSliderChange(e);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  const volumePercentage = Math.round(volume * 100);

  return (
    <div 
      className="flex items-center gap-3 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mute/Unmute Button */}
      <button
        ref={buttonRef}
        onClick={toggleMute}
        className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 relative"
        aria-label={isMuted ? 'صدا روشن' : 'صدا خاموش'}
        aria-pressed={isMuted}
        tabIndex={0}
        role="button"
      >
        {getVolumeIcon()}
        
        {/* Ripple effect on click */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-150" />
      </button>

      {/* Modern Volume Slider */}
      <div 
        className={`relative transition-all duration-300 ease-out ${
          isHovered || isDragging ? 'w-24' : 'w-0 opacity-0'
        } overflow-hidden`}
        role="slider"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={volumePercentage}
        aria-label="میزان صدا"
      >
        <div 
          ref={volumeRef}
          className="relative h-6 bg-white/20 rounded-full cursor-pointer group/slider"
          onMouseDown={handleMouseDown}
        >
          {/* Volume fill */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-200"
            style={{ width: `${volumePercentage}%` }}
          />
          
          {/* Volume thumb */}
          <div 
            className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-200 group-hover/slider:scale-110"
            style={{ 
              left: rtl ? `${100 - volumePercentage}%` : `${volumePercentage}%`,
              transform: `translateY(-50%) ${rtl ? 'translateX(50%)' : 'translateX(-50%)'} ${isDragging ? 'scale(1.3)' : ''}`
            }}
          />
          
          {/* Volume percentage tooltip */}
          {(showVolumeTooltip || isDragging) && (
            <div 
              className="absolute -top-8 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none transition-opacity duration-200"
              style={{ 
                left: rtl ? `${100 - volumePercentage}%` : `${volumePercentage}%`,
                transform: 'translateX(-50%)'
              }}
              role="tooltip"
            >
              {volumePercentage}%
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/80" />
            </div>
          )}
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      {isHovered && (
        <div className="absolute -top-12 right-0 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none transition-opacity duration-200 hidden md:block" role="tooltip">
          ↑↓ برای تغییر صدا
          <div className="absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/80" />
        </div>
      )}
    </div>
  );
};

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
  const rtl = isRTL();

  return (
    <div className="w-full bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-md rounded-b-xl p-6 font-persian">
      {/* Progress Bar */}
      <ProgressBar
        videoCurrentTime={videoCurrentTime}
        videoDuration={videoDuration}
        videoBuffered={videoBuffered}
        handleSeek={handleSeek}
        rtl={rtl}
        formatTime={formatTime}
      />

      {/* Enhanced Controls */}
      <div className={`flex items-center ${rtl ? 'justify-between flex-row-reverse' : 'justify-between'}`}>
        {/* Left controls (Play + Time) */}
        <div className={`flex items-center gap-5 ${rtl ? 'flex-row-reverse' : ''}`}>
          <PlayButton 
            isPlaying={isPlaying} 
            togglePlay={togglePlay} 
          />
          
          <TimeDisplay
            videoCurrentTime={videoCurrentTime}
            videoDuration={videoDuration}
            rtl={rtl}
            formatTime={formatTime}
          />
        </div>

        {/* Enhanced Right controls (Volume) */}
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          handleVolumeChange={handleVolumeChange}
          toggleMute={toggleMute}
          rtl={rtl}
        />
      </div>
    </div>
  );
};

export default VideoControls;
