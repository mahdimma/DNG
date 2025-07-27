import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import LoadingSpinner from "./lightbox/LoadingSpinner";
import ErrorDisplay from "./lightbox/ErrorDisplay";
import NavigationControls from "./lightbox/NavigationControls";
import InfoPanel from "./lightbox/InfoPanel";
import ImageDisplay from "./lightbox/ImageDisplay";
import KeyboardShortcuts from "./lightbox/KeyboardShortcuts";
import VideoControls from "./lightbox/VideoControls";
import { isMediaVideo } from "./lightbox/utils";

// Video Player Component
const VideoPlayer = forwardRef(({ media, onLoad, onError, mediaLoaded }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(10);
  const [videoBuffered, setVideoBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);
  const videoNodeRef = useRef(null);

  const hideControls = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  const resetControlsTimeout = useCallback(() => {
    clearTimeout(controlsTimeoutRef.current);
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(hideControls, 3000);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    } else {
      clearTimeout(controlsTimeoutRef.current);
      setShowControls(true);
    }

    return () => {
      clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, resetControlsTimeout]);

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
    if (videoNodeRef.current && videoDuration && isFinite(videoDuration)) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newTime = pos * videoDuration;
      
      // Ensure newTime is a finite number before assigning
      if (isFinite(newTime) && newTime >= 0) {
        videoNodeRef.current.currentTime = newTime;
        setVideoCurrentTime(newTime);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const rawValue = parseFloat(e.target.value);
    const newVolume = isNaN(rawValue) ? 0 : Math.max(0, Math.min(1, rawValue));
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
    <div 
      className="relative w-full h-full flex items-center justify-center bg-black"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => clearTimeout(controlsTimeoutRef.current)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full max-w-full max-h-full object-contain"
        style={{ 
          minHeight: '300px',
          maxHeight: '50vh',
          display: mediaLoaded ? 'block' : 'none' 
        }}
        onError={onError}
        poster={media.thumbnail}
        controls={false}
        src={media.url}
        key={media.url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
      </video>

      {mediaLoaded && (
        <div 
          className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          onClick={(e) => e.stopPropagation()} // Prevents click from bubbling to the parent div
        >
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
        </div>
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

      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4 pt-12 md:pt-0">
        <div className="relative w-full lg:w-3/4 h-full flex items-center justify-center">
          {!mediaLoaded && !mediaError && <LoadingSpinner />}

          {!mediaError ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center min-h-0">
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
          <div className="w-full lg:w-1/4 h-auto lg:h-full lg:max-h-full overflow-hidden">
            <InfoPanel
              media={media}
              isVideo={isVideo}
              containerRef={infoContainerRef}
            />
          </div>
        )}
      </div>

      <KeyboardShortcuts isVideo={isVideo} />
    </div>
  );
};

export default GalleryLightbox;
