import React, { useState, memo, useCallback } from "react";
import GalleryMediaCard from "./GalleryMediaCard";
import GalleryLightbox from "./GalleryLightbox";

// Memoize individual media cards for better performance
const MemoizedMediaCard = memo(GalleryMediaCard);
MemoizedMediaCard.displayName = 'MemoizedMediaCard';

const GalleryGrid = ({ images, className = "" }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  return (
    <>
      <div
        className={`flex overflow-x-auto gap-4 p-4 scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 ${className}`}
      >
        {images.map((media, index) => (
          <div key={`${media.categoryId}-${index}`} className="flex-shrink-0 w-80">
            <MemoizedMediaCard
              media={media}
              index={index}
              onClick={openLightbox}
            />
          </div>
        ))}
      </div>

      <GalleryLightbox
        media={images[currentImageIndex]}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={images.length > 1 ? nextImage : null}
        onPrev={images.length > 1 ? prevImage : null}
        currentIndex={currentImageIndex}
        totalImages={images.length}
      />
    </>
  );
};

GalleryGrid.displayName = 'GalleryGrid';

export default GalleryGrid;
