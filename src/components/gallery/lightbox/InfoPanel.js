import React from "react";

const InfoPanel = ({ media, isVideo, containerRef }) => (
  <div 
    ref={containerRef}
    className="w-full h-full lg:h-full bg-emerald-900/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-emerald-800/30 overflow-y-auto"
  >
    <h3 className="text-emerald-100 text-xl font-bold mb-3 tracking-tight">
      {media.title}
    </h3>
    
    <p className="text-emerald-200/80 text-sm mb-5 leading-relaxed">
      {media.description}
    </p>
    
    <div className="border-t border-emerald-700/40 pt-5">
      <div className="flex items-center justify-between text-emerald-300 text-sm mb-3">
        <span className="font-medium flex items-center">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
          {isVideo ? 'فیلمبردار' : 'عکاس'}:
        </span>
        <span className="font-semibold text-emerald-100">
          {media.videographer || media.photographer}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-emerald-300 text-sm mb-4">
        <span className="font-medium flex items-center">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
          تاریخ:
        </span>
        <span className="font-semibold text-emerald-100">
          {new Date(media.date).toLocaleDateString('fa-IR')}
        </span>
      </div>
      
      {media.views && (
        <div className="flex items-center justify-between text-emerald-300 text-sm mb-4">
          <span className="font-medium flex items-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            بازدید:
          </span>
          <span className="font-semibold text-emerald-100">
            {media.views.toLocaleString('fa-IR')}
          </span>
        </div>
      )}
      
      {media.tags && media.tags.length > 0 && (
        <div className="mt-5">
          <div className="flex flex-wrap gap-2">
            {media.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-emerald-800/40 text-emerald-200 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-emerald-700/50 transition-all duration-200 border border-emerald-700/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default InfoPanel;