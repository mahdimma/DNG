import React from "react";

const GalleryStatsSection = ({ statistics }) => {
  const { 
    totalImages = 0, 
    totalVideos = 0, 
    totalMedia = 0, 
    totalCategories = 0, 
    totalFeatured = 0, 
    lastUpdated 
  } = statistics || {};
  
  const formatDate = (dateString) => {
    if (!dateString) return 'نامشخص';
    try {
      return new Date(dateString).toLocaleDateString('fa-IR');
    } catch {
      return 'نامشخص';
    }
  };

  const formatNumber = (num) => {
    return num.toLocaleString('fa-IR');
  };
  
  return (
    <section className="px-4 py-12 bg-gradient-to-r from-primary-400 to-primary-500 rounded-2xl mb-16">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          آمار گالری رسانه‌ها
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="text-center bg-white/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              {formatNumber(totalMedia)}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">کل رسانه‌ها</div>
          </div>
          
          <div className="text-center bg-white/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              📷 {formatNumber(totalImages)}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">تصاویر</div>
          </div>
          
          <div className="text-center bg-white/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
              🎥 {formatNumber(totalVideos)}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">ویدیوها</div>
          </div>
          
          <div className="text-center bg-white/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
              📁 {formatNumber(totalCategories)}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">دسته‌بندی</div>
          </div>
          
          <div className="text-center bg-white/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
              ⭐ {formatNumber(totalFeatured)}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">ویژه</div>
          </div>
          
          <div className="text-center bg-white/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
              ❤️
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">عشق به روستا</div>
          </div>
        </div>
        
        {lastUpdated && (
          <div className="mt-8 text-sm text-gray-600 bg-white/30 rounded-lg p-3 inline-block backdrop-blur-sm">
            <span className="font-medium">آخرین بروزرسانی:</span> {formatDate(lastUpdated)}
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryStatsSection;
