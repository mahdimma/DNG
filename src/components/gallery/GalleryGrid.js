import React, { useState } from "react";
import GalleryImageCard from "./GalleryImageCard";
import GalleryLightbox from "./GalleryLightbox";

const GalleryGrid = ({ images, className = "" }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <div
        className={`flex overflow-x-auto gap-4 p-4 scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 ${className}`}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-80">
            <GalleryImageCard
              image={image}
              index={index}
              onClick={openLightbox}
            />
          </div>
        ))}
      </div>

      <GalleryLightbox
        image={images[currentImageIndex]}
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

export default GalleryGrid;
