# Adding Images for Better SEO

## Overview
Images significantly improve SEO and social media sharing. This guide shows how to add and optimize images for your news and events.

## Required Images

### 1. Site-wide Images (Essential)

#### Logo (`/static/logo.png`)
- **Size**: 512x512px (square)
- **Format**: PNG with transparency
- **Use**: Publisher logo in NewsArticle schema
- **Max file size**: 100KB

#### Open Graph Image (`/static/og-image.jpg`)
- **Size**: 1200x630px (1.91:1 ratio)
- **Format**: JPG
- **Use**: Default sharing image
- **Max file size**: 200KB
- **Content**: Site logo + tagline

### 2. Per-Article Images (Recommended)

#### News Article Images
- **Location**: `/static/news/[article-slug].jpg`
- **Size**: 1200x630px or 1600x900px
- **Format**: JPG or PNG
- **Use**: Article featured image

#### Event Images
- **Location**: `/static/events/[event-slug].jpg`
- **Size**: 1200x630px
- **Format**: JPG or PNG
- **Use**: Event featured image

## Image Requirements

### Technical Specs
- **Minimum**: 1200px wide
- **Recommended**: 1200x630px (for social)
- **Maximum file size**: 5MB (ideally < 200KB)
- **Formats**: JPG, PNG, WebP
- **Color space**: sRGB

### Content Guidelines
- ✅ High quality and relevant
- ✅ Clear subject matter
- ✅ Good contrast and readability
- ✅ No excessive text (< 20% of image)
- ✅ Represents the content accurately

### SEO Best Practices
- ✅ Descriptive filenames (e.g., `road-renovation-2025.jpg`)
- ✅ Compressed for web
- ✅ Include alt text
- ✅ Use next-gen formats (WebP)

## Implementation

### Step 1: Add Site Logo

1. Create or prepare your logo
2. Save as `/static/logo.png`
3. Already referenced in templates ✅

### Step 2: Add Default OG Image

1. Create image with site branding
2. Save as `/static/og-image.jpg`
3. Already set as fallback in Layout ✅

### Step 3: Add Article-Specific Images

#### For News Articles

Edit markdown frontmatter:

```markdown
---
title: "آغاز نوسازی جاده مرکزی روستا"
date: "2025-02-20"
type: "news"
author: "شورای روستا"
category: "اعلانات"
featured: true
image: "/news/road-renovation-2025.jpg"  # Add this
---
```

Then update `/src/templates/news-article.js`:

```javascript
const NewsArticleTemplate = ({ data, pageContext }) => {
  const article = data.markdownRemark
  const siteUrl = 'https://dangepia.ir'
  const articleImage = article.frontmatter.image 
    ? `${siteUrl}${article.frontmatter.image}`
    : `${siteUrl}/og-image.jpg`

  return (
    <Layout 
      title={article.frontmatter.title}
      description={article.excerpt}
      image={articleImage}  // Pass to Layout
      url={`${siteUrl}${article.fields.slug}`}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": article.frontmatter.title,
            "image": [articleImage],  // Use actual image
            // ... rest of schema
          })}
        </script>
      </Helmet>
      {/* ... rest of template */}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date
        author
        category
        featured
        image  # Add this to query
      }
    }
  }
`
```

#### For Events

Edit markdown frontmatter:

```markdown
---
title: "نشست هم‌اندیشی چشم‌انداز ۱۴۰۵"
date: "2025-07-01"
type: "event"
eventDate: "2025-07-19"
location: "سالن اجتماعات"
image: "/events/meeting-2025.jpg"  # Add this
---
```

Then update `/src/templates/event.js`:

```javascript
const EventTemplate = ({ data }) => {
  const event = data.markdownRemark
  const siteUrl = 'https://dangepia.ir'
  const eventImage = event.frontmatter.image 
    ? `${siteUrl}${event.frontmatter.image}`
    : `${siteUrl}/og-image.jpg`

  return (
    <Layout 
      title={event.frontmatter.title}
      description={event.excerpt}
      image={eventImage}  // Pass to Layout
      url={`${siteUrl}${event.fields.slug}`}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": event.frontmatter.title,
            "image": [eventImage],  // Use actual image
            // ... rest of schema
          })}
        </script>
      </Helmet>
      {/* ... rest of template */}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date
        eventDate
        location
        organizer
        image  # Add this to query
      }
    }
  }
