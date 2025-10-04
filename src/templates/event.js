import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"

const EventTemplate = ({ data }) => {
  const event = data.markdownRemark
  const eventDate = new Date(event.frontmatter.eventDate)
  const isUpcoming = eventDate > new Date()
  const isPast = eventDate < new Date()

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
            "startDate": event.frontmatter.eventDate,
            "endDate": event.frontmatter.eventDate, // Assuming single day event
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
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
              "name": event.frontmatter.organizer || "شورای روستای دنگپیا"
            },
            "performer": {
              "@type": "Organization",
              "name": event.frontmatter.organizer || "شورای روستای دنگپیا"
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
              "validFrom": event.frontmatter.date
            }
          })}
        </script>
      </Helmet>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Event Header */}
        <header className="mb-12">
          <div className="mb-6">
            <Link 
              to="/events"
              className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center"
            >
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              بازگشت به رویدادها
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {event.frontmatter.title}
          </h1>
          
          {/* Event Status */}
          <div className="mb-8">
            {isUpcoming && (
              <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                رویداد پیش رو
              </span>
            )}
            {isPast && (
              <span className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                رویداد گذشته
              </span>
            )}
          </div>

          {/* Event Details Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-primary-500">
              جزئیات رویداد
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center ml-4">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">تاریخ و زمان</h4>
                  <div className="text-gray-600">
                    {event.frontmatter.eventDate && (
                      <div className="mb-1">
                        {new Date(event.frontmatter.eventDate).toLocaleDateString('fa-IR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    )}
                    {event.frontmatter.eventTime && (
                      <div>{event.frontmatter.eventTime}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center ml-4">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">محل برگزاری</h4>
                  <div className="text-gray-600">
                    {event.frontmatter.location || 'محل تعیین نشده'}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center ml-4">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">برگزارکننده</h4>
                  <div className="text-gray-600">
                    {event.frontmatter.organizer || 'اداره روستا'}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center ml-4">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">تاریخ انتشار</h4>
                  <div className="text-gray-600">
                    {event.frontmatter.date}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-200" />
        </header>

        {/* Event Content */}
        <div 
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed prose-headings:text-right prose-p:text-justify prose-ul:pr-6 prose-ol:pr-6 prose-blockquote:border-r-4 prose-blockquote:border-l-0 prose-blockquote:pr-4 prose-blockquote:pl-0"
          dangerouslySetInnerHTML={{ __html: event.html }}
        />

        {/* Action Buttons */}
        {isUpcoming && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mt-12 text-center">
            <h4 className="text-xl font-bold text-green-900 mb-4">
              علاقه‌مند به شرکت هستید؟
            </h4>
            <p className="text-green-800 mb-6">
              برای اطلاعات بیشتر یا ثبت‌نام در این رویداد، با ما تماس بگیرید:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+98XXXXXXXX"
                className="btn-primary inline-flex items-center justify-center"
              >
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                تماس با دفتر روستا
              </a>
              <Link 
                to="/contact"
                className="btn-secondary inline-flex items-center justify-center"
              >
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ارسال پیام
              </Link>
            </div>
          </div>
        )}

        {/* Event Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4">اشتراک‌گذاری این رویداد</h4>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: event.frontmatter.title,
                      text: `به رویداد ${event.frontmatter.title} در تاریخ ${event.frontmatter.eventDate} بپیوندید`,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert('لینک در کلیپ‌بورد کپی شد!')
                  }
                }}
                className="btn-primary flex-1"
              >
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                اشتراک‌گذاری رویداد
              </button>
              <button
                onClick={() => {
                  // Create calendar event data
                  const startDate = new Date(event.frontmatter.eventDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
                  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.frontmatter.title)}&dates=${startDate}/${startDate}&location=${encodeURIComponent(event.frontmatter.location || '')}`
                  window.open(calendarUrl, '_blank')
                }}
                className="btn-secondary flex-1"
              >
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                افزودن به تقویم
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
        date(formatString: "MMMM DD, YYYY")
        eventDate
        eventTime
        location
        organizer
        featured
      }
    }
  }
`

export default EventTemplate