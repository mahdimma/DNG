import { useMemo } from "react";
import galleryJsonData from "../../content/gallery.json";

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
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    
    return galleryData.categories
      .flatMap(category => 
        category.images
          .filter(image => 
            image.title.toLowerCase().includes(term) ||
            image.description.toLowerCase().includes(term) ||
            image.tags.some(tag => tag.toLowerCase().includes(term)) ||
            image.photographer.toLowerCase().includes(term)
          )
          .map(image => ({
            ...image,
            categoryId: category.id,
            categoryTitle: category.titlePersian
          }))
      );
  };

  const getStatistics = () => {
    const totalImages = galleryData.categories.reduce((total, category) => total + category.images.length, 0);
    const totalFeatured = galleryData.categories.reduce((total, category) => 
      total + category.images.filter(img => img.featured).length, 0);
    
    return {
      totalImages,
      totalCategories: galleryData.categories.length,
      totalFeatured,
      lastUpdated: new Date().toISOString()
    };
  };

  return {
    galleryData,
    loading: false,
    error: null,
    getImagesByCategory,
    getFeaturedImages,
    getAllImages,
    searchImages,
    getStatistics
  };
};

export default useGalleryData;
