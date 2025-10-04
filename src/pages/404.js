import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const NotFoundPage = () => (
  <Layout title="Page Not Found" description="صفحه مورد نظر یافت نشد">
    <HeroSection 
      title="404"
      subtitle="صفحه مورد نظر یافت نشد"
      showButtons={false}
      showScrollIndicator={true}
    />
    
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="text-8xl mb-4">🏘️</div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          متأسفانه، صفحه‌ای که به دنبال آن بودید پیدا نشد. ممکن است صفحه جابجا شده، حذف شده یا URL نادرست باشد.
        </p>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">لینک‌های مفید:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              to="/"
              className="card flex items-center justify-center hover:bg-primary-50 transition-colors"
            >
              <span className="mr-2">🏠</span> صفحه اصلی
            </Link>
            <Link 
              to="/news"
              className="card flex items-center justify-center hover:bg-primary-50 transition-colors"
            >
              <span className="mr-2">📰</span> اخبار و رویدادها
            </Link>
            <Link 
              to="/services"
              className="card flex items-center justify-center hover:bg-primary-50 transition-colors"
            >
              <span className="mr-2">🏛️</span> خدمات
            </Link>
            <Link 
              to="/contact"
              className="card flex items-center justify-center hover:bg-primary-50 transition-colors"
            >
              <span className="mr-2">📞</span> تماس با ما
            </Link>
          </div>
        </div>

        <Link 
          to="/"
          className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors"
        >
          ← بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage