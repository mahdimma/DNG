// File: src/components/GalleryStatsSection.jsx (or .tsx)

import React, { memo } from "react";

/**
 * A section component to display media gallery statistics.
 * Optimized for performance by removing expensive CSS filters like backdrop-blur.
 *
 * @param {Object} props
 * @param {Object} props.statistics - An object containing the statistical data.
 * @param {number} [props.statistics.totalMedia=0] - Total number of media items.
 * @param {number} [props.statistics.totalImages=0] - Total number of images.
 * @param {number} [props.statistics.totalVideos=0] - Total number of videos.
 * @param {number} [props.statistics.totalCategories=0] - Total number of categories.
 * @param {number} [props.statistics.totalFeatured=0] - Total number of featured items.
 * @param {string} [props.statistics.lastUpdated] - ISO date string of the last update.
 */
const GalleryStatsSection = memo(({ statistics }) => {
  // Provide default values if statistics prop is missing or incomplete
  const { 
    totalImages = 0, 
    totalVideos = 0, 
    totalMedia = 0, 
    totalCategories = 0, 
    totalFeatured = 0, 
    lastUpdated 
  } = statistics || {};
  
  /**
   * Formats a date string into a localized Persian date.
   * @param {string} dateString - The ISO date string to format.
   * @returns {string} The formatted date or 'نامشخص' if invalid.
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'نامشخص';
    try {
      // Ensure consistent date formatting using the Persian locale
      return new Date(dateString).toLocaleDateString('fa-IR');
    } catch (error) {
      // Gracefully handle invalid date strings
      console.warn("Invalid date string provided to formatDate:", dateString, error);
      return 'نامشخص';
    }
  };

  /**
   * Formats a number into a localized Persian string with commas.
   * @param {number} num - The number to format.
   * @returns {string} The formatted number string.
   */
  const formatNumber = (num) => {
    // Use the Persian locale for number formatting (adds commas)
    return num.toLocaleString('fa-IR');
  };

  // --- Main Render ---
  return (
    <section 
      // Main container with gradient background and padding/margin
      className="px-4 py-12 bg-gradient-to-r from-primary-400 to-primary-500 rounded-2xl mb-16"
    >
      <div 
        // Center content within the section
        className="text-center"
      >
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          آمار گالری رسانه‌ها
        </h2>
        
        {/* Grid of Statistic Cards */}
        {/* Responsive grid: 2 cols on small screens, 3 on medium, 6 on large */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          
          {/* Total Media Card */}
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              {formatNumber(totalMedia)}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">کل رسانه‌ها</div>
          </div>
          
          {/* Total Images Card */}
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              📷 {formatNumber(totalImages)}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">تصاویر</div>
          </div>
          
          {/* Total Videos Card */}
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
              🎥 {formatNumber(totalVideos)}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">ویدیوها</div>
          </div>
          
          {/* Total Categories Card */}
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
              📁 {formatNumber(totalCategories)}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">دسته‌بندی</div>
          </div>
          
          {/* Total Featured Card */}
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
              ⭐ {formatNumber(totalFeatured)}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">ویژه</div>
          </div>
          
          {/* "Love for the Village" Card */}
          <div className="text-center bg-white/50 rounded-lg p-4">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
              ❤️
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">عشق به روستا</div>
          </div>
        </div>
        
        {/* Last Updated Information */}
        {/* Only render if lastUpdated data exists */}
        {lastUpdated && (
          <div className="mt-8 text-sm text-gray-600 bg-white/30 rounded-lg p-3 inline-block">
            <span className="font-medium">آخرین بروزرسانی:</span> {formatDate(lastUpdated)}
          </div>
        )}
      </div>
    </section>
  );
});

// Set a display name for better debugging in React DevTools
GalleryStatsSection.displayName = 'GalleryStatsSection';

export default GalleryStatsSection;