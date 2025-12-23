# News Article Template

This document describes the correct structure for creating news articles in the `/content/news/` directory.

## Markdown File Structure

Create a new `.md` file in `/content/news/` with the following frontmatter:

```markdown
---
title: "عنوان خبر"
date: "2025-12-23"
type: "news"
author: "نام نویسنده"
category: "دسته‌بندی"
featured: true
image: "/path/to/image.jpg"
description: "توضیح کوتاه درباره خبر (اختیاری)"
---

# محتوای خبر

متن اصلی خبر اینجا قرار می‌گیرد...

## بخش اول

محتوای بخش اول

## بخش دوم

محتوای بخش دوم
```

## Required Fields (الزامی)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | **Required** - عنوان خبر | "آغاز نوسازی جاده مرکزی" |
| `date` | string | **Required** - تاریخ انتشار (YYYY-MM-DD) | "2025-02-20" |
| `type` | string | **Required** - نوع محتوا (همیشه "news") | "news" |

## Optional Fields (اختیاری)

| Field | Type | Description | Example | Default |
|-------|------|-------------|---------|---------|
| `author` | string | نام نویسنده | "شورای روستا" | "شورای روستای دنگپیا" |
| `category` | string | دسته‌بندی خبر | "اعلانات" | "اخبار" |
| `featured` | boolean | خبر ویژه | `true` or `false` | `false` |
| `image` | string | مسیر تصویر خبر | "/images/news/road-project.jpg" | "/og-image.jpg" |
| `description` | string | توضیح کوتاه برای SEO | "خبر نوسازی جاده..." | از excerpt استفاده می‌شود |

## Image Guidelines (راهنمای تصاویر)

For best results in Google News rich cards:
- **Recommended size**: 1200 x 630 pixels
- **Format**: JPG or PNG
- **Location**: Place images in `/static/images/news/`
- **Reference**: Use relative path starting with `/` (e.g., `/images/news/article.jpg`)

## SEO Benefits (مزایای SEO)

Your news articles will automatically get:

✅ **Google News Rich Cards** - Shows in Google News with image, date, and author  
✅ **Open Graph Tags** - Beautiful previews on Facebook, LinkedIn, etc.  
✅ **Twitter Cards** - Rich previews when shared on Twitter  
✅ **Structured Data** - NewsArticle schema for better search appearance  
✅ **Breadcrumbs** - Helps Google understand site hierarchy

## Example File

`/content/news/new-project-2025.md`:

```markdown
---
title: "افتتاح پارک جدید روستا"
date: "2025-12-23"
type: "news"
author: "شورای روستا"
category: "اخبار عمومی"
featured: true
image: "/images/news/park-opening.jpg"
description: "پارک جدید روستا با امکانات ورزشی و تفریحی افتتاح شد"
---

# افتتاح پارک جدید روستا

پارک جدید روستای دنگپیا در روز جمعه با حضور مسئولین و اهالی افتتاح شد.

## امکانات پارک

- زمین بازی کودکان
- مسیر دوچرخه‌سواری
- نیمکت‌های استراحت
- فضای سبز

## ساعات بازدید

پارک همه روزه از ساعت ۶ صبح تا ۱۱ شب باز است.
```

## Testing Your Article

After creating a news article:

1. Build the site: `npm run develop`
2. Visit: `http://localhost:8000/news/your-article-slug`
3. Test SEO: https://search.google.com/test/rich-results
4. Validate structured data

## Notes

- File name doesn't matter, but use descriptive kebab-case names
- The URL slug is generated from the file name
- Dates should be in YYYY-MM-DD format
- All text content supports markdown formatting
- HTML tags are allowed in markdown content
