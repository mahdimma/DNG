import React from "react";

const GalleryCategorySection = ({ category, children }) => {
  const getCategoryTitle = (title) => {
    const titles = {
      "Village Life": "زندگی روستایی",
      "Events Festivals": "رویدادها و جشن‌ها", 
      "Nature Landscape": "طبیعت و مناظر",
      "Historical Sites": "مکان‌های تاریخی"
    };
    return titles[title] || title;
  };

  return (
    <section className="mb-16 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        {category.titlePersian || category.title}
      </h2>
        <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
      </div>
      
      {children}
      
      {category.images.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="text-6xl mb-4">🖼️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            هنوز تصویری اضافه نشده
          </h3>
          <p className="text-gray-600">
            به زودی تصاویر این بخش اضافه خواهد شد
          </p>
        </div>
      )}
    </section>
  );
};

export default GalleryCategorySection;
