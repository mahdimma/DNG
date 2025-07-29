import React, { memo } from "react";
import GalleryImageCard from "./GalleryImageCard";
import GalleryVideoCard from "./GalleryVideoCard";

const GalleryMediaCard = memo(({ media, index, onClick }) => {
  // Determine if this is a video or image based on the media type or file extension
  const isVideo = media.type === 'video' || 
                  (media.url && (
                    media.url.includes('.mp4') || 
                    media.url.includes('.webm') || 
                    media.url.includes('.mov') || 
                    media.url.includes('.avi')
                  ));

  if (isVideo) {
    return (
      <GalleryVideoCard
        video={media}
        index={index}
        onClick={onClick}
      />
    );
  }

  return (
    <GalleryImageCard
      image={media}
      index={index}
      onClick={onClick}
    />
  );
});

GalleryMediaCard.displayName = 'GalleryMediaCard';

export default GalleryMediaCard;
