import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const EventsPage = ({ data }) => {
  const events = data?.allMarkdownRemark?.nodes || []

  // Separate upcoming and past events
  const now = new Date()
  const upcomingEvents = events.filter(
    event => new Date(event.frontmatter.eventDate) >= now
  )
  const pastEvents = events.filter(
    event => new Date(event.frontmatter.eventDate) < now
  )

  const EventCard = ({ event, isPast = false }) => (
    <article
      className={`card flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1 ${
        isPast ? "opacity-75" : ""
      }`}
    >
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 flex-1">
            <Link
              to={event.fields?.slug || "#"}
              className="hover:text-primary-600 transition-colors duration-300"
            >
              {event.frontmatter.title}
            </Link>
          </h3>
          {event.frontmatter.featured && (
            <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full ml-4">
              ویژه
            </span>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed mb-6">{event.excerpt}</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-b-xl border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
          <div>
            <strong className="block text-gray-500 font-semibold text-xs uppercase">
              تاریخ
            </strong>
            <p className="text-gray-800">{event.frontmatter.eventDate}</p>
          </div>
          {event.frontmatter.eventTime && (
            <div>
              <strong className="block text-gray-500 font-semibold text-xs uppercase">
                زمان
              </strong>
              <p className="text-gray-800">{event.frontmatter.eventTime}</p>
            </div>
          )}
          {event.frontmatter.location && (
            <div>
              <strong className="block text-gray-500 font-semibold text-xs uppercase">
                مکان
              </strong>
              <p className="text-gray-800">{event.frontmatter.location}</p>
            </div>
          )}
          {event.frontmatter.organizer && (
            <div>
              <strong className="block text-gray-500 font-semibold text-xs uppercase">
                برگزارکننده
              </strong>
              <p className="text-gray-800">{event.frontmatter.organizer}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Link
            to={event.fields?.slug || "#"}
            className="text-primary-600 hover:text-primary-700 font-bold inline-flex items-center"
          >
            {isPast ? "مشاهده جزئیات رویداد" : "بیشتر بدانید"}
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </Link>
          <div>
            {isPast ? (
              <span className="text-red-600 font-semibold text-sm">
                رویداد گذشته
              </span>
            ) : (
              <span className="text-green-600 font-semibold text-sm">
                آینده
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )

  return (
    <Layout
      title="رویدادها"
      description="رویدادها، جشنواره‌ها و گردهمایی‌های جامعه روستای دانگپیا را کشف کنید"
    >
      {/* Hero Section */}
      <HeroSection
        title="رویدادها"
        subtitle="در فعالیت‌ها و برنامه‌های جامعه شرکت کنید"
        showButtons={false}
        showScrollIndicator={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              رویدادهای آینده
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              رویدادهای گذشته
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <EventCard key={index} event={event} isPast={true} />
              ))}
            </div>
          </section>
        )}

        {/* No Events Message */}
        {events.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              هیچ رویدادی برنامه‌ریزی نشده است
            </h3>
            <p className="text-gray-600">
              در حال حاضر هیچ رویدادی برنامه‌ریزی نشده است. برای اطلاع از
              گردهمایی‌های آینده، دوباره سر بزنید!
            </p>
          </div>
        )}

        {/* Event Categories Section */}
        <section className="my-16 p-8 bg-gray-100 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            دسته‌بندی رویدادها
          </h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {[
              "جلسات عمومی",
              "جشنواره‌ها",
              "رویدادهای فرهنگی",
              "شورای روستا",
              "کارگاه‌ها",
            ].map(category => (
              <span
                key={category}
                className="bg-white py-2 px-5 rounded-full text-sm font-semibold text-gray-700 border border-gray-200 shadow-sm cursor-pointer hover:bg-primary-50 hover:border-primary-200 transition-all"
              >
                {category}
              </span>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="gradient-bg rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">در ارتباط بمانید</h3>
          <p className="max-w-2xl mx-auto mb-6 opacity-90">
            رویدادها و فعالیت‌های روستا را از دست ندهید. اخبار و اطلاعیه‌های ما
            را دنبال کنید.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/news" className="btn-secondary">
              خواندن اخبار
            </Link>
            <Link to="/contact" className="btn-primary">
              تماس با ما
            </Link>
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
          date(formatString: "MMMM DD, YYYY")
          eventDate(formatString: "MMMM DD, YYYY")
          eventTime
          location
          organizer
          featured
        }
      }
    }
  }
`

export default EventsPage
