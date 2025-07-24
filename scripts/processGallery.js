const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class GalleryProcessor {
  constructor() {
    this.sourceFile = path.join(__dirname, '../content/gallery.json');
    this.outputFile = path.join(__dirname, '../public/content/gallery.json');
    this.categoryMapping = {
      'village-life': 'Village Life',
      'events-festivals': 'Events Festivals',
      'nature-landscape': 'Nature Landscape',
      'historical-sites': 'Historical Sites'
    };
  }

  generateImageId(categoryId, imageIndex) {
    return `${categoryId}-${imageIndex + 1}`;
  }

  generateThumbnailUrl(originalUrl) {
    // Convert the original URL to a thumbnail URL
    if (originalUrl.includes('unsplash.com')) {
      return originalUrl.replace(/w=\d+&h=\d+/, 'w=400&h=300');
    }
    return originalUrl; // Fallback to original URL
  }

  processImage(image, categoryId, index) {
    return {
      id: this.generateImageId(categoryId, index),
      title: image.title, // Keep English title for compatibility
      titlePersian: image.title,
      description: image.description,
      url: image.url,
      thumbnailUrl: this.generateThumbnailUrl(image.url),
      photographer: image.photographer,
      date: image.date,
      tags: image.tags || [],
      featured: image.featured || false,
      // Auto-generated fields
      createdAt: new Date().toISOString(),
      hash: crypto.createHash('md5').update(image.url + image.title).digest('hex')
    };
  }

  processCategory(categoryData, categoryId) {
    const processedImages = categoryData.images.map((image, index) => 
      this.processImage(image, categoryId, index)
    );

    return {
      id: categoryId,
      title: this.categoryMapping[categoryId] || categoryId,
      titlePersian: categoryData.titlePersian,
      description: categoryData.description,
      images: processedImages,
      // Auto-generated metadata
      imageCount: processedImages.length,
      featuredCount: processedImages.filter(img => img.featured).length,
      lastUpdated: new Date().toISOString()
    };
  }

  calculateMetadata(processedCategories) {
    const totalImages = processedCategories.reduce((sum, cat) => sum + cat.imageCount, 0);
    const totalFeatured = processedCategories.reduce((sum, cat) => sum + cat.featuredCount, 0);
    
    return {
      lastUpdated: new Date().toISOString(),
      totalImages,
      totalCategories: processedCategories.length,
      totalFeatured,
      version: "2.0.0",
      buildDate: new Date().toISOString(),
      categories: processedCategories.map(cat => ({
        id: cat.id,
        title: cat.titlePersian,
        count: cat.imageCount
      }))
    };
  }

  async processGallery() {
    try {
      console.log('🖼️  Processing gallery data...');

      // Read source data
      if (!fs.existsSync(this.sourceFile)) {
        throw new Error(`Source file not found: ${this.sourceFile}`);
      }

      const sourceData = JSON.parse(fs.readFileSync(this.sourceFile, 'utf8'));
      
      // Process categories
      const processedCategories = Object.entries(sourceData.categories).map(
        ([categoryId, categoryData]) => this.processCategory(categoryData, categoryId)
      );

      // Generate metadata
      const metadata = this.calculateMetadata(processedCategories);

      // Create output structure
      const outputData = {
        categories: processedCategories,
        metadata
      };

      // Ensure output directory exists
      const outputDir = path.dirname(this.outputFile);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write processed data
      fs.writeFileSync(this.outputFile, JSON.stringify(outputData, null, 2));

      console.log('✅ Gallery processing completed!');
      console.log(`📊 Statistics:`);
      console.log(`   • Categories: ${metadata.totalCategories}`);
      console.log(`   • Total Images: ${metadata.totalImages}`);
      console.log(`   • Featured Images: ${metadata.totalFeatured}`);
      console.log(`   • Output: ${this.outputFile}`);

      return outputData;

    } catch (error) {
      console.error('❌ Error processing gallery:', error.message);
      throw error;
    }
  }

  // Watch for changes in development
  watchForChanges() {
    if (fs.existsSync(this.sourceFile)) {
      fs.watchFile(this.sourceFile, (curr, prev) => {
        console.log('📁 Gallery source file changed, reprocessing...');
        this.processGallery().catch(console.error);
      });
      console.log('👀 Watching for changes in gallery.json...');
    }
  }
}

// Export for use in build scripts
module.exports = GalleryProcessor;

// Run directly if called from command line
if (require.main === module) {
  const processor = new GalleryProcessor();
  
  processor.processGallery()
    .then(() => {
      // In development, watch for changes
      if (process.env.NODE_ENV !== 'production') {
        processor.watchForChanges();
      }
    })
    .catch((error) => {
      console.error('Failed to process gallery:', error);
      process.exit(1);
    });
}
