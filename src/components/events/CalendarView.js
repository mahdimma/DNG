import React, { useState, useMemo } from "react"
import { Link } from "gatsby"

const CalendarView = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek, year, month }
  }
  
  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)
  
  // Group events by day
  const eventsByDay = useMemo(() => {
    const grouped = {}
    events.forEach(event => {
      const eventDate = new Date(event.frontmatter.eventDate)
      if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
        const day = eventDate.getDate()
        if (!grouped[day]) grouped[day] = []
        grouped[day].push(event)
      }
    })
    return grouped
  }, [events, year, month])
  
  // Navigate months
  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1))
  }
  
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1))
  }
  
  const goToToday = () => {
    setCurrentMonth(new Date())
  }
  
  // Persian month names
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ]
  
  // Persian day names
  const persianDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
  
  // Generate calendar days
  const calendarDays = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }
  
  const today = new Date()
  const isToday = (day) => {
    return day && 
           today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-primary-400 focus:outline-none"
          aria-label="ماه قبل"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            {new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long' }).format(currentMonth)}
          </h3>
          <button
            onClick={goToToday}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-1 focus:outline-none focus:underline"
          >
            برو به امروز
          </button>
        </div>
        
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-primary-400 focus:outline-none"
          aria-label="ماه بعد"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {persianDays.map((day, index) => (
          <div key={index} className="text-center text-sm font-bold text-gray-600 p-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`min-h-24 p-2 rounded-lg border-2 transition-all ${
              !day
                ? 'border-transparent bg-gray-50'
                : isToday(day)
                ? 'border-primary-500 bg-primary-50'
                : eventsByDay[day]
                ? 'border-green-300 bg-green-50 hover:bg-green-100 cursor-pointer'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            role={day && eventsByDay[day] ? "button" : undefined}
            tabIndex={day && eventsByDay[day] ? 0 : undefined}
          >
            {day && (
              <>
                <div className={`text-sm font-bold mb-1 ${
                  isToday(day) ? 'text-primary-700' : 'text-gray-700'
                }`}>
                  {day}
                </div>
                {eventsByDay[day] && (
                  <div className="space-y-1">
                    {eventsByDay[day].slice(0, 2).map((event, idx) => (
                      <Link
                        key={idx}
                        to={event.fields?.slug || "#"}
                        className="block text-xs p-1 bg-white rounded border border-primary-200 text-primary-700 hover:bg-primary-100 transition-colors truncate"
                        title={event.frontmatter.title}
                      >
                        {event.frontmatter.title}
                      </Link>
                    ))}
                    {eventsByDay[day].length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{eventsByDay[day].length - 2} رویداد دیگر
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-primary-500 bg-primary-50"></div>
          <span className="text-gray-600">امروز</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-green-300 bg-green-50"></div>
          <span className="text-gray-600">دارای رویداد</span>
        </div>
      </div>
    </div>
  )
}

export default CalendarView
