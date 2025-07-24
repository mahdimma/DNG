#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const GALLERY_FILE = path.join(__dirname, '../content/gallery.json');

const CATEGORIES = {
  'village-life': 'زندگی روستایی',
  'events-festivals': 'رویدادها و جشن‌ها',
  'nature-landscape': 'طبیعت و مناظر',
  'historical-sites': 'مکان‌های تاریخی'
};

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function displayCategories() {
  console.log('\n📁 دسته‌بندی‌های موجود:');
  Object.entries(CATEGORIES).forEach(([key, value], index) => {
    console.log(`   ${index + 1}. ${key} (${value})`);
  });
  console.log('');
}

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
  }
  return date.toISOString().split('T')[0];
}

async function addNewImage() {
  try {
    console.log('🖼️  اضافه کردن تصویر جدید به گالری\n');

    // Read current gallery data
    let galleryData;
    if (fs.existsSync(GALLERY_FILE)) {
      galleryData = JSON.parse(fs.readFileSync(GALLERY_FILE, 'utf8'));
    } else {
      console.log('❌ فایل gallery.json یافت نشد!');
      process.exit(1);
    }

    // Display categories
    displayCategories();

    // Get category
    const categoryInput = await question('دسته‌بندی را انتخاب کنید (1-4 یا نام انگلیسی): ');
    let selectedCategory;

    if (['1', '2', '3', '4'].includes(categoryInput)) {
      const categoryKeys = Object.keys(CATEGORIES);
      selectedCategory = categoryKeys[parseInt(categoryInput) - 1];
    } else if (Object.keys(CATEGORIES).includes(categoryInput)) {
      selectedCategory = categoryInput;
    } else {
      console.log('❌ دسته‌بندی نامعتبر!');
      process.exit(1);
    }

    console.log(`✅ دسته‌بندی انتخاب شده: ${CATEGORIES[selectedCategory]}\n`);

    // Get image details
    const title = await question('عنوان تصویر (فارسی): ');
    if (!title.trim()) {
      console.log('❌ عنوان الزامی است!');
      process.exit(1);
    }

    const description = await question('توضیحات تصویر: ');
    
    let url;
    do {
      url = await question('لینک تصویر: ');
      if (!validateUrl(url)) {
        console.log('❌ لینک نامعتبر است! لطفا مجدد تلاش کنید.');
      }
    } while (!validateUrl(url));

    const photographer = await question('نام عکاس: ');
    
    const dateInput = await question('تاریخ (YYYY-MM-DD یا خالی برای امروز): ');
    const date = formatDate(dateInput || new Date());

    const tagsInput = await question('تگ‌ها (با کاما جدا کنید): ');
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    const featuredInput = await question('تصویر ویژه؟ (y/n): ');
    const featured = featuredInput.toLowerCase() === 'y' || featuredInput.toLowerCase() === 'yes';

    // Create new image object
    const newImage = {
      title: title.trim(),
      description: description.trim() || title.trim(),
      url: url.trim(),
      photographer: photographer.trim() || 'نامشخص',
      date,
      tags,
      featured
    };

    // Add to gallery data
    if (!galleryData.categories[selectedCategory]) {
      galleryData.categories[selectedCategory] = {
        titlePersian: CATEGORIES[selectedCategory],
        description: `تصاویری از ${CATEGORIES[selectedCategory]}`,
        images: []
      };
    }

    galleryData.categories[selectedCategory].images.push(newImage);

    // Save updated data
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(galleryData, null, 2));

    console.log('\n✅ تصویر با موفقیت اضافه شد!');
    console.log('📋 خلاصه تصویر:');
    console.log(`   عنوان: ${newImage.title}`);
    console.log(`   دسته‌بندی: ${CATEGORIES[selectedCategory]}`);
    console.log(`   عکاس: ${newImage.photographer}`);
    console.log(`   تاریخ: ${newImage.date}`);
    console.log(`   ویژه: ${newImage.featured ? 'بله' : 'خیر'}`);
    console.log(`   تگ‌ها: ${newImage.tags.join(', ') || 'ندارد'}`);

    const runProcessor = await question('\n🔄 آیا می‌خواهید گالری را پردازش کنید؟ (y/n): ');
    if (runProcessor.toLowerCase() === 'y' || runProcessor.toLowerCase() === 'yes') {
      console.log('\n🔄 در حال پردازش گالری...');
      const GalleryProcessor = require('./processGallery');
      const processor = new GalleryProcessor();
      await processor.processGallery();
    }

  } catch (error) {
    console.error('❌ خطا:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the CLI
addNewImage();
