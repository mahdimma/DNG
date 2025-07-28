# Services Management Guide

This guide explains how to manage services in the DANG village website.

## Overview

The services system has been refactored to use a JSON-based approach similar to `locations.json`. This makes it easier to add, remove, and modify services without touching the main React component code.

## File Structure

- **`/content/services.json`** - Contains all service data
- **`/src/pages/services.js`** - The React component that displays services

## Adding a New Service

To add a new service, edit `/content/services.json` and add a new object with the following structure:

```json
{
  "id": 7,
  "title": "خدمات جدید",
  "titleEn": "New Service",
  "description": "توضیحات خدمات جدید",
  "contact": "+98-XXX-XXXX",
  "hours": "دوشنبه - جمعه: 8:00 - 16:00",
  "category": "new-category",
  "icon": "icon-name",
  "color": "blue"
}
```

### Field Descriptions

- **`id`**: Unique identifier (increment from last service)
- **`title`**: Persian title of the service
- **`titleEn`**: English title of the service
- **`description`**: Persian description of what the service provides
- **`contact`**: Contact information (phone number or multiple contacts)
- **`hours`**: Operating hours in Persian
- **`category`**: Category slug (for future filtering functionality)
- **`icon`**: Icon name from the available icons list (see below)
- **`color`**: Color theme (see available colors below)

## Removing a Service

To remove a service, simply delete the corresponding object from `/content/services.json`.

## Available Icons

The following icons are available for use:

- `building` - Building/office icon
- `heart` - Heart/health icon
- `book` - Book/education icon
- `truck` - Truck/transportation icon
- `library` - Library/cultural center icon
- `leaf` - Leaf/agriculture icon
- `shield` - Shield/police icon
- `fire` - Fire/fire department icon
- `phone` - Phone icon
- `alert` - Alert/warning icon
- `chat` - Chat/communication icon
- `form` - Form/document icon

### Adding New Icons

To add a new icon:

1. Open `/src/pages/services.js`
2. Find the `getIconPath` function
3. Add your new icon to the `icons` object:

```javascript
const icons = {
  // existing icons...
  "your-icon-name": "M12 2l3.09 6.26L22 9.27l-5 4.87...", // SVG path
}
```

The SVG path should be the `d` attribute from an SVG path element.

## Available Colors

The following color themes are available:

- `primary` - Primary theme color
- `red` - Red theme
- `blue` - Blue theme
- `indigo` - Indigo theme
- `purple` - Purple theme
- `green` - Green theme

Each color theme includes:
- Background color for icon containers
- Hover states
- Text colors
- Border colors

### Adding New Colors

To add a new color theme:

1. Open `/src/pages/services.js`
2. Find the `getColorClasses` function
3. Add your new color to the `colors` object:

```javascript
const colors = {
  // existing colors...
  "your-color": {
    bg: "bg-your-color-100",
    hover: "group-hover:bg-your-color-200",
    text: "text-your-color-600",
    border: "border-your-color-500"
  }
}
```

Make sure the Tailwind CSS classes you use are available in your project.

## GraphQL Integration

The services data is automatically fetched using Gatsby's GraphQL layer. The query in `services.js` will automatically pick up changes to `services.json` after restarting the development server.

## Example: Adding a New Service

Here's a complete example of adding a postal service:

```json
{
  "id": 7,
  "title": "خدمات پستی",
  "titleEn": "Postal Services",
  "description": "خدمات پست و ارسال بسته‌ها برای ساکنان روستا.",
  "contact": "پست: +98-XXX-XXXX",
  "hours": "دوشنبه - جمعه: 8:00 - 14:00",
  "category": "postal",
  "icon": "form",
  "color": "indigo"
}
```

After adding this to `/content/services.json`, restart your development server and the new service will appear on the services page.

## Emergency Contacts

Emergency contacts are still hardcoded in the React component. They use the same icon system but are defined directly in the JSX for better maintainability of critical emergency information.