`
```

## Image Optimization

### Using Sharp (Gatsby Image Plugin)

For automatic optimization, use Gatsby's image processing:

```javascript
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// In your component
const image = getImage(article.frontmatter.featuredImage)

<GatsbyImage 
  image={image} 
  alt={article.frontmatter.title}
/>
```

### Manual Optimization

Before uploading, optimize images:

```bash
# Using ImageMagick
convert input.jpg -resize 1200x630^ -gravity center -extent 1200x630 -quality 85 output.jpg

# Using ImageOptim (macOS)
# Drag and drop images to optimize

# Using TinyPNG (online)
# Visit tinypng.com and upload
```

## Folder Structure

```
static/
├── logo.png              # 512x512px, site logo
├── og-image.jpg          # 1200x630px, default sharing
├── news/                 # News article images
│   ├── road-renovation-2025.jpg
│   ├── festival-announcement.jpg
│   └── ...
└── events/               # Event images
    ├── meeting-2025.jpg
    ├── workshop-agriculture.jpg
    └── ...
```

## Testing Images

### 1. Check Image URLs

Visit in browser:
- https://dangepia.ir/logo.png
- https://dangepia.ir/og-image.jpg
- https://dangepia.ir/news/[image-name].jpg

### 2. Facebook Debugger

1. Go to: https://developers.facebook.com/tools/debug/
2. Enter page URL
3. Check image preview
4. Click "Scrape Again" if needed

### 3. Twitter Card Validator

1. Go to: https://cards-dev.twitter.com/validator
2. Enter page URL
3. Check card preview with image

### 4. Google Rich Results

1. Go to: https://search.google.com/test/rich-results
2. Enter page URL
3. Verify image appears in preview

## Image Alt Text

Always add descriptive alt text:

```markdown
![توضیح تصویر به زبان فارسی](image.jpg)
```

In React components:

```jsx
<img 
  src="/news/image.jpg" 
  alt="نوسازی جاده مرکزی روستا در حال انجام است"
/>
```

## Common Issues

### ❌ Image Not Showing

**Causes:**
- Wrong file path
- File not in `/static/` folder
- Relative URL instead of absolute
- File permissions

**Fix:**
1. Check file exists in `/static/`
2. Use absolute URLs: `https://dangepia.ir/image.jpg`
3. Verify file permissions (644)
4. Clear cache and rebuild

### ❌ Image Too Large

**Causes:**
- File size > 5MB
- Slow loading time

**Fix:**
1. Compress with TinyPNG or ImageOptim
2. Target < 200KB for sharing images
3. Use JPG instead of PNG for photos
4. Consider WebP format

### ❌ Wrong Aspect Ratio

**Causes:**
- Image gets cropped on social media
- Poor appearance in previews

**Fix:**
1. Use 1200x630px (1.91:1 ratio)
2. Keep important content in center
3. Test with Facebook Debugger

## Quick Commands

```bash
# Create directories
mkdir -p static/news static/events

# Resize image to 1200x630
convert input.jpg -resize 1200x630^ -gravity center -extent 1200x630 output.jpg

# Optimize with jpegoptim
jpegoptim --max=85 --strip-all *.jpg

# Check image dimensions
identify image.jpg

# Batch convert images
for img in *.jpg; do convert "$img" -resize 1200x630^ -gravity center -extent 1200x630 "optimized-$img"; done
```

## Checklist

Before deploying:

- [ ] Site logo added (`/static/logo.png`)
- [ ] Default OG image added (`/static/og-image.jpg`)
- [ ] Images optimized (< 200KB each)
- [ ] Correct dimensions (1200x630px)
- [ ] Descriptive filenames
- [ ] Alt text added
- [ ] Absolute URLs in schema
- [ ] Tested with Facebook Debugger
- [ ] Tested with Twitter Validator
- [ ] Tested with Rich Results Test

## Resources

- **Image Compression**: https://tinypng.com
- **Image Editing**: https://www.photopea.com (free, online)
- **Aspect Ratio Calculator**: https://calculateaspectratio.com
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **ImageMagick**: https://imagemagick.org

---

**Note**: Images significantly improve click-through rates and social media engagement. Invest time in creating high-quality, relevant images for your content.
