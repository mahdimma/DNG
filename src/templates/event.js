import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import { exportToICS, addToGoogleCalendar, shareEvent } from "../utils/calendarExport"

// Utility function to convert date to Persian format
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

const EventTemplate = ({ data }) => {
  const event = data.markdownRemark
  const eventDate = new Date(event.frontmatter.eventDate)
  const isUpcoming = eventDate > new Date()
  const isPast = eventDate < new Date()
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [shareFeedback, setShareFeedback] = useState('')
  const [downloadingICS, setDownloadingICS] = useState(false)
  
  // Convert dates to ISO 8601 format with timezone
  const startDateTime = event.frontmatter.eventTime 
    ? `${event.frontmatter.eventDate}T${event.frontmatter.eventTime.split(' - ')[0]}:00+03:30`
    : new Date(event.frontmatter.eventDate).toISOString()
  
  const endDateTime = event.frontmatter.eventTime && event.frontmatter.eventTime.includes(' - ')
    ? `${event.frontmatter.eventDate}T${event.frontmatter.eventTime.split(' - ')[1]}:00+03:30`
    : new Date(event.frontmatter.eventDate).toISOString()

  // Handle .ics download
  const handleDownloadICS = () => {
    setDownloadingICS(true)
    try {
      exportToICS(event)
      setTimeout(() => setDownloadingICS(false), 2000)
    } catch (error) {
      console.error('Error downloading ICS:', error)
      setDownloadingICS(false)
    }
  }

  // Handle share
  const handleShare = async () => {
    const result = await shareEvent(event, window.location.href)
    if (result.success) {
      if (result.fallback === 'clipboard') {
        setShareFeedback('لینک در کلیپ‌بورد کپی شد!')
      } else {
        setShareFeedback('با موفقیت به اشتراک گذاشته شد!')
      }
    } else {
      setShareFeedback('خطا در اشتراک‌گذاری')
    }
    setTimeout(() => setShareFeedback(''), 3000)
  }

  return (
    <Layout 
      title={event.frontmatter.title}
      description={event.excerpt}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": event.frontmatter.title,
            "description": event.excerpt,
            "startDate": startDateTime,
            "endDate": endDateTime,
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": isUpcoming ? "https://schema.org/EventScheduled" : "https://schema.org/EventPassed",
            "location": {
              "@type": "Place",
              "name": event.frontmatter.location || "روستای دنگپیا",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "دنگپیا",
                "addressRegion": "کرمانشاه",
                "addressCountry": "IR"
              }
            },
            "organizer": {
              "@type": "Organization",
              "name": event.frontmatter.organizer || "شورای روستای دنگپیا",
              "url": "https://dangepia.ir"
            },
            "performer": {
              "@type": "Organization",
              "name": event.frontmatter.organizer || "شورای روستای دنگپیا",
              "url": "https://dangepia.ir"
            },
            "image": [
              "https://dangepia.ir/event-image.jpg"
            ],
            "url": `https://dangepia.ir${event.fields.slug}`,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "IRR",
              "availability": "https://schema.org/InStock",
              "validFrom": new Date(event.frontmatter.date).toISOString(),
              "url": `https://dangepia.ir${event.fields.slug}`
            }
          })}
        </script>
      </Helmet>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Event Header */}
        <header className="mb-16">
          <div className="mb-8">
            <Link 
              to="/events"
              className="text-primary-600 hover:text-primary-700 font-bold text-lg inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 group"
            >
              <svg className="w-7 h-7 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              🔙 بازگشت به رویدادها
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 mb-10 leading-tight">
            {event.frontmatter.title}
          </h1>
          
          {/* Event Status */}
          <div className="mb-10 flex flex-wrap gap-4">
            {isUpcoming && (
              <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                رویداد پیش رو
              </span>
            )}
            {isPast && (
              <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl text-base font-bold shadow-lg">
                <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                📖 رویداد گذشته
              </span>
            )}
            {event.frontmatter.featured && (
              <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 rounded-2xl text-base font-bold shadow-lg animate-pulse">
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                ⭐ رویداد ویژه
              </span>
            )}
          </div>

          {/* Event Details Box */}
          <div className="bg-gradient-to-br from-white via-primary-50/30 to-white border-2 border-primary-200 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-500 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              جزئیات رویداد
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start group hover-lift bg-gradient-to-br from-white to-primary-50/30 p-4 rounded-xl border border-primary-100 hover:border-primary-300 transition-all">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 rounded-xl flex items-center justify-center ml-3 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-base">تاریخ و زمان</h4>
                  <div className="text-gray-700 text-sm">
                    {event.frontmatter.eventDate && (
                      <div className="mb-2 font-semibold">
                        {new Date(event.frontmatter.eventDate).toLocaleDateString('fa-IR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    )}
                    {event.frontmatter.eventTime && (
                      <div className="text-primary-600 font-bold">⏰ {event.frontmatter.eventTime}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start group hover-lift bg-gradient-to-br from-white to-blue-50/30 p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 rounded-2xl flex items-center justify-center ml-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-9 h-9 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-4 text-xl flex items-center gap-2">📍 محل برگزاری</h4>
                  <div className="text-gray-700 font-black text-lg">
                    {event.frontmatter.location || 'محل تعیین نشده'}
                  </div>
                </div>
              </div>

              <div className="flex items-start group hover-lift bg-gradient-to-br from-white to-purple-50/30 p-6 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 rounded-2xl flex items-center justify-center ml-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-9 h-9 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-4 text-xl flex items-center gap-2">👥 برگزارکننده</h4>
                  <div className="text-gray-700 font-black text-lg">
                    {event.frontmatter.organizer || 'اداره روستا'}
                  </div>
                </div>
              </div>

              <div className="flex items-start group hover-lift bg-gradient-to-br from-white to-green-50/30 p-6 rounded-2xl border-2 border-green-100 hover:border-green-300 transition-all">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-100 via-green-200 to-green-300 rounded-2xl flex items-center justify-center ml-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <svg className="w-9 h-9 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-4 text-xl flex items-center gap-2">📄 تاریخ انتشار</h4>
                  <div className="text-gray-700 font-black text-lg">
                    {toPersianDate(event.frontmatter.date)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-300" />
        </header>

        {/* Event Image - Smaller size above content */}
        {event.frontmatter.image && (
          <div className="mb-12 flex justify-center">
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] max-w-3xl w-full transform hover:scale-[1.02]"
              onClick={() => setImageModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setImageModalOpen(true)}
            >
              <img
                src={event.frontmatter.image}
                alt={event.frontmatter.title}
                className="w-full h-auto max-h-96 object-cover"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold">🔍 کلیک برای بزرگنمایی</p>
                </div>
              </div>
              
              {/* Badges on image */}
              <div className="absolute top-6 right-6 flex gap-3">
                {event.frontmatter.type && (
                  <span className="inline-flex items-center px-5 py-2.5 rounded-2xl text-sm font-bold bg-white/95 backdrop-blur-md text-gray-900 shadow-2xl border-2 border-white/50">
                    {event.frontmatter.type === 'obituary' ? '🕊️ ترحیم' : 'رویداد'}
                  </span>
                )}
                {event.frontmatter.category && (
                  <span className="inline-flex items-center px-5 py-2.5 rounded-2xl text-sm font-bold bg-primary-500/95 backdrop-blur-md text-white shadow-2xl border-2 border-primary-400">
                    {event.frontmatter.category}
                  </span>
                )}
              </div>
              
              {/* Image caption */}
              {event.frontmatter.description && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-3 text-center">
                  <p className="text-xs md:text-sm">{event.frontmatter.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Event Content */}
        <div 
          className="prose prose-xl max-w-none text-gray-800 leading-relaxed prose-headings:text-right prose-headings:font-black prose-headings:text-gray-900 prose-p:text-justify prose-p:text-lg prose-ul:pr-8 prose-ol:pr-8 prose-li:text-lg prose-blockquote:border-r-4 prose-blockquote:border-l-0 prose-blockquote:border-primary-500 prose-blockquote:pr-6 prose-blockquote:pl-0 prose-blockquote:italic prose-strong:text-primary-700 prose-strong:font-black"
          dangerouslySetInnerHTML={{ __html: event.html }}
        />

        {/* Image Modal/Lightbox */}
        {imageModalOpen && event.frontmatter.image && (
          <div 
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setImageModalOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute top-3 left-3 text-white/90 hover:text-white transition-colors z-10 bg-black/50 rounded-full p-1.5 backdrop-blur-sm"
              onClick={() => setImageModalOpen(false)}
              aria-label="بستن تصویر"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div 
              className="max-w-3xl w-full flex flex-col gap-3" 
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={event.frontmatter.image}
                alt={event.frontmatter.title}
                className="w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Description below image */}
              {event.frontmatter.description && (
                <div className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg text-center">
                  <p className="text-sm md:text-base">{event.frontmatter.description}</p>
                </div>
              )}
            </div>
            
            <p className="absolute bottom-4 text-white/60 text-sm">
              کلیک در هر نقطه برای بستن
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        {isUpcoming && (
          <div className="relative overflow-hidden rounded-3xl p-10 mt-16 text-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-green-700"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl"></div>
            </div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-3xl font-black text-white mb-4">
                🎉 علاقه‌مند به شرکت هستید؟
              </h4>
              <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
                برای اطلاعات بیشتر یا ثبت‌نام در این رویداد، با ما تماس بگیرید:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+98XXXXXXXX"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-bold rounded-2xl hover:bg-green-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  📞 تماس با دفتر روستا
                </a>
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl hover:bg-white/20 border-2 border-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  ✉️ ارسال پیام
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Event Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4">اشتراک‌گذاری و افزودن به تقویم</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="btn-primary flex-1 relative overflow-hidden group"
                aria-label="اشتراک‌گذاری رویداد"
              >
                <svg className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                اشتراک‌گذاری رویداد
                {shareFeedback && (
                  <span className="absolute inset-0 bg-green-500 flex items-center justify-center text-white font-semibold animate-fade-in">
                    ✓ {shareFeedback}
                  </span>
                )}
              </button>

              {/* Google Calendar Button */}
              <button
                onClick={() => window.open(addToGoogleCalendar(event), '_blank', 'noopener,noreferrer')}
                className="btn-secondary flex-1 group"
                aria-label="افزودن به گوگل کلندر"
              >
                <svg className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                افزودن به تقویم Google
              </button>

              {/* Download .ics Button */}
              <button
                onClick={handleDownloadICS}
                disabled={downloadingICS}
                className="btn-secondary flex-1 group relative"
                aria-label="دانلود فایل تقویم"
              >
                <svg className={`ml-2 w-5 h-5 transition-transform ${downloadingICS ? 'animate-bounce' : 'group-hover:scale-110'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                {downloadingICS ? 'در حال دانلود...' : 'دانلود .ics'}
              </button>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h4 className="text-xl font-bold text-gray-900 mb-4">رویدادهای بیشتر</h4>
            <p className="text-gray-600 mb-6">
              رویدادهای پیش روی روستای دنگپیا را کشف کنید
            </p>
            <Link 
              to="/events"
              className="btn-primary inline-flex items-center"
            >
              مشاهده همه رویدادها
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </footer>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
        image
        type
        description
        category
      }
    }
  }
`

export default EventTemplate