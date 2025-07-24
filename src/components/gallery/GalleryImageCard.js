import React, { useState, useRef, useEffect } from "react";

const GalleryImageCard = ({ image, index, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
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

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <div 
      ref={containerRef}
      className="card group cursor-pointer overflow-hidden p-0 transform transition-all duration-300 hover:scale-105 flex flex-col bg-white rounded-lg shadow-md"
      onClick={() => onClick && onClick(index)}
    >
      <div className="relative overflow-hidden">
        {/* Main Image - only load when visible */}
        {isVisible && !imageError ? (
          <img
            src={image.url}
            alt={image.title}
            className={`w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        ) : (
          // Placeholder while not visible or on error
          <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-500">
            <div className="text-4xl mb-2">📷</div>
            <div className="text-center px-4">
              <div className="font-medium">{image.title}</div>
              <div className="text-sm mt-1 opacity-75">
                {imageError ? "تصویر در دسترس نیست" : "در حال بارگذاری..."}
              </div>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
        
        {/* Featured badge */}
        {image.featured && (
          <div className="absolute top-3 right-3 bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            ویژه
          </div>
        )}
        
        {/* Zoom overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Hover overlay with info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
          <div className="text-white">
            <div className="font-semibold text-sm mb-1">{image.title}</div>
            <div className="text-xs opacity-90 mb-2 line-clamp-2">{image.description}</div>
          </div>
        </div>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-sm text-gray-800 truncate mb-1">{image.title}</h3>
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">{image.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{new Date(image.date).toLocaleDateString('fa-IR')}</span>
          {image.photographer && <span>{image.photographer}</span>}
        </div>
      </div>
    </div>
  );
};

export default GalleryImageCard;
