import React from "react";
import { formatTime } from "./utils";

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

export default VideoControls;
