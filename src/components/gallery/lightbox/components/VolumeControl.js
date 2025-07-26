import React, { useState, useRef, useEffect } from "react";

/**
 * Volume Icon Component
 */
const VolumeIcon = ({ volume, isMuted }) => {
  if (isMuted || volume === 0) {
    return (
      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16.5 12A4.5 4.5 0 0 0 14.3 8.7l-1.4 1.4A2.5 2.5 0 0 1 14.5 12a2.5 2.5 0 0 1-1.6 2.3l1.4 1.4A4.5 4.5 0 0 0 16.5 12zM19 12a7 7 0 0 0-2.17-5.07l-1.42 1.42A5 5 0 0 1 17 12a5 5 0 0 1-1.59 3.65l1.42 1.42A7 7 0 0 0 19 12zM4.27 3L3 4.27L7.73 9H3v6h4l5 5v-6.73l4.25 4.25A7.17 7.17 0 0 1 14.3 19l1.42 1.42A9.12 9.12 0 0 0 18.7 17.27L21 19.54 22.27 18.27 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      </svg>
    );
  } else if (volume < 0.33) {
    return (
      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
      </svg>
    );
  } else if (volume < 0.66) {
    return (
      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.5 12A4.5 4.5 0 0 0 16.3 8.7l-1.4 1.4A2.5 2.5 0 0 1 16.5 12a2.5 2.5 0 0 1-1.6 2.3l1.4 1.4A4.5 4.5 0 0 0 18.5 12zM5 9v6h4l5 5V4L9 9H5z"/>
      </svg>
    );
  } else {
    return (
      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14.3 8.7l-1.4 1.4A2.5 2.5 0 0 1 14.5 12a2.5 2.5 0 0 1-1.6 2.3l1.4 1.4A4.5 4.5 0 0 0 16.5 12zM19 12a7 7 0 0 0-2.17-5.07l-1.42 1.42A5 5 0 0 1 17 12a5 5 0 0 1-1.59 3.65l1.42 1.42A7 7 0 0 0 19 12z"/>
      </svg>
    );
  }
};

/**
 * Volume Slider Component
 */
