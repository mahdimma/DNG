# Sitemap Configuration Guide

## Your Sitemap URLs

### Main Sitemap (Submit this to Google)
```
https://dangepia.ir/sitemap-index.xml
```

### Individual Sitemaps (Auto-generated)
```
https://dangepia.ir/sitemap-0.xml
https://dangepia.ir/sitemap-1.xml (if you have many pages)
...
```

## Configuration Details

### Current Setup ✅

**Location:** `gatsby-config.js`

```javascript
{
  resolve: `gatsby-plugin-sitemap`,
  options: {
    output: '/',
    createLinkInHead: true,
    resolveSiteUrl: () => 'https://dangepia.ir',
    
    // Priority Settings:
    // - Home/News/Events pages: 1.0 (highest)
    // - Events: 0.9
    // - News: 0.8
    // - Other pages: 0.5
    
    // Change Frequency:
    // - Home/News/Events: daily
    // - Events: weekly
    // - News: daily
    // - Other: monthly
  }
}
```

### Robots.txt Configuration ✅

**File:** `static/robots.txt` + `gatsby-plugin-robots-txt`

Points to sitemap:
```
Sitemap: https://dangepia.ir/sitemap-index.xml
```

## Important Change Made

### PathPrefix Removed ✅

**Before:**
```javascript
module.exports = {
  pathPrefix: "/DANG",  // ❌ This would make URLs like: dangepia.ir/DANG/news
  // ...
}
```

**After:**
```javascript
module.exports = {
  // pathPrefix: "/DANG",  // ✅ Commented out for root domain deployment
  // ...
}
```

**Impact:** 
- URLs are now: `https://dangepia.ir/news/` (correct)
- Not: `https://dangepia.ir/DANG/news/` (incorrect)

## How to Build and Deploy

### Step 1: Build the Site
```bash
npm run build
```

This generates:
- `/public/sitemap-index.xml`
- `/public/sitemap-0.xml`
- All pages and assets

### Step 2: Verify Sitemap Locally
```bash
# Check sitemap exists
ls -la public/sitemap*

# View sitemap content
cat public/sitemap-index.xml
cat public/sitemap-0.xml
```

### Step 3: Deploy
Deploy the entire `/public` folder to your web server.

### Step 4: Verify Online
After deployment, test these URLs in browser:
- https://dangepia.ir/sitemap-index.xml
- https://dangepia.ir/sitemap-0.xml
- https://dangepia.ir/robots.txt

## Submit to Search Engines

### Google Search Console

1. **Go to:** https://search.google.com/search-console
2. **Add Property:** `https://dangepia.ir`
3. **Verify Ownership** (choose method):
   - HTML file upload
   - DNS TXT record
   - HTML tag
   - Google Analytics

4. **Submit Sitemap:**
   - Click "Sitemaps" in left menu
   - Enter: `sitemap-index.xml`
   - Click "Submit"
   - Wait 1-2 days for Google to process

### Bing Webmaster Tools

1. **Go to:** https://www.bing.com/webmasters
2. **Add Site:** `https://dangepia.ir`
3. **Verify Ownership**
4. **Submit Sitemap:** `sitemap-index.xml`

## Sitemap Structure Example

### sitemap-index.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://dangepia.ir/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
```

### sitemap-0.xml (excerpt)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home Page -->
  <url>
    <loc>https://dangepia.ir/</loc>
    <lastmod>2025-10-04T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- News Listing -->
  <url>
    <loc>https://dangepia.ir/news/</loc>
    <lastmod>2025-10-04T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Events Listing -->
  <url>
    <loc>https://dangepia.ir/events/</loc>
    <lastmod>2025-10-04T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Individual News Article -->
  <url>
    <loc>https://dangepia.ir/news/road-renovation/</loc>
    <lastmod>2025-02-20T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Individual Event -->
  <url>
    <loc>https://dangepia.ir/events/meeting-2025/</loc>
    <lastmod>2025-07-01T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

## Priority Levels Explained

### 1.0 - Highest Priority
- Homepage (`/`)
- News listing (`/news`)
- Events listing (`/events`)
- Main category pages

### 0.9 - Very High
- Individual event pages
- Important announcements

### 0.8 - High
- Individual news articles
- Featured content

### 0.5 - Normal
- About page
- Contact page
- Other static pages

## Change Frequency Explained

### Daily
- Homepage (frequently updated)
- News listing (new articles)
- News articles (might be updated)

### Weekly
- Events listing
- Event pages

### Monthly
- Static pages (about, contact)
- Archive pages

## Monitoring Your Sitemap

### Google Search Console - Coverage Report

Check these metrics:
- **Submitted**: Total URLs in sitemap
- **Indexed**: URLs indexed by Google
- **Excluded**: URLs not indexed (with reasons)

### Expected Timeline
- **Day 1-3**: Google discovers sitemap
- **Week 1**: Starts indexing pages
- **Week 2-4**: Most pages indexed
- **Ongoing**: Re-crawls based on changefreq

## Troubleshooting

### Sitemap Returns 404
**Causes:**
- Not deployed yet
- pathPrefix misconfiguration
- Server configuration issue

**Fixes:**
1. Run `gatsby build`
2. Check `public/sitemap-index.xml` exists
3. Deploy public folder
4. Verify URL in browser

### URLs in Sitemap Don't Match Live Site
**Causes:**
- pathPrefix still set
- Wrong siteUrl in config

**Fixes:**
1. Remove/comment pathPrefix
2. Verify siteUrl is correct
3. Rebuild: `gatsby build`
4. Redeploy

### Google Not Indexing Pages
**Causes:**
- Sitemap not submitted
- Robots.txt blocking crawlers
- Pages too new

**Fixes:**
1. Submit sitemap in Search Console
2. Check robots.txt allows crawling
3. Request indexing for key pages
4. Wait 2-4 weeks

### Too Many URLs in Sitemap
**Note:** Gatsby automatically splits large sitemaps:
- Max 50,000 URLs per file
- Creates sitemap-0.xml, sitemap-1.xml, etc.
- sitemap-index.xml lists all files

## Testing Checklist

After building and deploying:

- [ ] Visit https://dangepia.ir/sitemap-index.xml (should load XML)
- [ ] Visit https://dangepia.ir/sitemap-0.xml (should load XML)
- [ ] Visit https://dangepia.ir/robots.txt (should show sitemap URL)
- [ ] Check all URLs in sitemap are accessible
- [ ] Verify URLs don't have `/DANG/` prefix
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Monitor indexing status after 1 week

## Quick Commands

```bash
# Build site (generates sitemap)
npm run build

# Check sitemap files
ls -la public/sitemap*

# View sitemap
cat public/sitemap-index.xml

# Count URLs in sitemap
grep -o '<loc>' public/sitemap-0.xml | wc -l

# Extract all URLs from sitemap
grep -oP '(?<=<loc>).*?(?=</loc>)' public/sitemap-0.xml

# Deploy (example for static hosting)
# Upload entire public/ folder to your server
```

## Additional Resources

- **Google Sitemap Guide**: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- **Sitemaps.org**: https://www.sitemaps.org/
- **Gatsby Sitemap Plugin**: https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/
- **Search Console**: https://search.google.com/search-console

## Summary

✅ **Your Sitemap URL:** `https://dangepia.ir/sitemap-index.xml`

✅ **Configuration:** Properly set up with priorities and change frequencies

✅ **PathPrefix:** Fixed - removed for root domain deployment

✅ **Next Steps:**
1. Build: `npm run build`
2. Deploy the `/public` folder
3. Submit sitemap to Google Search Console
4. Monitor indexing status

---

**Last Updated:** October 4, 2025
**Status:** ✅ Configuration Complete
