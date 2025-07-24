import React, { useState, useRef, useEffect } from "react";

const GalleryVideoCard = ({ video, index, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoError = (e) => {
    console.error('Video loading error:', e);
    const videoElement = e.target;
    const container = videoElement.closest('.relative');
    if (container) {
      const errorIndicator = container.querySelector('.video-error-indicator');
      if (errorIndicator) {
        errorIndicator.style.display = 'flex';
      }
      videoElement.style.display = 'none';
      const loadingIndicator = container.querySelector('.video-loading-indicator');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
    }
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getDurationText = (duration) => {
    if (!duration) return '0:00';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className={`card group cursor-pointer overflow-hidden p-0 transform transition-all duration-300 hover:scale-105 flex flex-col bg-white rounded-lg shadow-md ${video.featured ? 'border-2 border-primary-500' : ''}`}
      onClick={() => onClick && onClick(index)}
    >
      <div className="relative overflow-hidden">
        {/* Video indicator badge */}
        <div className="absolute top-2 left-2 z-10 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 5v10l7-5-7-5z" />
          </svg>
          ویدیو
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute top-2 right-2 z-10 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
            {getDurationText(video.duration)}
          </div>
        )}

        {/* Main Video - only load when visible */}
        {isVisible ? (
          <div className="relative">
            <video
              ref={videoRef}
              className={`w-full h-64 object-cover transition-opacity duration-500 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={handleVideoError}
              onLoadedData={handleVideoLoad}
              onLoadedMetadata={handleVideoLoad}
              poster={video.thumbnail}
              preload="metadata"
              muted
              playsInline
              src={video.url}
            >
              <source src={video.url} type="video/mp4" />
              {video.webmUrl && <source src={video.webmUrl} type="video/webm" />}
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
            </video>
            
            {/* Loading Indicator */}
            {!videoLoaded && (
              <div className="video-loading-indicator absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
                <div className="text-4xl mb-2">🎬</div>
                <div className="text-center px-4">
                  <div className="font-medium">{video.title}</div>
                  <div className="text-sm mt-1 opacity-75">در حال بارگذاری...</div>
                </div>
              </div>
            )}

            {/* Error Indicator */}
            <div 
              className="video-error-indicator hidden absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex-col items-center justify-center text-gray-500"
            >
              <div className="text-4xl mb-2">🎬</div>
              <div className="text-center px-4">
                <div className="font-medium">{video.title}</div>
                <div className="text-sm mt-1 opacity-75">ویدیو در دسترس نیست</div>
              </div>
            </div>

            {/* Play/Pause overlay */}
            {videoLoaded && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={togglePlay}
              >
                <div className="bg-black/50 rounded-full p-4 transform transition-all duration-200 hover:scale-110">
                  {isPlaying ? (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l7-5-7-5z" />
                    </svg>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Placeholder while not visible
          <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-500 animate-pulse">
            <div className="text-4xl mb-2">🎬</div>
            <div className="text-center px-4">
              <div className="font-medium">{video.title}</div>
              <div className="text-sm mt-1 opacity-75">در حال بارگذاری...</div>
            </div>
          </div>
        )}
        
        {/* Hover overlay with info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
          <div className="text-white">
            <div className="font-semibold text-sm mb-1">{video.title}</div>
            <div className="flex items-center justify-end text-xs mt-2">
              {video.videographer && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5z" clipRule="evenodd" />
                  </svg>
                  {video.videographer}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-sm text-gray-800 truncate mb-1">{video.title}</h3>
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">{video.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{new Date(video.date).toLocaleDateString('fa-IR')}</span>
          {video.videographer && <span>{video.videographer}</span>}
        </div>
      </div>
    </div>
  );
};

export default GalleryVideoCard;
