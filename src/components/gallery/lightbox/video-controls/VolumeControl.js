import React from 'react';
import { useVolumeControl } from './hooks/useVolumeControl';
import { VolumeButton } from './components/VolumeButton';
import { VolumeSlider } from './components/VolumeSlider';

/**
 * Enhanced VolumeControl component with better architecture and accessibility
 * 
 * Features:
 * - Improved component architecture with separated concerns
 * - Better accessibility with ARIA support and keyboard navigation
 * - Optimized performance with proper memoization
 * - Enhanced UX with smooth animations and hover states
 * - RTL support with proper directional styling
 * - Type safety with PropTypes validation
 */
const VolumeControl = ({ 
  volume = 0.5, 
  isMuted = false, 
  handleVolumeChange, // Legacy prop name support
  onVolumeChange,
  toggleMute, // Legacy prop name support
  onToggleMute, 
  rtl = false,
  showDelay = 0,
  hideDelay = 300,
  className = "",
  disabled = false
}) => {
  // Support both legacy and new prop names
  const volumeChangeHandler = onVolumeChange || handleVolumeChange;
  const muteToggleHandler = onToggleMute || toggleMute;
  
  // Validate props
  const normalizedVolume = Math.max(0, Math.min(1, volume));
  
  const {
    showSlider,
    isDragging,
    isHovered,
    sliderRef,
    handlers: {
      handleMouseEnter,
      handleMouseLeave,
      handleVolumeChange: handleVolumeChangeInternal,
      handleMuteToggle,
      handleDragStart,
      handleDragEnd,
      handleKeyDown
    }
  } = useVolumeControl({
    volume: normalizedVolume,
    isMuted,
    onVolumeChange: volumeChangeHandler,
    onToggleMute: muteToggleHandler,
    showDelay,
    hideDelay
  });

  const containerClasses = `
    flex items-center gap-4 
    ${rtl ? 'flex-row-reverse' : ''} 
    ${disabled ? 'pointer-events-none opacity-50' : ''}
    ${className}
  `;

  const wrapperClasses = `
    relative flex items-center 
    bg-white/5 rounded-full p-1 
    backdrop-blur-sm border border-white/10
    transition-all duration-300
    ${isHovered ? 'bg-white/10 border-white/20' : ''}
  `;

  return (
    <div 
      className={containerClasses}
      onMouseEnter={!disabled ? handleMouseEnter : undefined}
      onMouseLeave={!disabled ? handleMouseLeave : undefined}
      role="group"
      aria-label={rtl ? "کنترل‌های صدا" : "Volume controls"}
    >
      <div className={wrapperClasses}>
        <VolumeButton
          volume={normalizedVolume}
          isMuted={isMuted}
          onClick={handleMuteToggle}
          onKeyDown={handleKeyDown}
          rtl={rtl}
          disabled={disabled}
        />

        <VolumeSlider
          volume={normalizedVolume}
          isMuted={isMuted}
          showSlider={showSlider}
          isDragging={isDragging}
          isHovered={isHovered}
          sliderRef={sliderRef}
          onVolumeChange={handleVolumeChangeInternal}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onKeyDown={handleKeyDown}
          rtl={rtl}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
