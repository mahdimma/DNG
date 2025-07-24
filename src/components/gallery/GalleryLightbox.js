import React, { useState, useEffect } from "react";

const GalleryLightbox = ({ image, isOpen, onClose, onNext, onPrev, currentIndex, totalImages }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleArrowKeys = (e) => {
      if (e.key === 'ArrowRight') onPrev();
      if (e.key === 'ArrowLeft') onNext();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'hidden';
      setImageLoaded(false);
      setImageError(false);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !image) return null;

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
        {currentIndex + 1} از {totalImages}
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

      {/* Image Container */}
      <div className="max-w-4xl max-h-full w-full h-full flex items-center justify-center">
        {/* Loading spinner */}
        {!imageLoaded && !imageError && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {!imageError ? (
          <div className="relative max-w-full max-h-full">
            <img
              src={image.url}
              alt={image.title}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: '85vh', display: imageLoaded ? 'block' : 'none' }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            
            {/* Image Caption */}
            {imageLoaded && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {image.title}
                </h3>
                <p className="text-white/80 text-sm mb-2">
                  {image.description}
                </p>
                <div className="flex items-center justify-between text-white/70 text-sm">
                  <span>عکاس: {image.photographer}</span>
                  <span>{new Date(image.date).toLocaleDateString('fa-IR')}</span>
                </div>
                {image.tags && image.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {image.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-800 p-12 rounded-lg text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              خطا در بارگذاری تصویر
            </h3>
            <p className="text-gray-300 mb-4">
              {image.title}
            </p>
            <button
              onClick={() => window.open(image.url, '_blank')}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              مشاهده در تب جدید
            </button>
          </div>
        )}
      </div>

      {/* Keyboard Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
        ESC برای بستن • ← → برای حرکت
      </div>
    </div>
  );
};

export default GalleryLightbox;
