import React from "react"
import { Link } from "gatsby"
import { useForm, ValidationError } from '@formspree/react'
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const ContactPage = () => {
  const [state, handleSubmit] = useForm("manbjnyb")

  return (
    <Layout title="تماس با ما" description="با مسئولان و رهبران جامعه روستای دنگپیا در تماس باشید">
      <HeroSection 
        title="تماس با ما"
        subtitle="راه های ارتباطی با ما"
        showButtons={false}
        showScrollIndicator={true}
      />
      
      {/* Contact Intro Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              با ما در ارتباط باشید
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              دوست داریم از شما بشنویم! برای هر گونه سوال، نگرانی یا پیشنهاد در مورد روستای ما با ما تماس بگیرید.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="card">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                پیام خود را ارسال کنید
              </h3>
              
              {state.succeeded && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 transition-all duration-300">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>از پیام شما متشکریم.</span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-5">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    نام و نام خانوادگی *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="نام کامل خود را وارد کنید"
                      className="form-input text-right"
                      dir="rtl"
                      required
                    />
                  </div>
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    آدرس ایمیل *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@email.com"
                      className="form-input text-right"
                      dir="rtl"
                      required
                    />
                  </div>
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    موضوع *
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      className="form-input text-right appearance-none"
                      dir="rtl"
                      required
                    >
                      <option value="">موضوع را انتخاب کنید...</option>
                      <option value="general">استعلام عمومی</option>
                      <option value="services">خدمات روستا</option>
                      <option value="complaint">شکایت</option>
                      <option value="suggestion">پیشنهاد</option>
                      <option value="event">استعلام رویداد</option>
                      <option value="other">سایر</option>
                    </select>
                    <div className="absolute left-3 top-3.5 text-gray-500 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <ValidationError 
                    prefix="Subject" 
                    field="subject"
                    errors={state.errors}
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    پیام *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="لطفا درخواست خود را به تفصیل شرح دهید..."
                      className="form-textarea text-right"
                      dir="rtl"
                      required
                    />
                  </div>
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="mt-1 text-red-500 text-sm"
                  />
                </div>

                <button 
                  type="submit"
                  className="btn-primary w-full text-lg"
                  disabled={state.submitting}
                >
                  {state.submitting ? 'در حال ارسال...' : 'ارسال پیام'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                اطلاعات تماس
              </h3>
              
              <div className="space-y-6">
                <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900">دفتر روستا</h4>
                  </div>
                  <div className="space-y-3 text-gray-700 pr-2">
                    <div className="flex">
                      <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>
                        دفتر روستای دنگپیا<br />
                        خیابان اصلی، دنگپیا<br />
                        [کدپستی]، [استان]، ایران
                      </span>
                    </div>
                    <div className="flex">
                      <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>تلفن: ۰۹۸-XXX-XXXX</span>
                    </div>
                    <div className="flex">
                      <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>ایمیل: info@dangepia.ir</span>
                    </div>
                    <div>
                      <div className="flex">
                        <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">ساعات کاری:</span>
                      </div>
                      <div className="mt-2 pr-7">
                        دوشنبه تا جمعه: ۸:۰۰ تا ۱۶:۰۰<br />
                        شنبه: ۹:۰۰ تا ۱۳:۰۰<br />
                        یکشنبه: تعطیل
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                  <div className="flex items-start mb-4">
                    <div className="bg-purple-100 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900">شورای روستا</h4>
                  </div>
                  <div className="space-y-3 text-gray-700 pr-2">
                    <div className="flex">
                      <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>
                        <strong>دهیار:</strong> [نام دهیار]<br />
                        <strong>ایمیل:</strong> mayor@dangepia.ir
                      </span>
                    </div>
                    <div>
                      <div className="flex">
                        <svg className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">جلسات شورا:</span>
                      </div>
                      <div className="mt-2 pr-7">
                        پنجشنبه اول هر ماه<br />
                        ساعت ۱۹:۰۰ در سالن روستا
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              تماس‌های اضطراری
            </h2>
            <p className="text-xl text-gray-600">
              شماره‌های ضروری برای شرایط اضطراری
            </p>
          </div>
          
          <div className="card bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
            <div className="flex items-start mb-6">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-red-800">شماره‌های اضطراری</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-red-700">
              <div className="flex items-center p-4 bg-white bg-opacity-50 rounded-lg">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-lg font-semibold"><strong>پلیس:</strong> ۱۱۰</span>
              </div>
              <div className="flex items-center p-4 bg-white bg-opacity-50 rounded-lg">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
                <span className="text-lg font-semibold"><strong>آتش‌نشانی:</strong> ۱۲۵</span>
              </div>
              <div className="flex items-center p-4 bg-white bg-opacity-50 rounded-lg">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-lg font-semibold"><strong>اورژانس پزشکی:</strong> ۱۱۵</span>
              </div>
              <div className="flex items-center p-4 bg-white bg-opacity-50 rounded-lg">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-lg font-semibold"><strong>خط اضطراری روستا:</strong> ۰۹۸-XXX-XXXX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ما را پیدا کنید
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              در ساعات اداری از دفتر روستا دیدن کنید یا در جلسات ماهانه شورا شرکت کنید.
            </p>
          </div>
          
          <div className="card bg-gray-200 h-64 md:h-96 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-700 text-xl font-medium mb-2">نقشه تعاملی</p>
              <p className="text-gray-500">(ادغام نقشه در اینجا اضافه خواهد شد)</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            سوالی دارید؟
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            تیم ما آماده پاسخگویی به سوالات شما و ارائه بهترین خدمات به شما عزیزان است
          </p>
          <Link 
            to="/services" 
            className="btn-secondary inline-flex items-center px-8 py-3 text-lg font-semibold"
          >
            مشاهده خدمات
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default ContactPage