import { useMemo } from "react";
import galleryJsonData from "../../content/gallery.json";

// Search cache for performance optimization
const searchCache = new Map();

const useGalleryData = () => {
  // Transform the imported JSON data into a dynamic format
  const galleryData = useMemo(() => {
    try {
      const categories = Object.keys(galleryJsonData).map(key => {
        const category = galleryJsonData[key];
        return {
          id: key,
          title: key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          titlePersian: category?.title || '',
          images: category?.images || []
        };
      });

      return { categories };
    } catch (error) {
      console.error('Error loading gallery data:', error);
      return {
        categories: []
      };
    }
  }, []);

  const getImagesByCategory = (categoryId) => {
    const category = galleryData.categories.find(cat => cat.id === categoryId);
    return category ? category.images : [];
  };

  const getFeaturedImages = () => {
    return galleryData.categories
      .flatMap(category => 
        category.images
          .filter(image => image.featured)
          .map(image => ({
            ...image,
            categoryId: category.id,
            categoryTitle: category.titlePersian
          }))
      );
  };

  const getAllImages = () => {
    return galleryData.categories.flatMap(category => 
      category.images.map(image => ({
        ...image,
        categoryId: category.id,
        categoryTitle: category.titlePersian
      }))
    );
  };

  const searchImages = (searchTerm) => {
    // Cache search results for performance
    if (searchCache.has(searchTerm)) {
      return searchCache.get(searchTerm);
    }
    
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    
    // Pre-filter categories to only process necessary ones
    const results = galleryData.categories
      .flatMap(category => 
        category.images
          // Use faster conditionals - check title first as most likely match
          .filter(image => {
            if (image.title && image.title.toLowerCase().includes(term)) return true;
            if (image.description && image.description.toLowerCase().includes(term)) return true;
            // Only check tags if the above failed
            if (image.tags && Array.isArray(image.tags)) {
              for (const tag of image.tags) {
                if (tag && tag.toLowerCase().includes(term)) return true;
              }
            }
            // Only check creator as last resort
            return image.type === 'video' 
              ? (image.videographer && image.videographer.toLowerCase().includes(term))
              : (image.photographer && image.photographer.toLowerCase().includes(term));
          })
          .map(image => ({
            ...image,
            categoryId: category.id,
            categoryTitle: category.titlePersian
          }))
      );
    
    // Cache the results with a size limit to prevent memory issues
    if (searchCache.size > 50) {
      const firstKey = searchCache.keys().next().value;
      searchCache.delete(firstKey);
    }
    searchCache.set(searchTerm, results);
    return results;
  };

  const getStatistics = () => {
    const allMedia = galleryData.categories.flatMap(category => category.images);
    const totalImages = allMedia.filter(media => !media.type || media.type === 'image').length;
    const totalVideos = allMedia.filter(media => media.type === 'video').length;
    const totalFeatured = allMedia.filter(media => media.featured).length;
    
    return {
      totalImages,
      totalVideos,
      totalMedia: totalImages + totalVideos,
      totalCategories: galleryData.categories.length,
      totalFeatured,
      lastUpdated: new Date().toISOString()
    };
  };

  const clearSearchCache = () => {
    searchCache.clear();
  };

  return {
    galleryData,
    loading: false,
    error: null,
    getImagesByCategory,
    getFeaturedImages,
    getAllImages,
    searchImages,
    getStatistics,
    clearSearchCache
  };
};

export default useGalleryData;
