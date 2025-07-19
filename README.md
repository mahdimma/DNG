# Dangepia Village Website

A Gatsby-based website for Dangepia Village featuring news, events, services, and community information.

## Features

- 🏠 **Homepage** - Welcome message and quick access to services
- 📰 **News & Events** - Dynamic content management for articles and events
- 🏛️ **Services** - Information about village services
- 📞 **Contact** - Contact forms and office information
- 🗺️ **Maps** - Interactive village maps and locations
- 🌤️ **Weather** - Local weather information
- 🖼️ **Gallery** - Village photo gallery
- ℹ️ **About** - Village history and information
- ⚖️ **Legal Pages** - Privacy policy and terms of service
- 🛠️ **Admin Interface** - Content management system (demo)

## Getting Started

### Installation

1. Install dependencies:
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

## Technologies Used

- **Gatsby** - Static site generator
- **React** - UI framework
- **GraphQL** - Data querying
- **Markdown** - Content format