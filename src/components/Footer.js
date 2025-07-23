import React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary-400">روستای دانگپیا</h3>
          <p className="text-gray-300 leading-relaxed">
            به روستای زیبای ما خوش آمدید. با آخرین اخبار، رویدادها و خدمات در ارتباط باشید.
          </p>
          <div className="flex space-x-reverse space-x-4">
            {/* Social Media Icons */}
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-primary-400">پیوندهای سریع</h4>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/about" 
                className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-reverse space-x-2"
              >
                <span>درباره ما</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </li>
            <li>
              <Link 
                to="/news" 
                className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-reverse space-x-2"
              >
                <span>اخبار</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-reverse space-x-2"
              >
                <span>خدمات</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-reverse space-x-2"
              >
                <span>تماس با ما</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-primary-400">قوانین و مقررات</h4>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/privacy-policy" 
                className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-reverse space-x-2"
              >
                <span>حریم خصوصی</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </li>
            <li>
              <Link 
                to="/terms-of-service" 
                className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-reverse space-x-2"
              >
                <span>شرایط خدمات</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </li>
          </ul>
          
          {/* Contact Info */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h5 className="font-semibold text-primary-400 mb-2">تماس سریع</h5>
            <p className="text-sm text-gray-300">📧 info@dangepia.ir</p>
            <p className="text-sm text-gray-300">📞 ۰۹۸-XXX-XXXX</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} روستای دانگپیا. تمامی حقوق محفوظ است.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          طراحی شده با ❤️ برای جامعه دانگپیا
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
