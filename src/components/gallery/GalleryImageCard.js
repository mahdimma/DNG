import React, { useState, useRef, useEffect } from "react";

const GalleryImageCard = ({ image, index, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef();

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

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  const handleImageLoad = (e) => {
    setImageLoaded(true);
    e.target.style.display = 'block';
    if (e.target.nextSibling) {
      e.target.nextSibling.style.display = 'none';
    }
  };

  return (
    <div 
      ref={imgRef}
      className="card group cursor-pointer overflow-hidden p-0 transform transition-all duration-300 hover:scale-105"
      onClick={() => onClick && onClick(index)}
    >
      <div className="relative overflow-hidden">
        {/* Main Image - only load when visible */}
        {isVisible ? (
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
          // Placeholder while not visible
          <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-500 animate-pulse">
            <div className="text-4xl mb-2">📷</div>
            <div className="text-center px-4">
              <div className="font-medium">{image.title}</div>
              <div className="text-sm mt-1 opacity-75">در حال بارگذاری...</div>
            </div>
          </div>
        )}
        
        {/* Fallback placeholder for error */}
        <div 
          className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex-col items-center justify-center text-gray-500"
          style={{ display: 'none' }}
        >
          <div className="text-4xl mb-2">📷</div>
          <div className="text-center px-4">
            <div className="font-medium">{image.title}</div>
            <div className="text-sm mt-1 opacity-75">تصویر در دسترس نیست</div>
          </div>
        </div>

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
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
          {image.title}
        </h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {image.description}
        </p>
        
        {/* Image metadata */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{image.photographer}</span>
          <span>{new Date(image.date).toLocaleDateString('fa-IR')}</span>
        </div>
        
        {/* Tags */}
        {image.tags && image.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {image.tags.slice(0, 3).map((tag, tagIndex) => (
              <span 
                key={tagIndex}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
            {image.tags.length > 3 && (
              <span className="text-gray-400 text-xs">+{image.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryImageCard;
