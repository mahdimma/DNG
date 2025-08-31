# News Components Refactoring

## Overview

The news article components have been completely refactored for better maintainability, performance, and user experience. This document outlines the changes and how to use the new components.

## New Component Structure

### Core Components

1. **NewsCard** - Individual article card component
2. **NewsArticle** - Flexible article component with multiple variants
3. **NewsGrid** - Grid layout for multiple articles
4. **NewsFilter** - Category filtering component
5. **NewsSort** - Sorting controls component
6. **NewsStats** - Statistics display component
7. **EmptyNewsState** - Empty state with multiple icons
8. **NewsSection** - Main section component
9. **EnhancedNewsSection** - Advanced section with custom hook

### Custom Hook

- **useNews** - Custom hook for news state management

## Key Improvements

### 1. Better Performance
- Memoized calculations for filtering and sorting
- Optimized re-renders with useCallback
- Efficient state management

### 2. Enhanced UX
- Loading skeleton states
- Better search functionality
- Advanced sorting options
- Improved accessibility (ARIA labels, focus management)
- Responsive design improvements

### 3. Code Quality
- PropTypes validation for all components
- Consistent error handling
- Better prop structure compatibility
- Comprehensive documentation

### 4. New Features
- Multiple article display variants (card, list, featured)
- Advanced sorting (date, title, category)
- Enhanced search (title, excerpt, category, author)
- Category count display
- Better empty states with different icons
- Featured article support

## Component Usage

### Basic Usage

```jsx
import { NewsSection } from '../components/news'

const NewsPage = ({ articles }) => {
  return (
    <NewsSection 
      articles={articles}
      loading={false}
      showStats={true}
      showSearch={true}
    />
  )
}
```

### Enhanced Usage with Custom Hook

```jsx
import { EnhancedNewsSection } from '../components/news'

const NewsPage = ({ articles }) => {
  return (
    <EnhancedNewsSection 
      articles={articles}
      loading={false}
      showStats={true}
      showSearch={true}
      showSort={true}
      gridColumns="lg:grid-cols-3"
    />
  )
}
```

### Individual Components

```jsx
import { NewsCard, NewsArticle, NewsGrid } from '../components/news'

// Card variant
<NewsCard article={article} />

// List variant
<NewsArticle article={article} variant="list" />

// Featured variant
<NewsArticle article={article} variant="featured" />

// Custom grid
<NewsGrid articles={articles} columns="lg:grid-cols-3" />
```

### Using the Custom Hook

```jsx
import { useNews } from '../hooks/useNews'

const CustomNewsComponent = ({ articles }) => {
  const {
    articles: filteredArticles,
    categories,
    activeCategory,
    searchTerm,
    handleCategoryChange,
    handleSearchChange,
    clearFilters
  } = useNews(articles)

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="جستجو..."
      />
      {filteredArticles.map(article => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
```

## Migration Guide

### Props Changes

#### Old NewsCard
```jsx
<NewsCard 
  title={title}
  date={date}
  author={author}
  excerpt={excerpt}
  slug={slug}
/>
```

#### New NewsCard (backward compatible)
```jsx
<NewsCard 
  article={{
    frontmatter: { title, date, author },
    excerpt,
    fields: { slug }
  }}
/>

// or legacy format still works
<NewsCard 
  article={{ title, date, author, excerpt, slug }}
/>
```

### Component Replacements

- `NewsCard` → Use new `NewsCard` or `NewsArticle`
- `NewsCategories` → Integrated into `NewsFilter`
- `EmptyState` → Use `EmptyNewsState`

## Configuration Options

### NewsSection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| articles | Array | [] | Array of news articles |
| loading | Boolean | false | Loading state |
| showStats | Boolean | true | Show statistics section |
| showSearch | Boolean | true | Show search input |

### EnhancedNewsSection Props

All NewsSection props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| showSort | Boolean | true | Show sort controls |
| gridColumns | String | "lg:grid-cols-2" | Grid column classes |

### NewsArticle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| article | Object | required | Article data |
| variant | String | "card" | Display variant (card/list/featured) |
| showExcerpt | Boolean | true | Show article excerpt |
| showCategory | Boolean | true | Show category badge |
| showAuthor | Boolean | true | Show author name |
| showDate | Boolean | true | Show publication date |

## Best Practices

1. **Use EnhancedNewsSection** for full-featured news displays
2. **Use NewsArticle** for custom layouts with different variants
3. **Use the useNews hook** for custom implementations
4. **Always provide PropTypes** when extending components
5. **Use loading states** for better UX during data fetching

## Future Enhancements

- Infinite scroll support
- Advanced filtering (date ranges, author selection)
- Article bookmarking
- Social sharing integration
- SEO optimizations
- Theme customization

## Files Changed

- `/src/pages/news.js` - Updated to use new components
- `/src/components/news/` - All components refactored
- `/src/hooks/useNews.js` - New custom hook
- Removed old duplicate components

## Testing

All components include proper PropTypes validation and handle edge cases like:
- Empty article arrays
- Missing article properties
- Invalid prop types
- Loading states
- Error states

## Performance Considerations

- Components use React.memo for optimization where appropriate
- Expensive calculations are memoized
- Event handlers are stabilized with useCallback
- Large lists should consider virtualization for 100+ articles
