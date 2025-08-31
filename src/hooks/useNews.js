import { useState, useMemo, useCallback } from "react"

/**
 * Custom hook for managing news articles state and operations
 * @param {Array} articles - Array of news articles
 * @returns {Object} News management state and methods
 */
export const useNews = (articles = []) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date') // 'date', 'title', 'category'
  const [sortOrder, setSortOrder] = useState('desc') // 'asc', 'desc'

  // Extract unique categories from articles
  const categories = useMemo(() => {
    if (!articles || articles.length === 0) return []
    
    const uniqueCategories = new Set()
    articles.forEach(article => {
      if (article.frontmatter?.category) {
        uniqueCategories.add(article.frontmatter.category)
      }
    })

    return [
      { slug: 'all', name: 'همه اخبار', count: articles.length },
      ...Array.from(uniqueCategories).map(cat => ({
        slug: cat,
        name: cat,
        count: articles.filter(article => article.frontmatter?.category === cat).length
      }))
    ]
  }, [articles])

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    if (!articles || articles.length === 0) return []

    let filtered = [...articles]

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(article => 
        article.frontmatter?.category === activeCategory
      )
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(article => {
        const title = article.frontmatter?.title?.toLowerCase() || ''
        const excerpt = article.excerpt?.toLowerCase() || ''
        const category = article.frontmatter?.category?.toLowerCase() || ''
        const author = article.frontmatter?.author?.toLowerCase() || ''
        
        return title.includes(searchLower) || 
               excerpt.includes(searchLower) || 
               category.includes(searchLower) ||
               author.includes(searchLower)
      })
    }

    // Sort articles
    filtered.sort((a, b) => {
      let valueA, valueB
      
      switch (sortBy) {
        case 'title':
          valueA = a.frontmatter?.title || ''
          valueB = b.frontmatter?.title || ''
          break
        case 'category':
          valueA = a.frontmatter?.category || ''
          valueB = b.frontmatter?.category || ''
          break
        case 'date':
        default:
          valueA = new Date(a.frontmatter?.date || 0)
          valueB = new Date(b.frontmatter?.date || 0)
          break
      }

      if (sortBy === 'date') {
        return sortOrder === 'desc' ? valueB - valueA : valueA - valueB
      } else {
        const comparison = valueA.localeCompare(valueB, 'fa')
        return sortOrder === 'desc' ? -comparison : comparison
      }
    })

    return filtered
  }, [articles, activeCategory, searchTerm, sortBy, sortOrder])

  // Action handlers
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category)
  }, [])

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  const handleSortChange = useCallback((newSortBy, newSortOrder = 'desc') => {
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
  }, [])

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setActiveCategory('all')
  }, [])

  const resetAll = useCallback(() => {
    setSearchTerm('')
    setActiveCategory('all')
    setSortBy('date')
    setSortOrder('desc')
  }, [])

  // Computed values
  const hasActiveFilters = searchTerm.trim() || activeCategory !== 'all'
  const totalArticles = articles?.length || 0
  const filteredCount = filteredAndSortedArticles.length

  return {
    // State
    articles: filteredAndSortedArticles,
    originalArticles: articles,
    categories,
    activeCategory,
    searchTerm,
    sortBy,
    sortOrder,
    
    // Computed
    hasActiveFilters,
    totalArticles,
    filteredCount,
    
    // Actions
    handleCategoryChange,
    handleSearchChange,
    handleSortChange,
    clearFilters,
    resetAll,
  }
}

export default useNews
