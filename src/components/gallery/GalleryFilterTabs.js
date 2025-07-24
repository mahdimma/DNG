import React from "react";

const GalleryFilterTabs = ({ categories, onFilterChange, activeFilter = "all" }) => {
  const tabs = [
    { 
      key: "all", 
      title: "همه تصاویر", 
      count: categories.reduce((total, cat) => total + cat.images.length, 0) 
    },
    ...categories.map(category => ({
      key: category.id,
      title: category.titlePersian || category.title,
      count: category.images.length
    }))
  ];

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onFilterChange(tab.key)}
            className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
              activeFilter === tab.key
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
            }`}
          >
            {tab.title}
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              activeFilter === tab.key
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryFilterTabs;
