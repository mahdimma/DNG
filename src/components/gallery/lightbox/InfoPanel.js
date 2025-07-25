import React from "react";

const InfoPanel = ({ media, isVideo, containerRef }) => (
  <div 
    ref={containerRef}
    className="w-full md:w-1/4 h-full max-h-48 md:max-h-full bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 overflow-y-auto"
  >
    <h3 className="text-white text-xl font-semibold mb-2">{media.title}</h3>
    <p className="text-white/80 text-sm mb-4">{media.description}</p>
    <div className="border-t border-white/20 pt-4">
      <div className="flex items-center justify-between text-white/70 text-sm mb-2">
        <span>{isVideo ? 'فیلمبردار' : 'عکاس'}:</span>
        <span className="font-medium text-white">
          {media.videographer || media.photographer}
        </span>
      </div>
      <div className="flex items-center justify-between text-white/70 text-sm mb-4">
        <span>تاریخ:</span>
        <span className="font-medium text-white">
          {new Date(media.date).toLocaleDateString('fa-IR')}
        </span>
      </div>
      {media.views && (
        <div className="flex items-center justify-between text-white/70 text-sm mb-4">
          <span>بازدید:</span>
          <span className="font-medium text-white">{media.views}</span>
        </div>
      )}
      {media.tags && media.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {media.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-white/20 text-white px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default InfoPanel;
