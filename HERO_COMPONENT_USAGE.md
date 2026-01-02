# HeroSection Component Usage Guide

The `HeroSection` component provides a highly customizable full-height hero section with gradient background, parallax effects, and advanced animations.

## Features

✨ **New UX Enhancements:**
- 🎬 **Parallax Scrolling**: Smooth parallax effect on background and content
- ⌨️ **Typing Animation**: Optional typewriter effect for titles
- 🖼️ **Background Images**: Support for custom background images with adjustable overlays
- 🎨 **Enhanced Animations**: Improved button hover effects and scroll indicators
- ♿ **Accessibility**: ARIA labels, keyboard navigation, focus states
- 📱 **Mobile Optimized**: Touch-friendly interactions and responsive design

## Basic Usage

```javascript
import HeroSection from "../components/HeroSection"

// Simple hero with title and subtitle only
<HeroSection 
  title="Page Title"
  subtitle="Page description or subtitle"
  showButtons={false}
  showScrollIndicator={true}
/>
```

## Advanced Usage with All Features

```javascript
// Hero with all features enabled
<HeroSection 
  title="Welcome to Our Village"
  subtitle="Discover the beauty and culture"
  showButtons={true}
  primaryButton={{
    text: "Learn More",
    to: "/about",
    icon: "M15 19l-7-7 7-7"
  }}
  secondaryButton={{
    text: "Contact Us", 
    to: "/contact",
    icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  }}
  showScrollIndicator={true}
  backgroundImage="/images/hero-bg.jpg"
  overlayOpacity={0.6}
  enableParallax={true}
  enableTypingEffect={false}
/>
```

## Props

### Required Props
- `title` (string): Main heading text

### Optional Props
- `subtitle` (string): Subtitle text below the main title
- `showButtons` (boolean, default: false): Whether to show action buttons
- `primaryButton` (object): Primary button configuration
  - `text` (string): Button text
  - `to` (string): Link destination
  - `icon` (string): SVG path for icon
- `secondaryButton` (object): Secondary button configuration
  - `text` (string): Button text
  - `to` (string): Link destination
  - `icon` (string): SVG path for icon
- `showScrollIndicator` (boolean, default: true): Show animated scroll indicator
- `backgroundImage` (string): URL or path to background image
- `overlayOpacity` (number, default: 0.5): Opacity of dark overlay (0-1)
- `enableParallax` (boolean, default: true): Enable parallax scrolling effect
- `enableTypingEffect` (boolean, default: false): Enable typewriter animation for title

## With Buttons

```javascript
// Hero with action buttons
<HeroSection 
  title="Welcome to Our Village"
  subtitle="Discover the beauty and culture"
  showButtons={true}
  primaryButton={{
    text: "Learn More",
    to: "/about",
    icon: "M15 19l-7-7 7-7" // SVG path
  }}
  secondaryButton={{
    text: "Contact Us", 
    to: "/contact",
    icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  }}
  showScrollIndicator={true}
/>
```

## UX Best Practices

### Parallax Effect
- **Enabled by default** for a modern, dynamic feel
- Smoothly fades content as user scrolls
- Can be disabled with `enableParallax={false}` for simpler pages

### Typing Animation
- **Disabled by default** to avoid distraction
- Enable with `enableTypingEffect={true}` for landing pages
- Creates engaging first impression
- Subtitle appears after typing completes

### Background Images
- Use high-quality images (1920x1080 or larger)
- Ensure good contrast with text
- Adjust `overlayOpacity` (0.3-0.7 recommended) for readability
- Example: `backgroundImage="/images/hero-village.jpg"`

### Accessibility
- All interactive elements have ARIA labels
- Keyboard navigation supported (Tab, Enter, Space)
- Focus states clearly visible
- Screen reader friendly

### Mobile Optimization
- Touch-friendly tap targets (48px minimum)
- Optimized animations for mobile devices
- Respects `prefers-reduced-motion` setting
- Backdrop blur for better readability

## Examples for Different Pages

### News Page
```javascript
<HeroSection 
  title="آخرین اخبار"
  subtitle="از جدیدترین رویدادها و اخبار روستا مطلع باشید"
  showButtons={false}
  showScrollIndicator={true}
  enableParallax={true}
/>
```

### Events Page
```javascript
<HeroSection 
  title="رویدادها"
  subtitle="در فعالیت‌ها و برنامه‌های جامعه شرکت کنید"
  showButtons={false}
  showScrollIndicator={true}
  backgroundImage="/images/events-bg.jpg"
  overlayOpacity={0.5}
/>
```

### Contact Page with Enhanced UX
```javascript
<HeroSection 
  title="تماس با ما"
  subtitle="با ما در ارتباط باشید و سوالات خود را مطرح کنید"
  showButtons={true}
  primaryButton={{
    text: "شماره تماس",
    to: "tel:+98xxxxxxxxx",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
  }}
  showScrollIndicator={true}
  enableParallax={true}
/>
```

### Landing Page with Typing Effect
```javascript
<HeroSection 
  title="به روستای دنگپیا خوش آمدید"
  subtitle="زیبایی، فرهنگ و جامعه روستای تاریخی ما را کشف کنید"
  showButtons={true}
  primaryButton={{
    text: "بیشتر بخوانید",
    to: "/about",
    icon: "M15 19l-7-7 7-7"
  }}
  secondaryButton={{
    text: "تماس با ما",
    to: "/contact",
    icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8"
  }}
  showScrollIndicator={true}
  backgroundImage="/images/village-hero.jpg"
  overlayOpacity={0.6}
  enableParallax={true}
  enableTypingEffect={true}
/>
```

## Migration from Old Version

If you're updating from the previous version, all existing hero sections will work without changes. New features are opt-in:

```javascript
// Old (still works)
<HeroSection title="Title" subtitle="Subtitle" />

// New with enhancements (optional)
<HeroSection 
  title="Title" 
  subtitle="Subtitle"
  backgroundImage="/images/bg.jpg"
  enableParallax={true}
/>
```

## Performance Tips

1. **Image Optimization**: Use WebP format for background images
2. **Lazy Loading**: Background images load efficiently
3. **Reduced Motion**: Automatically respects user preferences
4. **Mobile First**: Animations optimized for mobile performance
5. **GPU Acceleration**: Transform animations use GPU when available
