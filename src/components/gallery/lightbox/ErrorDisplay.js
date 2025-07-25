import React from "react";

const ErrorDisplay = ({ media, isVideo, onRetry }) => (
  <div className="bg-gray-800 p-12 rounded-lg text-center">
    <div className="text-6xl mb-4">⚠️</div>
    <h3 className="text-xl font-semibold text-white mb-2">
      خطا در بارگذاری {isVideo ? 'ویدیو' : 'تصویر'}
    </h3>
    <p className="text-gray-300 mb-4">{media.title}</p>
    <button
      onClick={onRetry}
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
);

export default ErrorDisplay;
