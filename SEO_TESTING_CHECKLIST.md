# SEO Testing Checklist

## Quick Testing Guide

### 1. Test Structured Data (5 minutes)

#### For News Articles:
1. Open any news article page
2. Go to: https://search.google.com/test/rich-results
3. Enter your URL or paste HTML source
4. Check for:
   - ✅ No errors
   - ✅ NewsArticle detected
   - ✅ All required fields present

#### For Events:
1. Open any event page
2. Go to: https://search.google.com/test/rich-results
3. Enter your URL
4. Check for:
   - ✅ No errors
   - ✅ Event detected
   - ✅ Date, location, organizer present

### 2. View Source Check (2 minutes)

Right-click on page → View Page Source

Look for:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  ...
}
</script>
```

### 3. Meta Tags Check (2 minutes)

In page source, verify these exist:
- `<meta property="og:title" ...>`
- `<meta property="og:description" ...>`
- `<meta property="og:image" ...>`
- `<meta name="twitter:card" ...>`
- `<link rel="canonical" ...>`

### 4. Social Media Preview (5 minutes)

#### Facebook:
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter your URL
3. Click "Scrape Again"
4. Check image and text preview

#### Twitter:
1. Go to: https://cards-dev.twitter.com/validator
2. Enter your URL
3. Preview card appearance

### 5. Sitemap Check (2 minutes)

1. Visit: https://dangepia.ir/sitemap-index.xml
2. Should show XML sitemap
3. Check news and events are listed

### 6. Robots.txt Check (1 minute)

1. Visit: https://dangepia.ir/robots.txt
2. Should show:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://dangepia.ir/sitemap-index.xml
   ```

## Common Issues & Fixes

### ❌ "No structured data found"
**Fix:** View page source, ensure JSON-LD script tag exists

### ❌ "Invalid date format"
**Fix:** Use ISO format: YYYY-MM-DD (e.g., 2025-10-04)

### ❌ "Missing required field"
**Fix:** Check schema requirements, add missing fields

### ❌ "Image not loading"
**Fix:** Use absolute URLs, check image is accessible

### ❌ "Sitemap returns 404"
**Fix:** Run `gatsby build`, verify files in public folder

## Google Search Console Setup

### Step 1: Add Property
1. Go to: https://search.google.com/search-console
2. Click "Add Property"
3. Enter: https://dangepia.ir
4. Choose verification method

### Step 2: Verify Ownership

**Option A: HTML File Upload**
1. Download verification file
2. Place in `/static/` folder
3. Rebuild and deploy
4. Click "Verify"

**Option B: DNS Record**
1. Copy TXT record
2. Add to domain DNS settings
3. Wait for propagation (may take hours)
4. Click "Verify"

### Step 3: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Enter: `sitemap-index.xml`
3. Click "Submit"
4. Wait for processing (1-2 days)

### Step 4: Request Indexing
For important pages:
1. Use "URL Inspection" tool
2. Enter full URL
3. Click "Request Indexing"
4. Repeat for key news/event pages

## Monitoring Schedule

### Daily (First Week)
- [ ] Check for crawl errors
- [ ] Monitor indexing status
- [ ] Review search console messages

### Weekly
- [ ] Check search performance metrics
- [ ] Test new articles/events
- [ ] Verify structured data

### Monthly
- [ ] Analyze search queries
- [ ] Review click-through rates
- [ ] Update content strategy

## Expected Timeline

- **Day 1-3**: Google discovers pages
- **Week 1-2**: Pages start getting indexed
- **Week 2-4**: Rich results may appear
- **Week 4-8**: Full SEO impact visible

## Performance Benchmarks

Track these metrics:
- **Impressions**: How often pages appear in search
- **Clicks**: How many users click through
- **CTR**: Click-through rate (target: >2%)
- **Position**: Average ranking (target: <10)

## Quick Commands

```bash
# Build site
npm run build

# Check build output
ls -la public/

# View sitemap
cat public/sitemap-index.xml

# Test locally
npm run develop
```

## Resources

- **Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Validator**: https://validator.schema.org/
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Search Console**: https://search.google.com/search-console

## Support

For issues or questions:
1. Check SEO_IMPLEMENTATION.md for detailed docs
2. Test with Google's tools first
3. Review Search Console messages
4. Allow 2-4 weeks for changes to take effect

---

**Last Updated**: October 4, 2025
**Status**: ✅ Implementation Complete
