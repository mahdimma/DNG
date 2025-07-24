import React from "react";

const GalleryStatsSection = ({ statistics }) => {
  const { totalImages = 0, totalCategories = 0, totalFeatured = 0, lastUpdated } = statistics || {};
  
  const formatDate = (dateString) => {
    if (!dateString) return 'نامشخص';
    try {
      return new Date(dateString).toLocaleDateString('fa-IR');
    } catch {
      return 'نامشخص';
    }
  };
  
  return (
    <section className="py-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl mb-16">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          آمار گالری تصاویر
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              {totalImages}
            </div>
            <div className="text-gray-700 font-medium">تصویر</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              {totalCategories}
            </div>
            <div className="text-gray-700 font-medium">دسته‌بندی</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-secondary-600 mb-2">
              {totalFeatured}
            </div>
            <div className="text-gray-700 font-medium">تصویر ویژه</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              ❤️
            </div>
            <div className="text-gray-700 font-medium">عشق به روستا</div>
          </div>
        </div>
        
        {lastUpdated && (
          <div className="mt-6 text-sm text-gray-600">
            آخرین بروزرسانی: {formatDate(lastUpdated)}
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryStatsSection;
