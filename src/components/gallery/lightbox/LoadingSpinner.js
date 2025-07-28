import React from "react";

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-emerald-900/10 backdrop-blur-sm">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;