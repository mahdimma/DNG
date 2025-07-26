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
  const [isHovered, setIsHovered] = useState(false);
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
    <div className="mb-6 relative group">
      <div 
        ref={progressRef}
        className={`relative h-1.5 bg-white/15 rounded-full cursor-pointer transition-all duration-300 ${
          isHovered || isDragging ? 'h-2 shadow-lg shadow-green-500/20' : ''
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Buffered progress */}
        <div 
          className="absolute inset-0 bg-white/25 rounded-full transition-all duration-300"
          style={{ width: `${videoBuffered}%` }}
        />
        
        {/* Current progress with enhanced green gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 rounded-full transition-all duration-300 shadow-lg shadow-green-500/30"
          style={{ width: `${progress}%` }}
        />
        
        {/* Enhanced progress thumb */}
        <div 
          className={`absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-xl transition-all duration-300 pointer-events-none border-2 border-green-400 ${
            isHovered || isDragging ? 'opacity-100 scale-110 shadow-green-500/50' : 'opacity-0'
          }`}
          style={{ 
            left: `${progress}%`, 
            transform: 'translateY(-50%) translateX(-50%)',
            ...(isDragging && { 
              transform: 'translateY(-50%) translateX(-50%) scale(1.3)',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)'
            })
          }}
        />

        {/* Enhanced time tooltip */}
        {showTooltip && (
          <div 
            className="absolute -top-12 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none transition-all duration-200 border border-green-500/30"
            style={{ 
              left: `${tooltipX}px`, 
              transform: 'translateX(-50%)',
              opacity: showTooltip ? 1 : 0
            }}
          >
            {formatTime(tooltipTime)}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Enhanced Play Button Component
 */
const PlayButton = ({ isPlaying, togglePlay }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={togglePlay}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-green-500/25 ${
        isPressed ? 'scale-95' : 'hover:scale-105'
      } border border-green-400/30`}
      aria-label={isPlaying ? 'توقف' : 'پخش'}
    >
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200" />
      
      {isPlaying ? (
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200 relative z-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h6a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 13 18H7a1.5 1.5 0 0 1-1.5-1.5v-13Z"/>
        </svg>
      ) : (
        <svg className="w-6 h-6 text-white ml-0.5 group-hover:scale-110 transition-transform duration-200 relative z-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z"/>
        </svg>
      )}
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-green-400/30 blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

/**
 * Enhanced Time Display Component
 */
const TimeDisplay = ({ videoCurrentTime, videoDuration, rtl, formatTime }) => {
  return (
    <div className="flex items-center gap-2 text-white text-sm font-mono bg-gray-900/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-green-500/20 shadow-lg">
      <div className="flex items-center gap-1">
        <span className="tabular-nums font-semibold text-green-400">{formatTime(videoCurrentTime)}</span>
        <span className="text-white/40 text-xs">/</span>
        <span className="tabular-nums text-white/80">{formatTime(videoDuration)}</span>
      </div>
      
      {/* Progress indicator */}
      <div className="w-2 h-2 rounded-full bg-green-500 opacity-60 animate-pulse" />
    </div>
  );
};

