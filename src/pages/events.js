import React, { useState, useMemo, useEffect, useCallback } from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import CalendarView from "../components/events/CalendarView"
import EventCardSkeleton from "../components/events/EventCardSkeleton"
import "../styles/events.css"

// Utility function to convert Gregorian date to Persian date
const toPersianDate = (date) => {
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date))
  } catch (error) {
    return date
  }
}

// Utility function to convert Gregorian date to Persian short date
const toPersianShortDate = (date) => {
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date))
  } catch (error) {
    return date
  }
}

// Function to get Persian date from event by converting eventDate
const getEventPersianDate = (event) => {
  return toPersianDate(event.frontmatter.eventDate)
}

// Function to get Persian short date from event by converting eventDate
const getEventPersianShortDate = (event) => {
  return toPersianShortDate(event.frontmatter.eventDate)
}

const EventsPage = ({ data }) => {
  const events = data?.allMarkdownRemark?.nodes || []
  const [selectedCategory, setSelectedCategory] = useState("همه")
  const [viewMode, setViewMode] = useState("grid") // grid, list, or calendar
  const [sortBy, setSortBy] = useState("date") // date, title, featured
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Separate upcoming, current, and past events with enhanced filtering
  const now = new Date()
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Start of today
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1) // Start of tomorrow
  
  const currentEvents = events.filter(event => {
    const eventDate = new Date(event.frontmatter.eventDate)
    eventDate.setHours(0, 0, 0, 0)
    const todayTime = today.getTime()
    const eventTime = eventDate.getTime()
    console.log('Checking event:', event.frontmatter.title, 'Event date:', eventTime, 'Today:', todayTime, 'Match:', eventTime === todayTime)
    return eventTime === todayTime
  })
  
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.frontmatter.eventDate)
    eventDate.setHours(0, 0, 0, 0)
    return eventDate.getTime() >= tomorrow.getTime()
  })
  
  const pastEvents = events.filter(event => {
    const eventDate = new Date(event.frontmatter.eventDate)
    eventDate.setHours(0, 0, 0, 0)
    return eventDate.getTime() < today.getTime()
  })

  console.log('Today events:', currentEvents.length, currentEvents.map(e => e.frontmatter.title))
  console.log('Upcoming events:', upcomingEvents.length)
  console.log('Past events:', pastEvents.length)

  // Get unique categories from events (optimized with useMemo)
  const categories = useMemo(() => {
    const cats = new Set()
    events.forEach(event => {
      if (event.frontmatter.category) {
        cats.add(event.frontmatter.category)
      }
    })
    return ["همه", ...Array.from(cats)]
  }, [events])

  // Search filter function
  const filterBySearch = useMemo(() => (eventsList) => {
    if (!searchQuery.trim()) return eventsList
    const query = searchQuery.toLowerCase()
    return eventsList.filter(event => 
      event.frontmatter.title?.toLowerCase().includes(query) ||
      event.excerpt?.toLowerCase().includes(query) ||
      event.frontmatter.location?.toLowerCase().includes(query) ||
      event.frontmatter.organizer?.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Filter and sort events (optimized with useCallback)
  const filterAndSortEvents = useCallback((eventsList, isUpcoming = false) => {
    let filtered = eventsList
    
    // Apply search filter
    filtered = filterBySearch(filtered)
    
    // Apply category filter
    if (selectedCategory !== "همه") {
      filtered = filtered.filter(event => 
        event.frontmatter.category === selectedCategory
      )
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.frontmatter.title.localeCompare(b.frontmatter.title)
        case "featured":
          return b.frontmatter.featured - a.frontmatter.featured
        default:
          // For upcoming events, sort ascending (soonest first)
          // For past events, sort descending (most recent first)
          if (isUpcoming) {
            return new Date(a.frontmatter.eventDate) - new Date(b.frontmatter.eventDate)
          } else {
            return new Date(b.frontmatter.eventDate) - new Date(a.frontmatter.eventDate)
          }
      }
    })
  }, [selectedCategory, sortBy, filterBySearch])

  const CurrentEventCard = ({ event, index }) => {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [isLive, setIsLive] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // Update current time every minute to check if event is live
    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date())
      }, 60000) // Update every minute

      return () => clearInterval(timer)
    }, [])

    // Check if event is currently live based on time
    React.useEffect(() => {
      if (event.frontmatter.eventTime) {
        const [startTime] = event.frontmatter.eventTime.split(' - ')
        const [hours, minutes] = startTime.split(':')
        const eventStart = new Date()
        eventStart.setHours(parseInt(hours), parseInt(minutes), 0, 0)
        
        const eventEnd = new Date()
        if (event.frontmatter.eventTime.includes(' - ')) {
          const [, endTime] = event.frontmatter.eventTime.split(' - ')
          const [endHours, endMinutes] = endTime.split(':')
          eventEnd.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0)
        } else {
          eventEnd.setHours(23, 59, 0, 0) // Default to end of day
        }

        setIsLive(currentTime >= eventStart && currentTime <= eventEnd)
      }
    }, [currentTime, event.frontmatter.eventTime])
    
    return (
      <article
        className="group relative overflow-hidden bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(34,197,94,0.5)] transition-all duration-500 border-2 border-green-300 hover:border-green-400 transform hover:-translate-y-3 hover:scale-[1.02] animate-fade-in"
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Event Image */}
        {event.frontmatter.image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={event.frontmatter.image}
              alt={event.frontmatter.title}
              className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Live Indicator on Image */}
            <div className="absolute top-4 left-4 z-20">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-2xl backdrop-blur-sm border-2 ${
                isLive 
                  ? "bg-red-600/95 text-white border-red-400 animate-pulse" 
                  : "bg-green-600/95 text-white border-green-400"
              }`}>
                <div className="relative">
                  <div className={`w-3 h-3 rounded-full bg-white`}></div>
                  {isLive && <div className="absolute inset-0 w-3 h-3 rounded-full bg-white animate-ping"></div>}
                </div>
                {isLive ? "🔴 در حال برگزاری" : "📅 امروز"}
              </div>
            </div>

            {/* Featured Badge on Image */}
            {event.frontmatter.featured && (
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-gray-900 text-sm font-bold px-4 py-2 rounded-xl shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-all duration-300 border-2 border-amber-300 animate-pulse">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    ⭐ ویژه
                  </span>
                </div>
              </div>
            )}

            {/* Event Type Badge */}
            {event.frontmatter.type && (
              <div className="absolute bottom-4 right-4">
                <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-white/95 backdrop-blur-md text-green-700 border-2 border-green-200 shadow-2xl">
                  {event.frontmatter.type === 'obituary' ? '🕊️ ترحیم' : 'رویداد'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* No Image Fallback */}
        {!event.frontmatter.image && (
          <div className="relative h-36 bg-gradient-to-br from-green-100 via-emerald-50 to-green-100 overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-200/40 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1" fill="currentColor" className="text-green-500" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Live Indicator */}
            <div className="absolute top-4 left-4 z-20">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                isLive 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "bg-green-500 text-white"
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isLive ? "bg-white animate-ping" : "bg-white"
                }`}></div>
                {isLive ? "در حال برگزاری" : "امروز"}
              </div>
            </div>

            {/* Featured Badge */}
            {event.frontmatter.featured && (
              <div className="absolute top-16 left-4 z-20">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    ویژه
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative z-10 p-4">
          {/* Event Category & Current Time */}
          <div className="flex items-center justify-between mb-3">
            {event.frontmatter.category && (
              <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-200 shadow-sm">
                🏷️ {event.frontmatter.category}
              </span>
            )}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center text-base text-green-700 font-bold bg-green-50 px-3 py-1.5 rounded-lg">
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {getEventPersianShortDate(event)}
              </div>
              <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          {/* Title with special styling for current events */}
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 leading-tight">
            <Link
              to={event.fields?.slug || "#"}
              className="hover:underline decoration-4 decoration-green-400 underline-offset-4 decoration-wavy"
            >
              {event.frontmatter.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-gray-700 text-xs leading-relaxed mb-3 line-clamp-2">
            {event.excerpt}
          </p>

          {/* Event Details with enhanced styling */}
          <div className="grid grid-cols-1 gap-2 mb-3 p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 group-hover:border-green-300 transition-all duration-300">
            {event.frontmatter.eventTime && (
              <div className="flex items-center text-xs">
                <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center ml-2">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">زمان</p>
                  <span className="text-gray-900 text-xs font-semibold">{event.frontmatter.eventTime}</span>
                  {isLive && (
                    <span className="mr-2 text-red-600 text-sm font-bold animate-pulse">● زنده</span>
                  )}
                </div>
              </div>
            )}
            {event.frontmatter.location && (
              <div className="flex items-center text-base">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center ml-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">مکان</p>
                  <span className="text-gray-900 font-bold">{event.frontmatter.location}</span>
                </div>
              </div>
            )}
            {event.frontmatter.organizer && (
              <div className="flex items-center text-base">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center ml-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">برگزارکننده</p>
                  <span className="text-gray-900 font-bold">{event.frontmatter.organizer}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons for Current Events */}
          <div className="flex gap-2">
            <Link
              to={event.fields?.slug || "#"}
              className="flex-1 group/btn relative overflow-hidden inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center">
                {isLive ? "پیوستن به رویداد" : "مشاهده جزئیات"}
                <svg
                  className="mr-2 w-3.5 h-3.5 group-hover/btn:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover/btn:translate-x-[-200%] transition-transform duration-1000"></div>
            </Link>
            
            {isLive && (
              <button className="px-3 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Enhanced hover effect for current events */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-3xl"></div>
      </article>
    )
  }

  const ModernEventCard = ({ event, isPast = false, index }) => {
    const [isHovered, setIsHovered] = useState(false)
    
    return (
      <article
        className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 transform hover:-translate-y-3 hover:scale-[1.02] ${
          isPast 
            ? "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-gray-300 opacity-90 hover:opacity-100" 
            : "bg-gradient-to-br from-white to-primary-50 border-primary-200 hover:border-primary-400"
        } animate-fade-in`}
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Event Image */}
        {event.frontmatter.image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={event.frontmatter.image}
              alt={event.frontmatter.title}
              className={`w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ${
                isPast ? "grayscale group-hover:grayscale-0" : ""
              }`}
            />
            {/* Image Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
              isPast 
                ? 'from-gray-900/70 via-gray-900/30 to-transparent'
                : 'from-primary-900/60 via-primary-900/20 to-transparent'
            }`}></div>
            
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Featured Badge on Image */}
            {event.frontmatter.featured && (
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-gray-900 text-sm font-bold px-4 py-2 rounded-xl shadow-2xl transform rotate-2 group-hover:rotate-0 transition-all duration-300 border-2 border-amber-300">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    ⭐ ویژه
                  </span>
                </div>
              </div>
            )}

            {/* Status Badge on Image */}
            <div className="absolute top-4 left-4 z-20">
              <div className={`px-4 py-2 rounded-xl text-sm font-bold shadow-2xl backdrop-blur-md border-2 ${
                isPast 
                  ? "bg-gray-500/95 text-white border-gray-400" 
                  : "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400"
              }`}>
                {isPast ? "📅 گذشته" : "آینده"}
              </div>
            </div>

            {/* Event Type Badge on Image */}
            {event.frontmatter.type && (
              <div className="absolute bottom-4 right-4">
                <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-white/95 backdrop-blur-md text-primary-700 border-2 border-white/50 shadow-2xl">
                  {event.frontmatter.type === 'obituary' ? '🕊️ ترحیم' : 'رویداد'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* No Image Fallback */}
        {!event.frontmatter.image && (
          <div className={`relative h-36 overflow-hidden ${
            isPast 
              ? "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100" 
              : "bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-100"
          }`}>
            {/* Gradient Overlay Background */}
            <div className="absolute inset-0">
              <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl animate-pulse ${
                isPast ? "bg-gray-300/40" : "bg-primary-300/40"
              }`}></div>
              <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl animate-pulse ${
                isPast ? "bg-gray-200/40" : "bg-secondary-300/40"
              }`} style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Decorative icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            {/* Featured Badge */}
            {event.frontmatter.featured && (
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-gradient-to-r from-secondary-400 to-secondary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    ویژه
                  </span>
                </div>
              </div>
            )}

            {/* Status Indicator */}
            <div className="absolute top-16 left-4 z-20">
              <div className={`w-3 h-3 rounded-full ${isPast ? 'bg-red-400' : 'bg-green-400'} shadow-lg animate-pulse`}></div>
            </div>
          </div>
        )}

        <div className="relative z-10 p-4">
          {/* Event Category & Date */}
          <div className="flex items-center justify-between mb-3">
            {event.frontmatter.category && (
              <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold border-2 shadow-sm ${
                isPast 
                  ? "bg-gray-100 text-gray-700 border-gray-300" 
                  : "bg-primary-100 text-primary-800 border-primary-300"
              }`}>
                🏷️ {event.frontmatter.category}
              </span>
            )}
            <div className={`flex items-center text-base font-semibold px-3 py-1.5 rounded-lg ${
              isPast ? "bg-gray-100 text-gray-600" : "bg-primary-50 text-primary-700"
            }`}>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {getEventPersianShortDate(event)}
            </div>
          </div>

          {/* Title */}
          <h3 className={`text-base md:text-lg font-bold mb-3 leading-tight transition-colors duration-300 ${
            isPast 
              ? "text-gray-700 group-hover:text-gray-900" 
              : "text-gray-900 group-hover:text-primary-600"
          }`}>
            <Link
              to={event.fields?.slug || "#"}
              className="hover:underline decoration-4 underline-offset-4"
            >
              {event.frontmatter.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${
            isPast ? "text-gray-600" : "text-gray-700"
          }`}>
            {event.excerpt}
          </p>

          {/* Event Details Grid */}
          <div className={`grid grid-cols-1 gap-1.5 mb-3 p-3 rounded-lg border transition-all duration-300 ${
            isPast 
              ? "bg-gray-50 border-gray-200 group-hover:border-gray-300" 
              : "bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200 group-hover:border-primary-300 group-hover:shadow-lg"
          }`}>
            {event.frontmatter.eventTime && (
              <div className="flex items-center text-sm">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ml-2 ${
                  isPast ? "bg-gray-200" : "bg-primary-100"
                }`}>
                  <svg className={`w-5 h-5 ${
                    isPast ? "text-gray-600" : "text-primary-600"
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">زمان</p>
                  <span className={`font-bold ${
                    isPast ? "text-gray-700" : "text-gray-900"
                  }`}>{event.frontmatter.eventTime}</span>
                </div>
              </div>
            )}
            {event.frontmatter.location && (
              <div className="flex items-center text-base">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ml-3 ${
                  isPast ? "bg-gray-200" : "bg-blue-100"
                }`}>
                  <svg className={`w-5 h-5 ${
                    isPast ? "text-gray-600" : "text-blue-600"
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">مکان</p>
                  <span className={`font-bold ${
                    isPast ? "text-gray-700" : "text-gray-900"
                  }`}>{event.frontmatter.location}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex justify-between items-center gap-2">
            <Link
              to={event.fields?.slug || "#"}
              className={`flex-1 group/btn relative overflow-hidden inline-flex items-center justify-center px-4 py-3 text-sm font-bold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                isPast 
                  ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700" 
                  : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700"
              }`}
            >
              <span className="relative z-10 flex items-center">
                {isPast ? "مشاهده جزئیات" : "مشاهده جزئیات"}
                <svg
                  className="mr-2 w-4 h-4 group-hover/btn:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover/btn:translate-x-[-200%] transition-transform duration-1000"></div>
            </Link>
          </div>
        </div>

        {/* Hover Effect Elements */}
        <div className={`absolute inset-0 bg-gradient-to-t from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl`}></div>
        
        {/* Decorative corner */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-3xl ${
          isPast ? "from-gray-300/20" : "from-primary-400/20"
        }`}></div>
      </article>
    )
  }

  return (
    <Layout
      title="رویدادها"
      description="رویدادها، جشنواره‌ها و گردهمایی‌های جامعه روستای دنگپیا را کشف کنید"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "خانه",
                "item": "https://dangepia.ir"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "رویدادها",
                "item": "https://dangepia.ir/events"
              }
            ]
          })}
        </script>
      </Helmet>
      {/* Enhanced Hero Section */}
      <HeroSection
        title="رویدادها و فعالیت‌ها"
        subtitle="در قلب زندگی جامعه شرکت کنید و تجربه‌های فراموش‌نشدنی بسازید"
        showButtons={true}
        primaryButton={{
          text: "رویدادهای آینده",
          to: "#upcoming",
          icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        }}
        secondaryButton={{
          text: "ایجاد رویداد",
          to: "/contact",
          icon: "M12 6v6m0 0v6m0-6h6m-6 0H6"
        }}
        showScrollIndicator={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <label htmlFor="event-search" className="sr-only">جستجوی رویداد</label>
            <input
              id="event-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در رویدادها (عنوان، مکان، برگزارکننده)..."
              className="w-full px-6 py-4 pr-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 shadow-sm"
              aria-label="جستجوی رویداد"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="پاک کردن جستجو"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-center mt-3 text-gray-600" role="status" aria-live="polite">
              در حال جستجو برای: <strong className="text-primary-600">{searchQuery}</strong>
            </p>
          )}
        </div>

        {/* Advanced Filters & Controls */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Category Filters */}
            <div className="flex-1">
              <h3 id="category-filter-label" className="text-lg font-semibold text-gray-900 mb-4">فیلتر بر اساس دسته‌بندی</h3>
              <div className="flex flex-wrap gap-2" role="group" aria-labelledby="category-filter-label">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-primary-200 focus:outline-none ${
                      selectedCategory === category
                        ? "bg-primary-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700"
                    }`}
                    aria-pressed={selectedCategory === category}
                    aria-label={`فیلتر رویدادها بر اساس ${category}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode & Sort Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <label htmlFor="sort-select" className="sr-only">مرتب‌سازی رویدادها</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pl-8 text-sm font-medium text-gray-700 hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                  aria-label="انتخاب روش مرتب‌سازی رویدادها"
                >
                  <option value="date">مرتب‌سازی بر اساس تاریخ</option>
                  <option value="title">مرتب‌سازی بر اساس عنوان</option>
                  <option value="featured">رویدادهای ویژه ابتدا</option>
                </select>
                <svg className="absolute left-2 top-3 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1" role="group" aria-label="حالت نمایش">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-primary-400 focus:outline-none ${
                    viewMode === "grid" 
                      ? "bg-white text-primary-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-pressed={viewMode === "grid"}
                  aria-label="نمایش به صورت شبکه"
                  title="نمایش شبکه‌ای"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 6v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-primary-400 focus:outline-none ${
                    viewMode === "list" 
                      ? "bg-white text-primary-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-pressed={viewMode === "list"}
                  aria-label="نمایش به صورت لیست"
                  title="نمایش لیستی"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("calendar")}
                  className={`p-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-primary-400 focus:outline-none ${
                    viewMode === "calendar" 
                      ? "bg-white text-primary-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-pressed={viewMode === "calendar"}
                  aria-label="نمایش تقویم"
                  title="نمایش تقویمی"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">رویدادهای امروز</p>
                <p className="text-3xl font-bold">{currentEvents.length}</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 text-sm font-medium">رویدادهای آینده</p>
                <p className="text-3xl font-bold">{upcomingEvents.length}</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-100 text-sm font-medium">رویدادهای گذشته</p>
                <p className="text-3xl font-bold">{pastEvents.length}</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">کل رویدادها</p>
                <p className="text-3xl font-bold">{events.length}</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-8 p-4 bg-primary-50 border border-primary-200 rounded-xl" role="status" aria-live="polite">
            <p className="text-primary-800 text-center">
              <strong>{filterAndSortEvents([...currentEvents, ...upcomingEvents, ...pastEvents]).length}</strong> رویداد یافت شد برای جستجوی "{searchQuery}"
            </p>
          </div>
        )}

        {/* No Results State */}
        {searchQuery && filterAndSortEvents([...currentEvents, ...upcomingEvents, ...pastEvents]).length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100 mb-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              نتیجه‌ای یافت نشد
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              متأسفانه رویدادی با عبارت "{searchQuery}" پیدا نشد. لطفاً عبارت دیگری را امتحان کنید.
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="btn-primary inline-flex items-center"
            >
              پاک کردن جستجو
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <section className="mb-16">
            <CalendarView events={events} />
          </section>
        )}

        {/* Current Events Section - Today's Events */}
        {viewMode !== "calendar" && filterAndSortEvents(currentEvents).length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  رویدادهای امروز
                </h2>
                <p className="text-gray-600">رویدادهایی که امروز در حال برگزاری هستند یا خواهند بود</p>
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                امروز
              </div>
            </div>
            <div className={`grid gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filterAndSortEvents(currentEvents).map((event, index) => (
                <CurrentEventCard key={index} event={event} index={index} />
              ))}
            </div>
            
            {/* Live Events Ticker */}
            <div className="mt-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">رویدادهای زنده</h3>
              </div>
              <p className="text-gray-600 text-center">
                {currentEvents.length > 0 
                  ? `در حال حاضر ${currentEvents.length} رویداد امروز برنامه‌ریزی شده است. برای مشاهده جزئیات و شرکت در رویدادها، روی کارت‌های بالا کلیک کنید.`
                  : "امروز هیچ رویدادی برنامه‌ریزی نشده است."
                }
              </p>
            </div>
          </section>
        )}

        {/* Upcoming Events Section */}
        {viewMode !== "calendar" && filterAndSortEvents(upcomingEvents, true).length > 0 && (
          <section id="upcoming" className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  رویدادهای آینده
                </h2>
                <p className="text-gray-600">رویدادهایی که در انتظار شرکت شما هستند</p>
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                فعال
              </div>
            </div>
            <div className={`grid gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filterAndSortEvents(upcomingEvents, true).map((event, index) => (
                <ModernEventCard key={index} event={event} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Past Events Section */}
        {viewMode !== "calendar" && filterAndSortEvents(pastEvents).length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  رویدادهای گذشته
                </h2>
                <p className="text-gray-600">خاطراتی از رویدادهای قبلی جامعه</p>
              </div>
              <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                آرشیو
              </div>
            </div>
            <div className={`grid gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filterAndSortEvents(pastEvents).map((event, index) => (
                <ModernEventCard key={index} event={event} isPast={true} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* No Events Message */}
        {events.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              هیچ رویدادی برنامه‌ریزی نشده است
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              در حال حاضر هیچ رویدادی برنامه‌ریزی نشده است. برای اطلاع از
              گردهمایی‌های آینده، دوباره سر بزنید!
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center">
              پیشنهاد رویداد جدید
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          </div>
        )}

        {/* Enhanced Categories Section */}
        <section className="my-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-white to-secondary-50 rounded-3xl"></div>
          <div className="relative p-8">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
              دسته‌بندی رویدادها
            </h3>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              رویدادهای مختلف براساس نوع فعالیت و موضوع دسته‌بندی شده‌اند
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              {[
                { name: "جلسات عمومی", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" },
                { name: "جشنواره‌ها", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
                { name: "رویدادهای فرهنگی", icon: "M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" },
                { name: "شورای روستا", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                { name: "کارگاه‌ها", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" }
              ].map(category => (
                <div
                  key={category.name}
                  className="bg-white py-4 px-6 rounded-2xl text-sm font-semibold text-gray-700 border border-gray-200 shadow-sm cursor-pointer hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                  </svg>
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700"></div>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="hero-pattern absolute inset-0"></div>
          <div className="relative p-12 text-white text-center">
            <h3 className="text-4xl font-bold mb-6">در ارتباط بمانید</h3>
            <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed opacity-90">
              رویدادها و فعالیت‌های روستا را از دست ندهید. اخبار و اطلاعیه‌های ما
              را دنبال کنید و عضو فعال جامعه باشید.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Link 
                to="/news" 
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/30 border border-white/30 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                خواندن اخبار
              </Link>
              <Link 
                to="/contact" 
                className="bg-secondary-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
              >
                <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                تماس با ما
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "event" } } }
      sort: { frontmatter: { eventDate: ASC } }
    ) {
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          eventDate
          eventTime
          location
          organizer
          featured
          category
          image
          type
          description
        }
      }
    }
  }
`

export default EventsPage
