# Dangepia Village Website

A comprehensive Gatsby-based website for Dangepia Village, featuring news, events, services, and community information. Built with modern web technologies to provide an engaging and accessible platform for village residents and visitors.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Content Management](#content-management)
- [Components Documentation](#components-documentation)
- [Development Guides](#development-guides)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🏠 **Homepage** - Welcome message and quick access to services
- 📰 **News & Events** - Dynamic content management for articles and events with advanced filtering and search
- 🏛️ **Services** - Information about village services with JSON-based management
- 📞 **Contact** - Contact forms and office information
- 🗺️ **Maps** - Interactive village maps and locations using Leaflet
- 🌤️ **Weather** - Local weather information integration
- 🖼️ **Gallery** - Village photo gallery
- ℹ️ **About** - Village history and information
- ⚖️ **Legal Pages** - Privacy policy and terms of service
- 🛠️ **Admin Interface** - Content management system (demo)
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🌐 **Multilingual Support** - Persian (RTL) and English support
- ♿ **Accessibility** - ARIA labels, keyboard navigation, and screen reader support

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mahdimma/DANG.git
   cd DANG
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run develop
```

The site will be available at `http://localhost:8000`

### Building for Production

Build the static site:
```bash
npm run build
```

Serve the production build locally:
```bash
npm run serve
```

### Other Scripts

- `npm run clean` - Clean Gatsby cache and public directory

## Project Structure

```
DANG/
├── content/                 # Static content files
│   ├── events/             # Event markdown files
│   ├── news/               # News article markdown files
│   ├── gallery.json        # Gallery images data
│   ├── locations.json      # Location data for maps
│   └── services.json       # Services data
├── public/                 # Built static files
├── src/
│   ├── components/         # Reusable React components
│   │   ├── news/          # News-related components
│   │   └── ...            # Other components
│   ├── hooks/             # Custom React hooks
│   ├── images/            # Static images
│   ├── pages/             # Gatsby pages
│   └── styles/            # Global styles and Tailwind config
├── gatsby-browser.js       # Gatsby browser configuration
├── gatsby-config.js        # Gatsby site configuration
├── gatsby-node.js          # Gatsby Node.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## Content Management

### Adding News Articles

Create a new markdown file in `content/news/` with frontmatter:

```markdown
---
title: "Article Title"
date: "2025-07-19"
type: "news"
author: "Author Name"
category: "category"
featured: false
---

Article content here...
```

### Adding Events

Create a new markdown file in `content/events/` with frontmatter:

```markdown
---
title: "Event Title"
date: "2025-07-19"
type: "event"
eventDate: "2025-08-15"
eventTime: "10:00 AM"
location: "Village Square"
---

Event details here...
```

### Managing Services

Services are managed through `content/services.json`. See [Services Management Guide](#services-management) for detailed instructions.

### Managing Gallery

Gallery images are managed through `content/gallery.json` with image paths and metadata.

## Components Documentation

### HeroSection Component

The `HeroSection` component provides consistent full-height hero sections across all pages with gradient backgrounds, optional action buttons, and scroll indicators.

**Key Features:**
- Full viewport height with responsive design
- Persian/RTL text support
- Animated scroll indicators
- Customizable action buttons

For detailed usage examples and API reference, see [HERO_COMPONENT_USAGE.md](HERO_COMPONENT_USAGE.md).

### News Components

The news system has been completely refactored with enhanced performance, accessibility, and user experience.

**New Components:**
- `NewsCard` - Individual article cards
- `NewsArticle` - Flexible article display with multiple variants
- `NewsGrid` - Responsive grid layouts
- `NewsFilter` - Category filtering
- `NewsSort` - Sorting controls
- `NewsStats` - Statistics display
- `EnhancedNewsSection` - Advanced section with custom hooks

**Key Improvements:**
- Better performance with memoized calculations
- Enhanced UX with loading states and search
- Improved accessibility and responsive design
- Advanced sorting and filtering options

For complete documentation, see [NEWS_COMPONENTS_REFACTORING.md](NEWS_COMPONENTS_REFACTORING.md).

## Development Guides

### News Template Refactoring

The news template system has been modernized with improved layouts, better navigation, and enhanced user experience.

**Enhancements:**
- Modern, clean design with proper typography
- Breadcrumb navigation and reading time calculation
- Advanced sharing capabilities with Web Share API
- Previous/Next article navigation
- Enhanced accessibility and keyboard navigation

**New Components:**
- `SearchBox` - Enhanced search with animations and keyboard shortcuts
- `FilterResultsInfo` - Smart filter display and management

For detailed information about the refactoring, see [NEWS_REFACTORING.md](NEWS_REFACTORING.md).

### Services Management

Services are managed through a JSON-based system for easy maintenance without code changes.

**Features:**
- JSON-based service configuration
- Multiple icon and color themes
- Easy addition/removal of services
- Category-based organization

**Available Icons:** building, heart, book, truck, library, leaf, shield, fire, phone, alert, chat, form

**Color Themes:** primary, red, blue, indigo, purple, green

For complete management guide, see [SERVICES_MANAGEMENT.md](SERVICES_MANAGEMENT.md).

## Technologies Used

- **Gatsby** - Static site generator for React
- **React 18** - UI framework with modern features
- **GraphQL** - Data querying and management
- **Tailwind CSS** - Utility-first CSS framework
- **Styled Components** - CSS-in-JS for component styling
- **Leaflet** - Interactive maps
- **Markdown** - Content format for articles
- **Formspree** - Contact form handling
- **React Helmet** - Document head management

### Development Tools

- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **Gatsby Plugins**:
  - `gatsby-plugin-image` - Optimized images
  - `gatsby-plugin-sharp` - Image processing
  - `gatsby-plugin-manifest` - PWA manifest
  - `gatsby-plugin-offline` - Offline functionality
  - `gatsby-plugin-sitemap` - SEO sitemap generation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow React and Gatsby best practices
- Use PropTypes for component validation
- Ensure accessibility compliance
- Test components across different screen sizes
- Follow the existing code style and structure

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

**Dangepia Village Website** - Connecting community through technology