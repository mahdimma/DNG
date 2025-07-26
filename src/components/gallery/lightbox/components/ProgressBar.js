import React, { useState, useRef, useEffect } from "react";

/**
 * Enhanced Progress Bar Component - Responsive
 */
const ProgressBar = ({ 
  videoCurrentTime, 
  videoDuration, 
  videoBuffered, 
  handleSeek, 
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
    setIsHovered(false);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleSeek(e);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    const mouseEvent = { clientX: touch.clientX, currentTarget: e.currentTarget };
    handleSeek(mouseEvent);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);
    
    const handleGlobalMouseMove = (e) => {
      if (isDragging && progressRef.current) {
        // Create a synthetic event with currentTarget for global moves
        const syntheticEvent = {
          ...e,
          currentTarget: progressRef.current
        };
        handleSeek(syntheticEvent);
      }
    };
    
    const handleGlobalTouchMove = (e) => {
      if (isDragging && progressRef.current) {
        const touch = e.touches[0];
        const mouseEvent = { clientX: touch.clientX, currentTarget: progressRef.current };
        handleSeek(mouseEvent);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, [isDragging, handleSeek]);

  return (
    <div className="mb-3 md:mb-6 relative group">
      <div 
        ref={progressRef}
        className={`relative h-1 md:h-1.5 bg-white/15 rounded-full cursor-pointer transition-all duration-300 ${
          isHovered || isDragging ? 'h-1.5 md:h-2 shadow-lg shadow-green-500/20' : ''
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
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
        
        {/* Enhanced progress thumb - smaller on mobile */}
        <div 
          className={`absolute top-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-xl transition-all duration-300 pointer-events-none border-2 border-green-400 ${
            isHovered || isDragging ? 'opacity-100 scale-110 shadow-green-500/50' : 'opacity-0'
          }`}
          style={{ 
            left: `${progress}%`, 
            transform: 'translateY(-50%) translateX(-50%)',
            ...(isDragging && { 
              transform: 'translateY(-50%) translateX(-50%) scale(1.2)',
              boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)'
            })
          }}
        />

        {/* Enhanced time tooltip - responsive positioning */}
        {showTooltip && (
          <div 
            className="absolute -top-8 md:-top-12 bg-gray-900/95 backdrop-blur-sm text-white px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap pointer-events-none transition-all duration-200 border border-green-500/30"
            style={{ 
              left: `${tooltipX}px`, 
              transform: 'translateX(-50%)',
              opacity: showTooltip ? 1 : 0
            }}
          >
            {formatTime(tooltipTime)}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 md:border-l-4 md:border-r-4 md:border-t-4 border-transparent border-t-gray-900/95" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
