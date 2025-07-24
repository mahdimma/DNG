import React, { useState, useEffect, useRef, useCallback } from "react";

const GalleryLightbox = ({ media, isOpen, onClose, onNext, onPrev, currentIndex, totalImages }) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(10);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoNodeRef = useRef(null);

  const videoRef = useCallback(node => {
    const handleTimeUpdate = () => {
      if (videoNodeRef.current) {
        setVideoCurrentTime(videoNodeRef.current.currentTime);
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
        handleMediaLoad();
        handleDurationChange();
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (videoNodeRef.current) {
        // Clean up previous event listeners. Note: this is imperfect because the
        // handler function instances are new on each render. However, the crash
        // was due to using the handlers before they were defined.
        videoNodeRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        videoNodeRef.current.removeEventListener("durationchange", handleDurationChange);
        videoNodeRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
        videoNodeRef.current.removeEventListener("play", handlePlay);
        videoNodeRef.current.removeEventListener("pause", handlePause);
    }

    if (node) {
        // When the video element is mounted, add event listeners
        node.addEventListener("timeupdate", handleTimeUpdate);
        node.addEventListener("durationchange", handleDurationChange);
        node.addEventListener("loadedmetadata", handleLoadedMetadata);
        node.addEventListener("play", handlePlay);
        node.addEventListener("pause", handlePause);
        
        // Initial check in case the metadata is already loaded
        if (node.duration) {
            handleDurationChange();
        }
    }
        // Save node reference
    videoNodeRef.current = node;
  }, [media?.url]); // Re-run effect only if media URL changes

  const infoContainerRef = useRef();

  // Determine if current media is video
  const isVideo = media && (media.type === 'video' || 
                  (media.url && (
                    media.url.includes('.mp4') || 
                    media.url.includes('.webm') || 
                    media.url.includes('.mov') || 
                    media.url.includes('.avi') ||
                    media.url.includes('.ogv')
                  )));

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleArrowKeys = (e) => {
      if (e.key === 'ArrowRight') onNext && onNext();
      if (e.key === 'ArrowLeft') onPrev && onPrev();
      if (e.key === ' ' && isVideo) {
        e.preventDefault();
        togglePlay();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'hidden';
      setMediaLoaded(false);
      setMediaError(false);
      setIsPlaying(false);
      setVideoCurrentTime(0);
      setVideoDuration(0);
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
      const pos = (e.clientX - rect.left) / rect.width;
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

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !media) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col md:flex-row items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Media Counter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
        {currentIndex + 1} از {totalImages}
      </div>

      {/* Media Type Badge */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
        {isVideo ? (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5v10l7-5-7-5z" />
            </svg>
            ویدیو
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            تصویر
          </>
        )}
      </div>

      {/* Previous Button */}
      {onPrev && totalImages > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next Button */}
      {onNext && totalImages > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Media and Info Container */}
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-4 pt-16 md:pt-0">
        {/* Media Container */}
        <div className="relative w-full md:w-3/4 h-auto md:h-full flex items-center justify-center">
          {/* Loading spinner */}
          {!mediaLoaded && !mediaError && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          {!mediaError ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {isVideo ? (
                /* Video Player */
                <div className="relative w-full" style={{ maxWidth: '1200px' }}>
                  <video
                    ref={videoRef}
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '80vh', display: mediaLoaded ? 'block' : 'none' }}
                    onError={handleMediaError}
                    poster={media.thumbnail}
                    controls={false}
                    src={media.url}
                    key={media.url} // Add key to force re-mount on media change
                  >
                    مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                  </video>

                  {/* Video Controls */}
                  {mediaLoaded && (
                    <div className="w-full bg-black/60 backdrop-blur-sm rounded-b-lg p-3">
                      {/* Progress Bar */}
                      <div 
                        className="w-full h-2 bg-gray-600 rounded-full mb-3 cursor-pointer group"
                        onClick={handleSeek}
                      >
                        <div className="h-full bg-primary-500 rounded-full relative">
                          <div 
                            className="h-full bg-primary-500 rounded-full transition-all duration-150"
                            style={{ width: `${videoDuration > 0 ? (videoCurrentTime / videoDuration) * 100 : 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Control Buttons Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Play/Pause Button */}
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

                          {/* Time Display */}
                          <span className="text-white text-sm font-mono">
                            {formatTime(videoCurrentTime)} / {formatTime(videoDuration)}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Volume Control */}
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
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange}
                              className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Image Display */
                <img
                  src={media.url}
                  alt={media.title}
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '90vh', display: mediaLoaded ? 'block' : 'none' }}
                  onLoad={handleMediaLoad}
                  onError={handleMediaError}
                />
              )}
            </div>
          ) : (
            <div className="bg-gray-800 p-12 rounded-lg text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                خطا در بارگذاری {isVideo ? 'ویدیو' : 'تصویر'}
              </h3>
              <p className="text-gray-300 mb-4">
                {media.title}
              </p>
              <button
                onClick={() => {
                  setMediaError(false);
                  setMediaLoaded(false);
                  // You might want to add a mechanism to try a different URL or show a more specific error
                }}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 mr-2"
              >
                تلاش مجدد
              </button>
              <button
                onClick={() => window.open(media.url, '_blank')}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                مشاهده در تب جدید
              </button>
            </div>
          )}
        </div>

        {/* Info Panel */}
        {mediaLoaded && (
          <div 
            ref={infoContainerRef}
            className="w-full md:w-1/4 h-full max-h-48 md:max-h-full bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 overflow-y-auto"
          >
            <h3 className="text-white text-xl font-semibold mb-2">
              {media.title}
            </h3>
            <p className="text-white/80 text-sm mb-4">
              {media.description}
            </p>
            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center justify-between text-white/70 text-sm mb-2">
                <span>
                  {isVideo ? 'فیلمبردار' : 'عکاس'}:
                </span>
                <span className="font-medium text-white">
                  {media.videographer || media.photographer}
                </span>
              </div>
              <div className="flex items-center justify-between text-white/70 text-sm mb-4">
                <span>تاریخ:</span>
                <span className="font-medium text-white">
                  {new Date(media.date).toLocaleDateString('fa-IR')}
                </span>
              </div>
              {media.views && (
                <div className="flex items-center justify-between text-white/70 text-sm mb-4">
                  <span>بازدید:</span>
                  <span className="font-medium text-white">{media.views}</span>
                </div>
              )}
              {media.tags && media.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {media.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-white/20 text-white px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
        ESC برای بستن • ← → برای حرکت {isVideo && '• Space برای پخش/توقف'}
      </div>
    </div>
  );
};

export default GalleryLightbox;
