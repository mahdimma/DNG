import React from "react";

const ImageDisplay = ({ media, onLoad, onError, mediaLoaded }) => (
  <img
    src={media.url}
    alt={media.title}
    className="w-full h-full object-contain"
    style={{ maxHeight: '90vh', display: mediaLoaded ? 'block' : 'none' }}
    onLoad={onLoad}
    onError={onError}
  />
);

export default ImageDisplay;
