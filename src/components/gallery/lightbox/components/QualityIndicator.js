import React from "react";

/**
 * Quality Indicator Component
 */
const QualityIndicator = () => {
  return (
    <div className="hidden lg:flex items-center gap-1.5 px-2 py-1.5 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-green-500/20">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      <span className="text-white text-xs font-medium">HD</span>
    </div>
  );
};

export default QualityIndicator;
