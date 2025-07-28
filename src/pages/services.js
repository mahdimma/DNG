import React, { useState } from "react"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  // GraphQL query to fetch services data
  const data = useStaticQuery(graphql`
    query {
      allServicesJson {
        nodes {
          id
          title
          titleEn
          description
          contact
          hours
          category
          icon
          color
        }
      }
    }
  `)

  const services = data.allServicesJson.nodes

  // Icon mapping for easier icon management
  const getIconPath = (iconName) => {
    const icons = {
      building: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      truck: "M8 17l4 4 4-4m-4-5v9m-9-9a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5z",
      library: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3zM9 3v1h6V3H9zm-4 7v9h14v-9H5z",
      leaf: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
      shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      fire: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
      phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      alert: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
      chat: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      form: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    }
    return icons[iconName] || icons.building
  }

  const getColorClasses = (color) => {
    const colors = {
      primary: {
        bg: "bg-primary-100",
        hover: "group-hover:bg-primary-200",
        text: "text-primary-600",
        border: "border-primary-500"
      },
      red: {
        bg: "bg-red-100",
        hover: "group-hover:bg-red-200",
        text: "text-red-600",
        border: "border-red-500"
      },
      blue: {
        bg: "bg-blue-100",
        hover: "group-hover:bg-blue-200",
        text: "text-blue-600",
        border: "border-blue-500"
      },
      indigo: {
        bg: "bg-indigo-100",
        hover: "group-hover:bg-indigo-200",
        text: "text-indigo-600",
        border: "border-indigo-500"
      },
      purple: {
        bg: "bg-purple-100",
        hover: "group-hover:bg-purple-200",
        text: "text-purple-600",
        border: "border-purple-500"
      },
      green: {
        bg: "bg-green-100",
        hover: "group-hover:bg-green-200",
        text: "text-green-600",
        border: "border-green-500"
      }
    }
    return colors[color] || colors.primary
  }

  return (
    <Layout title="خدمات" description="خدمات مختلف موجود برای ساکنان روستای دانگپیا را کشف کنید">
      {/* Hero Section */}
      <HeroSection 
        title="خدمات روستا"
        subtitle="روستای دانگپیا مجموعه‌ای جامع از خدمات را برای برآوردن نیازهای جامعه ارائه می‌دهد"
        showButtons={false}
        showScrollIndicator={true}
      />
      
      {/* Services Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              در زیر اطلاعات خدمات موجود، جزئیات تماس و ساعات کاری را مشاهده خواهید کرد. 
              تمام خدمات با هدف ارتقای کیفیت زندگی ساکنان روستا ارائه می‌شود.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => {
              const colorClasses = getColorClasses(service.color)
              const iconPath = getIconPath(service.icon)
              return (
                <div key={service.id} className="card group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Service Icon */}
                  <div className={`w-16 h-16 ${colorClasses.bg} ${colorClasses.hover} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300`}>
                    <svg className={`w-8 h-8 ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                    </svg>
                  </div>
                  
                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-primary-600 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 text-center mb-4 font-medium">
                    {service.titleEn}
                  </p>
                  
                  {/* Service Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-center">
                    {service.description}
                  </p>
                  
                  {/* Contact Information */}
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg border-r-4 border-primary-500">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-primary-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="font-semibold text-gray-800">تماس:</span>
                      </div>
                      <p className="text-gray-600 text-sm">{service.contact}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border-r-4 border-secondary-500">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-secondary-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-gray-800">ساعات کاری:</span>
                      </div>
                      <p className="text-gray-600 text-sm">{service.hours}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath('alert')} />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              تماس‌های اضطراری
            </h2>
            <p className="text-xl text-gray-600">
              در مواقع اضطراری با شماره‌های زیر تماس بگیرید
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "پلیس", number: "110", icon: "shield", color: "blue" },
              { title: "آتش‌نشانی", number: "125", icon: "fire", color: "red" },
              { title: "اورژانس پزشکی", number: "115", icon: "heart", color: "green" },
              { title: "دفتر روستا", number: "+98-XXX-XXXX", icon: "building", color: "indigo" }
            ].map((contact, index) => {
              const colorClasses = getColorClasses(contact.color)
              const iconPath = getIconPath(contact.icon)
              return (
                <div key={index} className="card group text-center">
                  <div className={`w-12 h-12 ${colorClasses.bg} ${colorClasses.hover} rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}>
                    <svg className={`w-6 h-6 ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{contact.title}</h3>
                  <a 
                    href={`tel:${contact.number}`}
                    className={`text-lg font-mono font-bold ${colorClasses.text} hover:underline transition-colors duration-200`}
                  >
                    {contact.number}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Request CTA Section */}
      <section className="gradient-bg text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath('chat')} />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              نیاز به درخواست خدمات دارید؟
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              برای درخواست خدمات، شکایات یا پیشنهادات، لطفاً با دفتر روستا تماس بگیرید 
              یا در ساعات اداری به ما مراجعه کنید.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+98XXXXXXXX"
              className="btn-secondary inline-flex items-center px-8 py-3 text-lg font-semibold group"
            >
              <svg className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath('phone')} />
              </svg>
              تماس با دفتر روستا
            </a>
            <Link 
              to="/contact"
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 border-2 border-white/30 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg inline-flex items-center group"
            >
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath('form')} />
              </svg>
              فرم تماس
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ServicesPage
