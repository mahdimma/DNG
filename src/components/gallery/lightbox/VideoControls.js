import React from "react";
import { formatTime } from "./utils";
import styles from "./VideoControls.module.css";
import { 
  ProgressBar, 
  PlayButton, 
  TimeDisplay, 
  VolumeControl, 
  isRTL 
} from "./video-controls";

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

  return (
    <div className={`${styles.videoControls} ${rtl ? styles.rtl : ''} w-full bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-md rounded-b-xl p-6 font-persian`}>
      {/* Progress Bar */}
      <ProgressBar
        videoCurrentTime={videoCurrentTime}
        videoDuration={videoDuration}
        videoBuffered={videoBuffered}
        handleSeek={handleSeek}
        rtl={rtl}
        formatTime={formatTime}
      />

      {/* Enhanced Controls */}
      <div className={`flex items-center ${rtl ? 'justify-between flex-row-reverse' : 'justify-between'}`}>
        {/* Left controls (Play + Time) */}
        <div className={`flex items-center gap-5 ${rtl ? 'flex-row-reverse' : ''}`}>
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

        {/* Enhanced Right controls (Volume) */}
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          handleVolumeChange={handleVolumeChange}
          toggleMute={toggleMute}
          rtl={rtl}
        />
      </div>
    </div>
  );
};

export default VideoControls;
