import React from "react";
import { formatDisplayTime } from "./utils";
import styles from "../VideoControls.module.css";

const TimeDisplay = ({ 
  videoCurrentTime, 
  videoDuration, 
  rtl, 
  formatTime 
}) => {
  return (
    <div className={`${styles.timeDisplay} text-white text-base font-persian font-medium select-none bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10`}>
      <span className="tabular-nums text-emerald-400 font-semibold">
        {formatDisplayTime(videoCurrentTime, formatTime, rtl)}
      </span>
      <span className="mx-3 opacity-60 text-white/80">
        {rtl ? '/' : '/'}
      </span>
      <span className="tabular-nums opacity-90">
        {formatDisplayTime(videoDuration, formatTime, rtl)}
      </span>
    </div>
  );
};

export default TimeDisplay;
