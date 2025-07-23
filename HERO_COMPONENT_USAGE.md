# HeroSection Component Usage Guide

The `HeroSection` component provides a consistent full-height hero section with gradient background across all pages.

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

## Props

- `title` (required): Main heading text
- `subtitle` (optional): Subtitle text
- `showButtons` (optional, default: false): Whether to show action buttons
- `primaryButton` (optional): Object with text, to, and icon properties
- `secondaryButton` (optional): Object with text, to, and icon properties  
- `showScrollIndicator` (optional, default: true): Whether to show scroll indicator

## Features

- Full viewport height (100vh)
- Gradient background with overlay
- Responsive design
- Animated scroll indicator with flash effect
- Persian/RTL text support
- Consistent styling across all pages

## Examples for Different Pages

### News Page
```javascript
<HeroSection 
  title="آخرین اخبار"
  subtitle="از جدیدترین رویدادها و اخبار روستا مطلع باشید"
  showButtons={false}
  showScrollIndicator={true}
/>
```

### Events Page
```javascript
<HeroSection 
  title="رویدادها"
  subtitle="در فعالیت‌ها و برنامه‌های جامعه شرکت کنید"
  showButtons={false}
  showScrollIndicator={true}
/>
```

### Contact Page
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
/>
```
