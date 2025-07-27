import React from "react";

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
);

export default LoadingSpinner;
