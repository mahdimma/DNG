import React from "react"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const FinancialTransparencyPage = () => {
  // Mock financial data - replace with actual data
  const financialStatements = [
    {
      id: 1,
      year: "1403",
      type: "گزارش مالی سالانه",
      amount: "۲,۵۰۰,۰۰۰,۰۰۰ ریال",
      date: "۱۴۰۳/۰۶/۱۵",
      status: "در حال بررسی",
      documentUrl: "#"
    },
    {
      id: 2,
      year: "1402",
      type: "گزارش مالی سالانه",
      amount: "۲,۲۰۰,۰۰۰,۰۰۰ ریال",
      date: "۱۴۰۲/۰۶/۱۵",
      status: "تایید شده",
      documentUrl: "#"
    },
    {
      id: 3,
      year: "1402",
      type: "گزارش درآمدهای ماهانه",
      amount: "۱۸۰,۰۰۰,۰۰۰ ریال",
      date: "۱۴۰۲/۰۵/۳۰",
      status: "تایید شده",
      documentUrl: "#"
    },
    {
      id: 4,
      year: "1402",
      type: "گزارش هزینه‌های ساخت و ساز",
      amount: "۴۵۰,۰۰۰,۰۰۰ ریال",
      date: "۱۴۰۲/۰۴/۲۰",
      status: "نیاز به اصلاح",
      documentUrl: "#"
    },
    {
      id: 5,
      year: "1401",
      type: "گزارش مالی سالانه",
      amount: "۱,۹۵۰,۰۰۰,۰۰۰ ریال",
      date: "۱۴۰۱/۰۶/۱۵",
      status: "تایید شده",
      documentUrl: "#"
    },
    {
      id: 6,
      year: "1401",
      type: "گزارش درآمدهای مالیاتی",
      amount: "۱۲۰,۰۰۰,۰۰۰ ریال",
      date: "۱۴۰۱/۰۳/۲۰",
      status: "تایید شده",
      documentUrl: "#"
    }
  ]

  const getBadgeColor = (status) => {
    switch(status) {
      case "تایید شده":
        return "bg-green-100 text-green-800"
      case "در حال بررسی":
        return "bg-yellow-100 text-yellow-800"
      case "نیاز به اصلاح":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout 
      title="شفافیت مالی" 
      description="گزارش‌های مالی شفاف و به‌روز روستای دنگپیا برای افزایش اعتماد و مسئولیت‌پذیری"
    >
      {/* Hero Section */}
      <HeroSection 
        title="شفافیت مالی"
        subtitle="همه گزارش‌های مالی روستای دنگپیا به صورت کامل و شفاف در اختیار شهروندان قرار داده شده است"
        showButtons={false}
        showScrollIndicator={true}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-3 h-3 bg-primary-500 rounded-full ml-3"></div>
                اهمیت شفافیت مالی
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                شفافیت مالی یکی از ارکان اصلی مدیریت خوب در روستای دنگپیا است. ما معتقدیم که شهروندان 
                حق دارند بدانند چگونه از منابع مالی جامعه استفاده می‌شود. این صفحه شامل تمام گزارش‌های 
                مالی منتشر شده است که به صورت منظم به‌روزرسانی می‌شوند.
              </p>
            </div>
            <div className="card">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">اعتماد و مسئولیت</h3>
              <p className="text-gray-600">
                با ارائه گزارش‌های مالی شفاف، ما به ایجاد اعتماد بین اداره روستا و شهروندان کمک می‌کنیم.
              </p>
            </div>
          </div>
        </section>

        {/* Financial Statements Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <div className="w-3 h-3 bg-secondary-500 rounded-full ml-3"></div>
              گزارش‌های مالی
            </h2>
            <div className="text-sm text-gray-500">
              تعداد کل: {financialStatements.length} گزارش
            </div>
          </div>

          {/* Financial Statements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financialStatements.map((statement) => (
              <div key={statement.id} className="card border border-gray-200 hover:border-primary-300 transition-colors duration-200">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(statement.status)}`}>
                      {statement.status}
                    </span>
                    <span className="text-sm text-gray-500">{statement.year}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{statement.type}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">مبلغ:</span>
                      <span className="text-sm font-medium text-gray-900">{statement.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">تاریخ:</span>
                      <span className="text-sm font-medium text-gray-900">{statement.date}</span>
                    </div>
                  </div>
                  
                  <a 
                    href={statement.documentUrl} 
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    مشاهده گزارش
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Summary Section */}
        <section className="mb-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center justify-center">
              <div className="w-3 h-3 bg-primary-500 rounded-full ml-3"></div>
              خلاصه مالی
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="card">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">کل درآمدها</h3>
                <p className="text-2xl font-bold text-green-600">۶.۸ میلیارد ریال</p>
                <p className="text-sm text-gray-600 mt-2">۱۴۰۱ - ۱۴۰۳</p>
              </div>
              
              <div className="card">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">کل هزینه‌ها</h3>
                <p className="text-2xl font-bold text-red-600">۶.۲ میلیارد ریال</p>
                <p className="text-sm text-gray-600 mt-2">۱۴۰۱ - ۱۴۰۳</p>
              </div>
              
              <div className="card">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">موجودی خالص</h3>
                <p className="text-2xl font-bold text-blue-600">۶۰۰ میلیون ریال</p>
                <p className="text-sm text-gray-600 mt-2">موجودی فعلی</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed text-justify">
              این خلاصه نشان‌دهنده وضعیت مالی کلی روستای دنگپیا در سه سال گذشته است. 
              ما متعهد به مدیریت مسئولانه منابع مالی جامعه هستیم و تمام درآمدها و هزینه‌ها 
              به صورت شفاف در گزارش‌های جداگانه ثبت و منتشر می‌شوند.
            </p>
          </div>
        </section>

        {/* Audit and Oversight Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full ml-3"></div>
              بازرسی و نظارت
            </h2>
            <div className="card h-full">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 leading-relaxed text-justify">
                تمام گزارش‌های مالی توسط کمیته بازرسی مستقل بررسی و تایید می‌شوند. 
                این کمیته شامل نمایندگانی از جامعه است که به صورت دوره‌ای گزارش‌های مالی 
                را مورد ارزیابی قرار می‌دهند تا از دقت و صحت آنها اطمینان حاصل کنند.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full ml-3"></div>
              دسترسی به اطلاعات
            </h2>
            <div className="card h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p className="text-gray-600 leading-relaxed text-justify">
                تمام گزارش‌های مالی در این صفحه به صورت عمومی قرار داده شده‌اند و 
                هر شهروندی می‌تواند به راحتی به آنها دسترسی داشته باشد. در صورت نیاز به 
                اطلاعات بیشتر، می‌توانید با اداره روستا تماس بگیرید تا راهنمایی‌های لازم 
                ارائه شود.
              </p>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <section className="mt-16 gradient-bg rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">نیاز به اطلاعات بیشتر دارید؟</h2>
          <p className="text-lg text-green-100 leading-relaxed max-w-3xl mx-auto mb-6">
            اگر سوالی در مورد گزارش‌های مالی یا نحوه استفاده از منابع مالی روستا دارید، 
            از طریق روش‌های ارتباطی زیر با ما تماس بگیرید.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
              تماس با اداره
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:bg-opacity-10">
              ارسال ایمیل
            </button>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default FinancialTransparencyPage