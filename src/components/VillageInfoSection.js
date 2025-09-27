import React from "react";

const VillageInfoSection = () => {
  return (
    <section className="mb-16">
      {/* Economy Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full ml-3"></div>
          اقتصاد
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Agriculture */}
          <div className="card">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">کشاورزی</h3>
            <p className="text-gray-600 text-sm">
              شغل اصلی اهالی این روستا کشاورزی است و اکثراً در زمین‌های خود به کاشت برنج میپردازند. برنج‌های محبوب این روستا گونه‌های طارم و هاشمی است هرچند چند سالیست بعضی از کشاورزان به کاشت انواع دیگر برنج نیز روی آورده‌اند.
            </p>
          </div>
          
          {/* Animal Husbandry */}
          <div className="card">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">دامداری</h3>
            <p className="text-gray-600 text-sm">
              اکثر روستاییان حیواناتی همچون مرغ، اردک و... در خانه خود دارند ولی کسانی که شغل اصلیشان دامداری باشد اندک هستند.
            </p>
          </div>
          
          {/* Horticulture */}
          <div className="card">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">باغداری</h3>
            <p className="text-gray-600 text-sm">
              برخی از اهالی باغ‌هایی اغلب با درخت‌های مرکبات دارند، شامل:
              <ul className="list-disc pr-5 mt-2">
                <li>پرتقال(اغلب از گونه‌های تامپسون، خونی)</li>
                <li>نارنج</li>
                <li>نارنگی(اغلب از گونه یافا)</li>
              </ul>
            </p>
          </div>
          
          {/* Other Jobs */}
          <div className="card">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">سایر مشاغل</h3>
            <p className="text-gray-600 text-sm">
              از مشاغل فرعی روستا که در کنار شغل اصلی و به صورت پاره وقت صورت می‌گیرد:
              <ul className="list-disc pr-5 mt-2">
                <li>کاشت سبزه عید در ماه‌های آخر سال</li>
                <li>زراعت و کاشت انواع سبزیجات مانند پیاز، سیر، نعنا آبی(به مازنی:اوجی)</li>
                <li>بافتن قالی که چندین دهه است کنار گذاشته شده‌است</li>
              </ul>
            </p>
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full ml-3"></div>
          امکانات
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Education */}
          <div className="card">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">تحصیل</h3>
            <p className="text-gray-600 text-sm">
              دنگپیا دارای پیش دبستانی و مدرسه ابتدایی است. در سال‌های اخیر به دلیل مهاجرت و شهرنشینی دبستان با کمبود دانش آموز مواجه شده‌است و احتمال دارد در چند سال آینده مدرسه بسته شود.
            </p>
          </div>
          
          {/* Healthcare */}
          <div className="card">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h8a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">درمان</h3>
            <p className="text-gray-600 text-sm">
              در دنگپیا خانه بهداشتی تحت نظارت مرکز بهداشت آمل وجود دارد که دارای دو بهورز است. هفته ای یکبار دکتری عمومی که هر چند ماه عوض می‌شود برای چند ساعت در روزی معین حضور می‌یابد.
            </p>
          </div>
          
          {/* Employment */}
          <div className="card">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0122 12c0-1.357-.106-2.68-.312-3.98a4.002 4.002 0 00-7.191 2.191L12 11.185 9.777 12.092c-.39.154-.9.046-1.268-.357l-.228-.252-.801-.865c-.534-.582-.518-1.376.036-1.907a3.985 3.985 0 00.443-.438l.97-.983c.322-.322.603-.703.84-.94l.777-.789c.18-.184.439-.328.697-.443l.634-.29a3.993 3.993 0 00.818-.463c.343-.271.627-.61.84-.996l.51-.939c.287-.524.744-.832 1.275-.832.5 0 .962.29 1.275.763l.169.254c.192.29.42.558.675.791l.827.792c.544.516 1.25.792 1.992.792.74 0 1.446-.276 1.99-.792l.827-.792c.255-.233.483-.501.675-.791l.169-.254c.313-.473.775-.763 1.275-.763.531 0 .988.308 1.275.832l.51.939c.213.386.497.725.84.996a3.993 3.993 0 00.818.463l.634.29c.258.115.517.259.697.443l.777.789c.237.237.518.618.84.94l.97.983c.155.157.29.328.41.505a3.997 3.997 0 00.333.503" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">شغل</h3>
            <p className="text-gray-600 text-sm">
              دنگپیا دارای فرصت‌های شغلی دائمی و فصلی است. از فرصت‌های شغلی فصلی می‌توان نیاز به کارگر در هنگام نشا و برداشت(امروزه ماشینی شده‌است) اشاره کرد. از فرصت‌های دائمی می‌توان به زارع(کسی که با سهمی در برداشت زمین دیگران را کشت می‌کند) دیگران شدن اشاره کرد.
            </p>
          </div>
        </div>
      </div>

      {/* Tourist Attractions Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full ml-3"></div>
          جاذبه‌های گردشگری
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Historical Bathhouse */}
          <div className="card">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">حمام تاریخی</h3>
            <p className="text-gray-600 text-sm">
              حمام تاریخی روستای دنگپیا که قدمت آن به دوره قاجاریه برمی‌گردد یکی از زیبایی‌های این روستا به‌شمار می‌رود. چندین سال است که نظراتی مبنی تغییر کاربری آن به موزه یا یک مکان آبی مدرن با طرح قدیمی بیان شده‌است ولی اقدامی صورت نگرفته‌است. متأسفانه این حمام تاریخی در حال حاضر بدون بهره‌برداری است.
            </p>
          </div>
          
          {/* Azar Dar Tree */}
          <div className="card">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">ازار دار</h3>
            <p className="text-gray-600 text-sm">
              یکی از دیگر جاذبه‌های گردشگری این روستا درختی با قدمت بیش از هزار سال بود که در زبان محلی ازار دار نامیده می‌شد. متأسفانه این درخت در طوفان سال 95 صدمه دید و قطع شد.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillageInfoSection;