# SEO Implementation for News and Events

## Overview
This document describes the SEO improvements implemented to make news articles and events appear as rich cards in Google search results.

## Implemented Features

### 1. Structured Data (JSON-LD Schema)

#### NewsArticle Schema (`/src/templates/news-article.js`)
Each news article now includes:
- `@type: "NewsArticle"` - Identifies content as news
- `headline` - Article title
- `description` - Article excerpt
- `datePublished` - Publication date
- `dateModified` - Last modified date
- `author` - Article author (Organization)
- `publisher` - Publisher details with logo
- `mainEntityOfPage` - Canonical URL
- `articleSection` - Category/section
- `image` - Featured image

**Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "آغاز نوسازی جاده مرکزی روستا",
  "datePublished": "2025-02-20",
  "author": {
    "@type": "Organization",
    "name": "شورای روستا"
  }
}
```

#### Event Schema (`/src/templates/event.js`)
Each event page includes:
- `@type: "Event"` - Identifies content as event
- `name` - Event title
- `description` - Event description
- `startDate` & `endDate` - Event dates
- `eventAttendanceMode` - Offline event
- `eventStatus` - Event status (Scheduled)
- `location` - Venue with full address
- `organizer` - Organization details
- `performer` - Performer details
- `image` - Event images
- `offers` - Pricing information (free events)

**Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "نشست هم‌اندیشی",
  "startDate": "2025-07-19",
  "location": {
    "@type": "Place",
    "name": "سالن اجتماعات"
  }
}
```

#### BreadcrumbList Schema
Both `/news` and `/events` pages include breadcrumb navigation:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "خانه",
      "item": "https://dangepia.ir"
    }
  ]
}
```

### 2. Enhanced Meta Tags (`/src/components/Layout.js`)

#### Open Graph Tags (Facebook)
- `og:type` - Content type
- `og:url` - Page URL
- `og:title` - Page title
- `og:description` - Page description
- `og:image` - Featured image
- `og:site_name` - Site name
- `og:locale` - Language (fa_IR)

#### Twitter Card Tags
- `twitter:card` - summary_large_image
- `twitter:url` - Page URL
- `twitter:title` - Page title
- `twitter:description` - Page description
- `twitter:image` - Featured image

#### Additional SEO Tags
- `robots` - index, follow
- `author` - شورای روستای دنگپیا
- `keywords` - Relevant keywords
- `canonical` - Canonical URL
- `lang="fa"` - Persian language
- `dir="rtl"` - Right-to-left direction

### 3. URL Structure
All pages use clean, SEO-friendly URLs:
- News: `/news/[slug]`
- Events: `/events/[slug]`
- News listing: `/news`
- Events listing: `/events`

## Testing Your Implementation

### 1. Google Rich Results Test
Test your structured data:
1. Visit: https://search.google.com/test/rich-results
2. Enter your page URL or paste HTML
3. Verify no errors appear

### 2. Schema Markup Validator
Validate schema.org markup:
1. Visit: https://validator.schema.org/
2. Enter your page URL
3. Check for warnings or errors

### 3. Facebook Sharing Debugger
Test Open Graph tags:
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter your page URL
3. Click "Scrape Again" to refresh

### 4. Twitter Card Validator
Test Twitter Cards:
1. Visit: https://cards-dev.twitter.com/validator
2. Enter your page URL
3. Preview card appearance

## Google Search Console Setup

### 1. Verify Ownership
1. Go to https://search.google.com/search-console
2. Add property: https://dangepia.ir
3. Verify using HTML file, DNS, or Google Analytics

### 2. Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Submit: `https://dangepia.ir/sitemap/sitemap-index.xml`
3. Wait for Google to crawl

### 3. Request Indexing
For immediate indexing of important pages:
1. Use "URL Inspection" tool
2. Enter page URL
3. Click "Request Indexing"

### 4. Monitor Performance
Check these reports regularly:
- **Coverage** - Indexing status
- **Performance** - Search traffic
- **Enhancements** - Rich results
- **Mobile Usability** - Mobile issues

## Expected Results

### Google News Carousel
News articles may appear in:
- Google News carousel
- "Top Stories" section
- Regular search results with rich snippets

**Requirements:**
- Recent publication date
- Regular content updates
- Quality, original content
- Fast loading pages

### Google Events
Events may appear in:
- Google Search events listings
- Google Maps events
- Knowledge panel events

**Requirements:**
- Future date events
- Complete location information
- Accurate dates and times
- Clear event details

## Best Practices

### Content Quality
- Write clear, descriptive titles (50-60 characters)
- Create compelling meta descriptions (150-160 characters)
- Use relevant keywords naturally
- Publish regularly (news: weekly, events: as scheduled)

### Images
- Add featured images to all articles/events
- Use descriptive filenames
- Optimize file size (< 200KB)
- Recommended size: 1200x630px
- Format: JPG or PNG

### Performance
- Keep page load time < 3 seconds
- Optimize images and assets
- Use responsive design
- Enable caching

### Accessibility
- Use semantic HTML
- Add alt text to images
- Maintain good heading hierarchy
- Ensure keyboard navigation

## Monitoring & Maintenance

### Weekly Tasks
- [ ] Check for crawl errors in Search Console
- [ ] Review search performance metrics
- [ ] Publish new content (news/events)

### Monthly Tasks
- [ ] Analyze search queries and impressions
- [ ] Update popular content
- [ ] Check structured data errors
- [ ] Review mobile usability

### Quarterly Tasks
- [ ] Audit all meta descriptions
- [ ] Update outdated content
- [ ] Review keyword strategy
- [ ] Check competitor rankings

## Troubleshooting

### Structured Data Not Recognized
- Validate with Google Rich Results Test
- Check for JSON syntax errors
- Ensure all required fields are present
- Wait 2-4 weeks for Google to re-crawl

### Not Appearing in Rich Results
- Verify structured data is correct
- Check content quality guidelines
- Ensure page is indexed
- May take 4-8 weeks to appear

### Images Not Showing
- Check image URL is absolute (not relative)
- Verify image is publicly accessible
- Ensure image meets size requirements
- Use supported formats (JPG, PNG)

## Additional Resources

### Google Documentation
- [Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [NewsArticle Schema](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Event Schema](https://developers.google.com/search/docs/appearance/structured-data/event)
- [Breadcrumb Schema](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)

### Testing Tools
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)

## Next Steps

1. **Add Images**: Create and upload proper Open Graph images
   - Path: `/static/og-image.jpg` (general)
   - Path: `/static/logo.png` (organization logo)
   - Consider unique images per article/event

2. **Create XML Sitemap**: Already configured with `gatsby-plugin-sitemap`
   - Verify at: https://dangepia.ir/sitemap/sitemap-index.xml

3. **Submit to Google**: 
   - Register site in Google Search Console
   - Submit sitemap
   - Request indexing for key pages

4. **Monitor Results**:
   - Check Search Console weekly
   - Track impressions and clicks
   - Adjust strategy based on data

5. **Content Strategy**:
   - Publish news regularly (at least weekly)
   - Create events with complete information
   - Update old content periodically
   - Add categories and tags

## Notes

- **URL Changes**: Current URLs use `dangepia.ir` - update if domain is different
- **Images**: Placeholder images are used - replace with actual images
- **Dates**: Ensure dates are in ISO 8601 format (YYYY-MM-DD)
- **Language**: All content is in Persian (fa_IR locale)
- **Schema Version**: Using schema.org latest version
