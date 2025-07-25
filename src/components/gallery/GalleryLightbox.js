import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import LoadingSpinner from "./lightbox/LoadingSpinner";
import ErrorDisplay from "./lightbox/ErrorDisplay";
import NavigationControls from "./lightbox/NavigationControls";
import InfoPanel from "./lightbox/InfoPanel";
import ImageDisplay from "./lightbox/ImageDisplay";
import KeyboardInstructions from "./lightbox/KeyboardInstructions";
import { isMediaVideo } from "./lightbox/utils";

// Video Controls Component
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
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-black/60 backdrop-blur-sm rounded-b-lg p-3">
      <div 
        className="modern-progress-bar w-full h-1.5 bg-white/20 rounded-full mb-3 cursor-pointer group relative overflow-hidden"
        onClick={handleSeek}
      >
        <div className="modern-progress-track absolute inset-0 bg-white/10 rounded-full"></div>
        
        <div 
          className="absolute inset-0 bg-white/20 rounded-full opacity-30 transition-all duration-300"
          style={{ width: `${videoBuffered}%` }}
        ></div>
        
        <div 
          className="modern-progress-fill absolute top-0 left-0 h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full transition-all duration-200 ease-out shadow-sm"
          style={{ width: `${videoDuration > 0 ? (videoCurrentTime / videoDuration) * 100 : 0}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-300 to-primary-400 rounded-full opacity-60 blur-sm"></div>
        </div>
        
        <div 
          className="modern-progress-thumb absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 border-2 border-primary-500 cursor-grab active:cursor-grabbing hover:scale-110"
          style={{ 
            left: `calc(${videoDuration > 0 ? (videoCurrentTime / videoDuration) * 100 : 0}% - 6px)`,
            transform: 'translateY(-50%)'
          }}
        >
          <div className="absolute inset-1 bg-primary-500 rounded-full"></div>
        </div>
        
        <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        
        <div 
          className="modern-progress-tooltip absolute -top-8 bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono"
          style={{ 
            left: `calc(${videoDuration > 0 ? (videoCurrentTime / videoDuration) * 100 : 0}% - 20px)`,
            transform: 'translateX(-50%)'
          }}
        >
          {formatTime(videoCurrentTime)}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="p-2 text-white rounded-full hover:bg-white/20 transition-colors duration-200"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 5v10l7-5-7-5z" />
              </svg>
            )}
          </button>

          <span className="text-white text-sm font-mono">
            {formatTime(videoCurrentTime)} / {formatTime(videoDuration)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
            >
              {isMuted || volume === 0 ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
            <div className="relative w-20 h-1 bg-white/20 rounded-full cursor-pointer group">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="absolute inset-0 bg-white/10 rounded-full"></div>
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/60 to-white/80 rounded-full transition-all duration-200"
                style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
              ></div>
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
                style={{ 
                  left: `calc(${(isMuted ? 0 : volume) * 100}% - 4px)`,
                  transform: 'translateY(-50%)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Video Player Component
const VideoPlayer = forwardRef(({ media, onLoad, onError, mediaLoaded }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(10);
  const [videoBuffered, setVideoBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoNodeRef = useRef(null);

  const videoRef = useCallback(node => {
    const handleTimeUpdate = () => {
      if (videoNodeRef.current) {
        setVideoCurrentTime(videoNodeRef.current.currentTime);
        const buffered = videoNodeRef.current.buffered;
        if (buffered.length > 0) {
          const bufferedEnd = buffered.end(buffered.length - 1);
          const duration = videoNodeRef.current.duration;
          if (duration > 0) {
            setVideoBuffered((bufferedEnd / duration) * 100);
          }
        }
      }
    };
    const handleDurationChange = () => {
        if (videoNodeRef.current) {
            const duration = videoNodeRef.current.duration;
            if (duration && !isNaN(duration) && duration !== Infinity) {
                setVideoDuration(duration);
            }
        }
    };
    const handleLoadedMetadata = () => {
        onLoad();
        handleDurationChange();
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (videoNodeRef.current) {
        videoNodeRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        videoNodeRef.current.removeEventListener("durationchange", handleDurationChange);
        videoNodeRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
        videoNodeRef.current.removeEventListener("play", handlePlay);
        videoNodeRef.current.removeEventListener("pause", handlePause);
    }

    if (node) {
        node.addEventListener("timeupdate", handleTimeUpdate);
        node.addEventListener("durationchange", handleDurationChange);
        node.addEventListener("loadedmetadata", handleLoadedMetadata);
        node.addEventListener("play", handlePlay);
        node.addEventListener("pause", handlePause);
        
        if (node.duration) {
            handleDurationChange();
        }
    }
    videoNodeRef.current = node;
  }, [media?.url, onLoad]);

  const togglePlay = () => {
    if (videoNodeRef.current) {
      if (videoNodeRef.current.paused) {
        videoNodeRef.current.play();
      } else {
        videoNodeRef.current.pause();
      }
    }
  };

  const handleSeek = (e) => {
    if (videoNodeRef.current && videoDuration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newTime = pos * videoDuration;
      videoNodeRef.current.currentTime = newTime;
      setVideoCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoNodeRef.current) {
      videoNodeRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoNodeRef.current) {
      const newMuted = !isMuted;
      videoNodeRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  useImperativeHandle(ref, () => ({
    togglePlay,
    seekForward: (seconds) => {
      if (videoNodeRef.current && videoDuration) {
        const newTime = Math.min(videoDuration, videoCurrentTime + seconds);
        videoNodeRef.current.currentTime = newTime;
        setVideoCurrentTime(newTime);
      }
    },
    seekBackward: (seconds) => {
      if (videoNodeRef.current) {
        const newTime = Math.max(0, videoCurrentTime - seconds);
        videoNodeRef.current.currentTime = newTime;
        setVideoCurrentTime(newTime);
      }
    }
  }));

  return (
    <div className="relative w-full" style={{ maxWidth: '1200px' }}>
      <video
        ref={videoRef}
        className="w-full h-auto object-contain"
        style={{ maxHeight: '80vh', display: mediaLoaded ? 'block' : 'none' }}
        onError={onError}
        poster={media.thumbnail}
        controls={false}
        src={media.url}
        key={media.url}
      >
        مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
      </video>

      {mediaLoaded && (
        <VideoControls
          isPlaying={isPlaying}
          videoCurrentTime={videoCurrentTime}
          videoDuration={videoDuration}
          videoBuffered={videoBuffered}
          volume={volume}
          isMuted={isMuted}
          togglePlay={togglePlay}
          handleSeek={handleSeek}
          handleVolumeChange={handleVolumeChange}
          toggleMute={toggleMute}
        />
      )}
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

// Main GalleryLightbox Component
const GalleryLightbox = ({ media, isOpen, onClose, onNext, onPrev, currentIndex, totalImages }) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const infoContainerRef = useRef();
  const videoPlayerRef = useRef(null);

  const isVideo = isMediaVideo(media);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleArrowKeys = (e) => {
      if (e.key === 'ArrowRight') onNext && onNext();
      if (e.key === 'ArrowLeft') onPrev && onPrev();
      
      if (e.key === ' ' && isVideo && videoPlayerRef.current) {
        e.preventDefault();
        videoPlayerRef.current.togglePlay();
      }
      
      if (isVideo && videoPlayerRef.current) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          videoPlayerRef.current.seekForward(10);
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          videoPlayerRef.current.seekBackward(10);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'hidden';
      setMediaLoaded(false);
      setMediaError(false);
      if (infoContainerRef.current) {
        infoContainerRef.current.scrollTop = 0;
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev, isVideo]);

  const handleMediaLoad = () => {
    setMediaLoaded(true);
    setMediaError(false);
  };

  const handleMediaError = () => {
    setMediaError(true);
    setMediaLoaded(true);
  };

  if (!isOpen || !media) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col md:flex-row items-center justify-center p-4">
      <NavigationControls 
        onClose={onClose} 
        onNext={onNext} 
        onPrev={onPrev}
        currentIndex={currentIndex}
        totalImages={totalImages}
        isVideo={isVideo}
      />

      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-4 pt-16 md:pt-0">
        <div className="relative w-full md:w-3/4 h-auto md:h-full flex items-center justify-center">
          {!mediaLoaded && !mediaError && <LoadingSpinner />}

          {!mediaError ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {isVideo ? (
                <VideoPlayer 
                  ref={videoPlayerRef}
                  media={media}
                  onLoad={handleMediaLoad}
                  onError={handleMediaError}
                  mediaLoaded={mediaLoaded}
                />
              ) : (
                <ImageDisplay 
                  media={media}
                  onLoad={handleMediaLoad}
                  onError={handleMediaError}
                  mediaLoaded={mediaLoaded}
                />
              )}
            </div>
          ) : (
            <ErrorDisplay 
              media={media}
              isVideo={isVideo}
              onRetry={() => {
                setMediaError(false);
                setMediaLoaded(false);
              }} 
            />
          )}
        </div>

        {mediaLoaded && (
          <InfoPanel 
            media={media}
            isVideo={isVideo}
            containerRef={infoContainerRef}
          />
        )}
      </div>

      <KeyboardInstructions isVideo={isVideo} />
    </div>
  );
};

export default GalleryLightbox;
