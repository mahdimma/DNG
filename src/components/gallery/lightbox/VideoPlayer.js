import React, { useState, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import VideoControls from "./VideoControls";

const VideoPlayer = forwardRef(({ media, onLoad, onError, mediaLoaded }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(10);
  const [videoBuffered, setVideoBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoNodeRef = useRef(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    togglePlay: () => {
      togglePlay();
    },
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

  const videoRef = useCallback(node => {
    const handleTimeUpdate = () => {
      if (videoNodeRef.current) {
        setVideoCurrentTime(videoNodeRef.current.currentTime);
        // Update buffered progress
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

  // Video control functions
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

export default VideoPlayer;
