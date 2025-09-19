import React, { useState, useMemo, useCallback } from "react";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";

// Import Gallery Components
import GalleryIntroSection from "../components/gallery/GalleryIntroSection";
import GalleryStatsSection from "../components/gallery/GalleryStatsSection";
import GalleryCategorySection from "../components/gallery/GalleryCategorySection";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryFilterTabs from "../components/gallery/GalleryFilterTabs";
import GallerySearchBar from "../components/gallery/GallerySearchBar";
import PhotoSubmissionSection from "../components/gallery/PhotoSubmissionSection";
import GalleryGuidelinesSection from "../components/gallery/GalleryGuidelinesSection";

// Import the custom hook for gallery data
import useGalleryData from "../hooks/useGalleryData";

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;
  
  const { 
    galleryData, 
    getAllImages, 
    searchImages,
    getStatistics,
    clearSearchCache
  } = useGalleryData();

  // Transform gallery data to match component expectations
  const galleryCategories = useMemo(() => {
    if (!galleryData || !galleryData.categories) return [];
    
    return galleryData.categories.map(category => ({
      id: category.id,
      title: category.title,
      titlePersian: category.titlePersian,
      images: category.images
    }));
  }, [galleryData]);

  // Get statistics - memoized for performance
  const statistics = useMemo(() => getStatistics(), [getStatistics]);

  // Filter and search logic - optimized with better caching
  const filteredCategories = useMemo(() => {
    if (!galleryData) return [];
    
    let filtered = [...galleryCategories];
    
    // Apply category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(category => category.id === activeFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchResults = searchImages(searchTerm);
      // Group search results by category
      const categoriesMap = new Map();
      
      searchResults.forEach(image => {
        const categoryTitle = galleryData.categories.find(cat => cat.id === image.categoryId)?.title;
        if (!categoriesMap.has(categoryTitle)) {
          categoriesMap.set(categoryTitle, {
            title: categoryTitle,
            titlePersian: image.categoryTitle,
            images: []
          });
        }
        categoriesMap.get(categoryTitle).images.push(image);
      });
      
      filtered = Array.from(categoriesMap.values());
    }
    
    return filtered;
  }, [galleryCategories, galleryData, activeFilter, searchTerm, searchImages]);

  // Pagination logic - calculate paginated categories
  const paginatedCategories = useMemo(() => {
    if (activeFilter === "all" && !searchTerm) {
      // For "all" view, paginate the categories themselves
      const startIndex = (currentPage - 1) * 3; // Show 3 categories per page
      return filteredCategories.slice(startIndex, startIndex + 3);
    } else {
      // For filtered/search results, paginate images within categories
      return filteredCategories.map(category => ({
        ...category,
        images: category.images.slice(0, imagesPerPage) // Limit images per category
      }));
    }
  }, [filteredCategories, currentPage, imagesPerPage, activeFilter, searchTerm]);

  const totalPages = useMemo(() => {
    if (activeFilter === "all" && !searchTerm) {
      return Math.ceil(filteredCategories.length / 3);
    } else {
      const totalImages = filteredCategories.reduce((sum, cat) => sum + cat.images.length, 0);
      return Math.ceil(totalImages / imagesPerPage);
    }
  }, [filteredCategories, imagesPerPage, activeFilter, searchTerm]);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
    setSearchTerm(""); // Reset search term when a filter is applied
    setCurrentPage(1); // Reset to first page
    clearSearchCache(); // Clear search cache when filter changes
  }, [clearSearchCache]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Layout
      title="Gallery"
      description="Explore photos showcasing the beauty, culture, and life of Dangepia Village"
    >
      <HeroSection 
        title="گالری تصاویر"
        subtitle="تصاویری از زیبایی های روستای دنگپیا"
        showButtons={false}
        showScrollIndicator={true}
      />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Gallery Introduction */}
        <GalleryIntroSection />
        
        {/* Gallery Statistics */}
        <GalleryStatsSection statistics={statistics} />
        
        {/* Search Bar */}
        <GallerySearchBar onSearch={handleSearch} />
        
        {/* Filter Tabs */}
        <GalleryFilterTabs 
          categories={galleryCategories}
          onFilterChange={handleFilterChange}
          activeFilter={activeFilter}
        />
        
        {/* Gallery Content */}
        {activeFilter === "all" && !searchTerm ? (
          // Show all categories when no filter is applied
          <>
            {paginatedCategories.map((category, categoryIndex) => (
              <GalleryCategorySection key={categoryIndex} category={category}>
                <GalleryGrid images={category.images} />
              </GalleryCategorySection>
            ))}
            
            {/* Pagination for categories */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12 mb-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  قبلی
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      currentPage === index + 1
                        ? 'text-white bg-primary-600 border border-primary-600'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  بعدی
                </button>
              </div>
            )}
          </>
        ) : (
          // Show filtered content
          <div className="mb-16">
            {searchTerm && (
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  نتایج جستجو برای "{searchTerm}"
                </h2>
                <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full mt-4"></div>
              </div>
            )}
            
            {paginatedCategories.length > 0 ? (
              <>
                {paginatedCategories.map((category, categoryIndex) => (
                  <GalleryCategorySection key={categoryIndex} category={category}>
                    <GalleryGrid images={category.images} />
                  </GalleryCategorySection>
                ))}
                
                {/* Pagination for filtered results */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-12 mb-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      قبلی
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          currentPage === index + 1
                            ? 'text-white bg-primary-600 border border-primary-600'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      بعدی
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  نتیجه‌ای یافت نشد
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? `هیچ تصویری با عبارت "${searchTerm}" پیدا نشد.`
                    : `در این دسته‌بندی تصویری وجود ندارد.`
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                    setCurrentPage(1);
                  }}
                  className="btn-primary"
                >
                  مشاهده همه تصاویر
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Photo Submission Section */}
        <PhotoSubmissionSection />
        
        {/* Photography Guidelines */}
        <GalleryGuidelinesSection />
      </main>
    </Layout>
  );
};

export default GalleryPage;
