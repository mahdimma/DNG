import React from "react";
import { Link } from "gatsby";

const PhotoSubmissionSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-2xl p-8 md:p-12 text-center mb-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-5xl mb-6">📸</div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          عکس‌های خود را با ما به اشتراک بگذارید
        </h3>
        
        <p className="text-lg md:text-xl mb-8 text-primary-100 leading-relaxed">
          عکس‌های زیبایی از روستای ما دارید؟ خوشحال می‌شویم آن‌ها را در گالری منتشر کنیم! 
          عکس‌های خود را برای بررسی ارسال کنید.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="btn-secondary transform hover:scale-105 transition-all duration-300 shadow-lg">
            ارسال عکس
          </button>
          <Link 
            to="/contact" 
            className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold 
                     border-2 border-white/30 hover:bg-white/20 hover:border-white/50 
                     transition-all duration-300 transform hover:scale-105 inline-block"
          >
            تماس با ما
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-primary-100">
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            کیفیت بالا
          </div>
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            محتوای اصیل
          </div>
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            عشق به روستا
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoSubmissionSection;