/**
 * Enhanced Volume Control Component with modern UI/UX
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
  const [showHelp, setShowHelp] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [helpTimeout, setHelpTimeout] = useState(null);
  const volumeRef = useRef(null);
  const buttonRef = useRef(null);

  // Enhanced keyboard controls with better UX feedback
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === buttonRef.current) {
        let newVolume;
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowRight':
            e.preventDefault();
            newVolume = Math.min(1, volume + 0.05);
            handleVolumeChange({ target: { value: newVolume } });
            setShowVolumeTooltip(true);
            setShowHelp(true);
            clearTimeout(helpTimeout);
            setHelpTimeout(setTimeout(() => {
              setShowVolumeTooltip(false);
              setShowHelp(false);
            }, 2000));
            break;
          case 'ArrowDown':
          case 'ArrowLeft':
            e.preventDefault();
            newVolume = Math.max(0, volume - 0.05);
            handleVolumeChange({ target: { value: newVolume } });
            setShowVolumeTooltip(true);
            setShowHelp(true);
            clearTimeout(helpTimeout);
            setHelpTimeout(setTimeout(() => {
              setShowVolumeTooltip(false);
              setShowHelp(false);
            }, 2000));
            break;
          case 'Home':
            e.preventDefault();
            handleVolumeChange({ target: { value: 1 } });
            setShowVolumeTooltip(true);
            setShowHelp(true);
            clearTimeout(helpTimeout);
            setHelpTimeout(setTimeout(() => {
              setShowVolumeTooltip(false);
              setShowHelp(false);
            }, 1500));
            break;
          case 'End':
            e.preventDefault();
            handleVolumeChange({ target: { value: 0 } });
            setShowVolumeTooltip(true);
            setShowHelp(true);
            clearTimeout(helpTimeout);
            setHelpTimeout(setTimeout(() => {
              setShowVolumeTooltip(false);
              setShowHelp(false);
            }, 1500));
            break;
          case ' ':
          case 'Enter':
            e.preventDefault();
            toggleMute();
            setShowVolumeTooltip(true);
            clearTimeout(helpTimeout);
            setHelpTimeout(setTimeout(() => setShowVolumeTooltip(false), 1000));
            break;
          case '?':
          case '/':
            e.preventDefault();
            setShowHelp(!showHelp);
            clearTimeout(helpTimeout);
            setHelpTimeout(setTimeout(() => setShowHelp(false), 5000));
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(helpTimeout);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [volume, handleVolumeChange, toggleMute, showHelp, helpTimeout]);

  // Enhanced volume icon with modern design
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.5 12A4.5 4.5 0 0 0 14.3 8.7l-1.4 1.4A2.5 2.5 0 0 1 14.5 12a2.5 2.5 0 0 1-1.6 2.3l1.4 1.4A4.5 4.5 0 0 0 16.5 12zM19 12a7 7 0 0 0-2.17-5.07l-1.42 1.42A5 5 0 0 1 17 12a5 5 0 0 1-1.59 3.65l1.42 1.42A7 7 0 0 0 19 12zM4.27 3L3 4.27L7.73 9H3v6h4l5 5v-6.73l4.25 4.25A7.17 7.17 0 0 1 14.3 19l1.42 1.42A9.12 9.12 0 0 0 18.7 17.27L21 19.54 22.27 18.27 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      );
    } else if (volume < 0.33) {
      return (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
        </svg>
      );
    } else if (volume < 0.66) {
      return (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.5 12A4.5 4.5 0 0 0 16.3 8.7l-1.4 1.4A2.5 2.5 0 0 1 16.5 12a2.5 2.5 0 0 1-1.6 2.3l1.4 1.4A4.5 4.5 0 0 0 18.5 12zM5 9v6h4l5 5V4L9 9H5z"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14.3 8.7l-1.4 1.4A2.5 2.5 0 0 1 14.5 12a2.5 2.5 0 0 1-1.6 2.3l1.4 1.4A4.5 4.5 0 0 0 16.5 12zM19 12a7 7 0 0 0-2.17-5.07l-1.42 1.42A5 5 0 0 1 17 12a5 5 0 0 1-1.59 3.65l1.42 1.42A7 7 0 0 0 19 12z"/>
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
      className="flex items-center gap-4 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Volume Button */}
      <button
        ref={buttonRef}
        onClick={toggleMute}
        className={`relative flex items-center justify-center w-12 h-12 bg-gray-800/60 backdrop-blur-md hover:bg-gray-700/70 rounded-xl transition-all duration-300 border ${
          isMuted ? 'border-red-500/50 shadow-lg shadow-red-500/20' : 'border-green-500/30 hover:border-green-400/50'
        } hover:scale-105 active:scale-95`}
        aria-label={isMuted ? 'صدا روشن' : 'صدا خاموش'}
        aria-pressed={isMuted}
        tabIndex={0}
        role="button"
      >
        {getVolumeIcon()}
        
        {/* Status indicator */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full transition-all duration-300 ${
          isMuted ? 'bg-red-500 animate-pulse' : volume > 0.7 ? 'bg-green-500' : volume > 0.3 ? 'bg-yellow-500' : 'bg-gray-500'
        }`} />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-xl bg-white/10 scale-0 group-active:scale-100 transition-transform duration-200" />
      </button>

      {/* Enhanced Volume Slider */}
      <div 
        className={`relative transition-all duration-500 ease-out ${
          isHovered || isDragging ? 'w-32 opacity-100' : 'w-0 opacity-0'
        } overflow-hidden`}
        role="slider"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={volumePercentage}
        aria-label="میزان صدا"
      >
        <div 
          ref={volumeRef}
          className="relative h-8 bg-gray-800/40 backdrop-blur-sm rounded-xl cursor-pointer group/slider border border-green-500/20 hover:border-green-400/40 transition-all duration-300"
          onMouseDown={handleMouseDown}
        >
          {/* Volume fill with enhanced gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30"
            style={{ width: `${volumePercentage}%` }}
          />
          
          {/* Volume thumb with glow effect */}
          <div 
            className={`absolute top-1/2 w-5 h-5 bg-white rounded-full shadow-xl transform -translate-y-1/2 transition-all duration-300 border-2 border-green-400 ${
              isDragging ? 'scale-125 shadow-green-500/50' : 'group-hover/slider:scale-110'
            }`}
            style={{ 
              left: rtl ? `${100 - volumePercentage}%` : `${volumePercentage}%`,
              transform: `translateY(-50%) ${rtl ? 'translateX(50%)' : 'translateX(-50%)'} ${isDragging ? 'scale(1.25)' : ''}`,
              boxShadow: isDragging ? '0 0 20px rgba(34, 197, 94, 0.6)' : ''
            }}
          />
          
          {/* Volume percentage tooltip */}
          {(showVolumeTooltip || isDragging) && (
            <div 
              className="absolute -top-12 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none transition-all duration-200 border border-green-500/30 shadow-lg"
              style={{ 
                left: rtl ? `${100 - volumePercentage}%` : `${volumePercentage}%`,
                transform: 'translateX(-50%)'
              }}
              role="tooltip"
            >
              {isMuted ? 'خاموش' : `${volumePercentage}%`}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Help Panel */}
      {(showHelp || (isHovered && !isDragging)) && (
        <div 
          className="absolute -top-20 right-0 bg-gray-900/95 backdrop-blur-md text-white px-4 py-3 rounded-xl text-xs whitespace-nowrap pointer-events-none transition-all duration-300 border border-green-500/30 shadow-xl max-w-xs"
          role="tooltip"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-green-500/20 rounded text-green-400">↑/↓</kbd>
              <span>تغییر صدا</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-green-500/20 rounded text-green-400">Space</kbd>
              <span>خاموش/روشن</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-green-500/20 rounded text-green-400">?</kbd>
              <span>راهنما</span>
            </div>
          </div>
          <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
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
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);

  // Auto-hide controls after inactivity
  useEffect(() => {
    const resetTimeout = () => {
      clearTimeout(controlsTimeout);
      setShowControls(true);
      setControlsTimeout(setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000));
    };

    resetTimeout();
    
    return () => clearTimeout(controlsTimeout);
  }, [isPlaying, controlsTimeout]);

  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
        showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      onMouseEnter={() => {
        clearTimeout(controlsTimeout);
        setShowControls(true);
      }}
      onMouseMove={() => {
        clearTimeout(controlsTimeout);
        setShowControls(true);
      }}
    >
      <div className="bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-lg border-t border-green-500/20 p-6 font-persian">
        {/* Progress Bar */}
        <ProgressBar
          videoCurrentTime={videoCurrentTime}
          videoDuration={videoDuration}
          videoBuffered={videoBuffered}
          handleSeek={handleSeek}
          rtl={rtl}
          formatTime={formatTime}
        />

        {/* Enhanced Controls Layout */}
        <div className={`flex items-center ${rtl ? 'justify-between flex-row-reverse' : 'justify-between'}`}>
          {/* Left controls (Play + Time) */}
          <div className={`flex items-center gap-6 ${rtl ? 'flex-row-reverse' : ''}`}>
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

          {/* Right controls (Volume + Additional Controls) */}
          <div className={`flex items-center gap-4 ${rtl ? 'flex-row-reverse' : ''}`}>
            <VolumeControl
              volume={volume}
              isMuted={isMuted}
              handleVolumeChange={handleVolumeChange}
              toggleMute={toggleMute}
              rtl={rtl}
            />
            
            {/* Quality indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-white text-xs font-medium">HD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
