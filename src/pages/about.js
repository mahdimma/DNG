import React from "react"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const AboutPage = () => {
  return (
    <Layout title="درباره ما" description="درباره روستای دانگپیا، تاریخ، فرهنگ و جامعه آن بیاموزید">
      {/* Hero Section */}
      <HeroSection 
        title="درباره روستای دانگپیا"
        subtitle="روستایی با تاریخ غنی، فرهنگ زنده و جامعه‌ای پرمحبت که نسل‌ها را به هم پیوند داده است"
        showButtons={false}
        showScrollIndicator={true}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* History Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-3 h-3 bg-primary-500 rounded-full ml-3"></div>
                تاریخ ما
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                روستای دانگپیا دارای تاریخ غنی و قدمتی چندین قرنه است. این روستا از گذشته‌های دور
                مرکز جامعه، فرهنگ و سنت بوده است. روستا جذابیت تاریخی خود را حفظ کرده در حالی که 
                امکانات مدرن رو برای ساکنانش فراهم آورده است.
              </p>
            </div>
            <div className="card">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">میراث تاریخی</h3>
              <p className="text-gray-600">
                قدمت چندین قرنه روستا در آثار باستانی، بناهای تاریخی و داستان‌های شفاهی که از نسل به نسل منتقل شده نمود دارد.
              </p>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="card">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">یک جامعه</h3>
                <p className="text-gray-600">
                  روستا خانه خانواده‌هایی است که نسل‌ها اینجا بوده‌اند و همچنین مهاجران جدیدی که با آغوش باز پذیرفته شده‌اند.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-3 h-3 bg-secondary-500 rounded-full ml-3"></div>
                جامعه ما
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                روستای ما خانه جامعه‌ای پر جنب و جوش از خانواده‌هایی است که نسل‌ها اینجا زندگی کرده‌اند،
                همچنین تازه واردهایی که با آغوش باز پذیرفته شده‌اند. ما به حس قوی جامعه، حمایت متقابل
                و ارزش‌های مشترکمان افتخار می‌کنیم.
              </p>
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="mb-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center justify-center">
              <div className="w-3 h-3 bg-primary-500 rounded-full ml-3"></div>
              فرهنگ و سنت‌ها
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-justify mb-12">
              روستای دانگپیا میراث فرهنگی خود را از طریق جشنواره‌ها، جشن‌ها و آداب سنتی مختلف
              حفظ می‌کند. رویدادهای سالانه ما جامعه را گرد هم می‌آورد و به حفظ هویت منحصر به فرد
              ما برای نسل‌های آینده کمک می‌کند.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">جشنواره‌ها</h3>
                <p className="text-sm text-gray-600">
                  برگزاری جشنواره‌های سنتی و محلی در طول سال
                </p>
              </div>
              
              <div className="card">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10l1 16H6L7 4z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">صنایع دستی</h3>
                <p className="text-sm text-gray-600">
                  حفظ و ترویج هنرهای سنتی و صنایع دستی محلی
                </p>
              </div>
              
              <div className="card">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">موسیقی محلی</h3>
                <p className="text-sm text-gray-600">
                  موسیقی و آهنگ‌های سنتی که هویت ما را تشکیل می‌دهد
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Geography and Leadership sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full ml-3"></div>
              جغرافیا و موقعیت
            </h2>
            <div className="card h-full">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gray-600 leading-relaxed text-justify">
                روستای دانگپیا در محیطی طبیعی زیبا قرار دارد و مناظر خیره‌کننده و محیطی آرام
                ارائه می‌دهد. روستا در موقعیت استراتژیکی با دسترسی خوب به حمل و نقل قرار دارد
                در حالی که جذابیت روستایی خود را حفظ کرده است.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full ml-3"></div>
              رهبری روستا
            </h2>
            <div className="card h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-gray-600 leading-relaxed text-justify">
                روستای ما توسط شورایی از رهبران جامعه اداره می‌شود که بی‌وقفه برای تامین رفاه
                همه ساکنان تلاش می‌کنند. شورای روستا به طور منظم جلسه برگزار می‌کند تا درباره
                مسائل جامعه بحث کرده و برای آینده برنامه‌ریزی کند.
              </p>
            </div>
          </section>
        </div>

        {/* Future Vision Section */}
        <section className="mt-16 gradient-bg rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">چشم‌انداز آینده</h2>
          <p className="text-lg text-green-100 leading-relaxed max-w-3xl mx-auto">
            ما متعهد به توسعه پایدار هستیم که میراث ما را حفظ کرده در حالی که امکانات مدرن
            و فرصت‌هایی برای ساکنانمان فراهم می‌آورد. هدف ما حفظ تعادل بین سنت و پیشرفت است.
          </p>
        </section>
      </div>
    </Layout>
  )
}

export default AboutPage
