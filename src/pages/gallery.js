import React, { useState, useMemo } from "react";
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
  
  const { 
    galleryData, 
    getAllImages, 
    searchImages,
    getStatistics
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

  // Get statistics
  const statistics = getStatistics();

  // Filter and search logic
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

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSearchTerm(""); // Reset search term when a filter is applied
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Layout
      title="Gallery"
      description="Explore photos showcasing the beauty, culture, and life of Dangepia Village"
    >
      <HeroSection 
        title="گالری تصاویر"
        subtitle="تصاویری از زیبایی های روستای دانگپیا"
        showButtons={false}
        showScrollIndicator={true}
      />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Gallery Introduction */}
        <GalleryIntroSection />
        
        {/* Gallery Statistics */}
        <GalleryStatsSection statistics={getStatistics()} />
        
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
          galleryCategories.map((category, categoryIndex) => (
            <GalleryCategorySection key={categoryIndex} category={category}>
              <GalleryGrid images={category.images} />
            </GalleryCategorySection>
          ))
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
            
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, categoryIndex) => (
                <GalleryCategorySection key={categoryIndex} category={category}>
                  <GalleryGrid images={category.images} />
                </GalleryCategorySection>
              ))
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
