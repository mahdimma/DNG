import React from "react";

const GalleryIntroSection = () => {
  return (
    <section className="text-center mb-16 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-slide-in">
          گالری روستای دنگپیا
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-8"></div>
        
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 animate-fade-in">
          زیبایی‌های روستای دنگپیا را در این گالری تصاویر مشاهده کنید. از زندگی روزمره تا رویدادهای ویژه، 
          این تصاویر نمایانگر روح جامعه ما هستند.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl mb-4">🏞️</div>
          <h3 className="font-semibold text-gray-900 mb-2">طبیعت بکر</h3>
          <p className="text-sm text-gray-600">
            مناظر خیره‌کننده طبیعی روستا
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl mb-4">🎭</div>
          <h3 className="font-semibold text-gray-900 mb-2">فرهنگ غنی</h3>
          <p className="text-sm text-gray-600">
            رویدادها و سنت‌های محلی
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl mb-4">👥</div>
          <h3 className="font-semibold text-gray-900 mb-2">جامعه پویا</h3>
          <p className="text-sm text-gray-600">
            لحظات زیبای زندگی روزمره
          </p>
        </div>
      </div>
    </section>
  );
};

export default GalleryIntroSection;