const VolumeSlider = ({ 
  volume, 
  isMuted, 
  volumePercentage, 
  isDragging, 
  showVolumeTooltip, 
  isHovered,
  isMobile,
  volumeRef,
  onMouseDown,
  onTouchStart 
}) => {
  return (
    <div 
      className="relative transition-all duration-500 ease-out w-20 md:w-32 opacity-100"
      role="slider"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={volumePercentage}
      aria-label="Volume level"
    >
      <div 
        ref={volumeRef}
        className="relative h-6 md:h-8 bg-gray-800/40 backdrop-blur-sm rounded-lg md:rounded-xl cursor-pointer group/slider border border-green-500/20 hover:border-green-400/40 transition-all duration-300"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* Volume fill with enhanced gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-lg md:rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30"
          style={{ width: `${volumePercentage}%` }}
        />
        
        {/* Volume thumb with glow effect - responsive */}
        <div 
          className={`absolute w-6 h-6 md:w-8 md:h-8 bg-white rounded-full shadow-xl transition-all duration-300 border-2 border-green-400 ${
            isDragging ? 'scale-110 shadow-green-500/50' : 'group-hover/slider:scale-105'
          }`}
          style={{ 
            left: `${volumePercentage}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            ...(isDragging && {
              boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)'
            })
          }}
        />
        
        {/* Volume percentage tooltip - responsive positioning */}
        {(showVolumeTooltip || isDragging) && (
          <div 
            className="absolute -top-12 md:-top-16 bg-gray-900/95 backdrop-blur-sm text-white px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap pointer-events-none transition-all duration-200 border border-green-500/30 shadow-lg z-50"
            style={{ 
              left: `${volumePercentage}%`,
              transform: 'translate(-50%,-50%)',
              minWidth: 'max-content'
            }}
            role="tooltip"
          >
            {isMuted ? 'Muted' : `${volumePercentage}%`}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] md:border-l-[8px] md:border-r-[8px] md:border-t-[8px] border-transparent border-t-gray-900/95" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Enhanced Volume Control Component - Refactored for LTR
 */
const VolumeControl = ({ 
  volume, 
  isMuted, 
  handleVolumeChange, 
  toggleMute 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVolumeTooltip, setShowVolumeTooltip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [helpTimeout, setHelpTimeout] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const volumeRef = useRef(null);
  const buttonRef = useRef(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard controls for desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === buttonRef.current && !isMobile) {
        let newVolume;
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowRight':
            e.preventDefault();
            newVolume = Math.min(1, volume + 0.05);
            handleVolumeChange({ target: { value: newVolume } });
            setShowVolumeTooltip(true);
            clearTimeout(helpTimeout);
            setHelpTimeout(setTimeout(() => setShowVolumeTooltip(false), 1500));
            break;
          case 'ArrowDown':
          case 'ArrowLeft':
            e.preventDefault();
            newVolume = Math.max(0, volume - 0.05);
            handleVolumeChange({ target: { value: newVolume } });
            setShowVolumeTooltip(true);
            clearTimeout(helpTimeout);
            setHelpTimeout(setTimeout(() => setShowVolumeTooltip(false), 1500));
            break;
          case 'Home':
            e.preventDefault();
            handleVolumeChange({ target: { value: 1 } });
            setShowVolumeTooltip(true);
            clearTimeout(helpTimeout);
            setHelpTimeout(setTimeout(() => setShowVolumeTooltip(false), 1500));
            break;
          case 'End':
            e.preventDefault();
            handleVolumeChange({ target: { value: 0 } });
            setShowVolumeTooltip(true);
            clearTimeout(helpTimeout);
            setHelpTimeout(setTimeout(() => setShowVolumeTooltip(false), 1500));
            break;
          case ' ':
          case 'Enter':
            e.preventDefault();
            toggleMute();
            setShowVolumeTooltip(true);
            clearTimeout(helpTimeout);
            setHelpTimeout(setTimeout(() => setShowVolumeTooltip(false), 1000));
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(helpTimeout);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [volume, handleVolumeChange, toggleMute, helpTimeout, isMobile]);

  const handleSliderChange = (e) => {
    // Ensure we have a valid target element
    const targetElement = e.currentTarget || volumeRef.current;
    if (!targetElement || typeof targetElement.getBoundingClientRect !== 'function') {
      return;
    }
    
    const rect = targetElement.getBoundingClientRect();
    let clientX;
    
    // Handle both mouse and touch events
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
    } else if (e.changedTouches && e.changedTouches[0]) {
      clientX = e.changedTouches[0].clientX;  
    } else if (e.clientX !== undefined) {
      clientX = e.clientX;
    } else {
      return; // No valid clientX found
    }
    
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const validVolume = Math.max(0, Math.min(1, pos));
    
    handleVolumeChange({ target: { value: validVolume } });
    setShowVolumeTooltip(true);
    
    // Hide tooltip after a delay
    setTimeout(() => setShowVolumeTooltip(false), 1000);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleSliderChange(e);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleSliderChange(e);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);
    
    const handleGlobalMouseMove = (e) => {
      if (isDragging && volumeRef.current) {
        // Create a synthetic event with currentTarget for global moves
        const syntheticEvent = {
          ...e,
          currentTarget: volumeRef.current
        };
        handleSliderChange(syntheticEvent);
      }
    };
    
    const handleGlobalTouchMove = (e) => {
      if (isDragging && volumeRef.current) {
        // Create a synthetic event with currentTarget for global moves
        const syntheticEvent = {
          ...e,
          currentTarget: volumeRef.current
        };
        handleSliderChange(syntheticEvent);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('touchmove', handleGlobalTouchMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, [isDragging]);

  const volumePercentage = Math.round(volume * 100);

  return (
    <div 
      className="flex items-center gap-2 md:gap-4 group relative"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Enhanced Volume Button - Responsive */}
      <button
        ref={buttonRef}
        onClick={toggleMute}
        className={`relative flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-gray-800/60 backdrop-blur-md hover:bg-gray-700/70 rounded-lg md:rounded-xl transition-all duration-300 border ${
          isMuted ? 'border-red-500/50 shadow-lg shadow-red-500/20' : 'border-green-500/30 hover:border-green-400/50'
        } hover:scale-105 active:scale-95`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        aria-pressed={isMuted}
        tabIndex={0}
        role="button"
      >
        <VolumeIcon volume={volume} isMuted={isMuted} />
        
        {/* Status indicator - smaller on mobile */}
        <div className={`absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
          isMuted ? 'bg-red-500 animate-pulse' : volume > 0.7 ? 'bg-green-500' : volume > 0.3 ? 'bg-yellow-500' : 'bg-gray-500'
        }`} />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-lg md:rounded-xl bg-white/10 scale-0 group-active:scale-100 transition-transform duration-200" />
      </button>

      {/* Volume Slider */}
      <VolumeSlider
        volume={volume}
        isMuted={isMuted}
        volumePercentage={volumePercentage}
        isDragging={isDragging}
        showVolumeTooltip={showVolumeTooltip}
        isHovered={isHovered}
        isMobile={isMobile}
        volumeRef={volumeRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
};

export default VolumeControl;
