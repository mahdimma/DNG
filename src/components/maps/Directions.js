import React from 'react';

// Transportation methods data for better maintainability
const transportationMethods = [
  {
    id: 'car',
    title: 'با ماشین',
    icon: '🚗',
    description: 'از آمل وارد بزرگراه آمل-بابل شوید. از خروجی درویشخیل(آمل-فریدونکنار) خارج شده و علائم را به سمت روستای چهارراه رئیس‌آباد دنبال کنید. در چهارراه به راست بپیچید و به مسیر خود ادامه دهید. با توجه به علائم وارد دومین روستا از روستاهای سمت را شوید. فاصله کل: تقریباً ۱۵.۵ کیلومتر.',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    textColor: 'text-blue-800',
    duration: '۲۰ دقیقه',
    tips: ['پارکینگ رایگان در مرکز روستا', 'مسیر آسفالته و به راحتی قابل دسترس']
  },
  {
    id: 'bus',
    title: 'با حمل و نقل عمومی',
    icon: '🚌',
    description: 'سرویس تاکسیرانی منظم از آمل(پایانه مسافربری فیروزی) به روستای دنگپیا وجود دارد.',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconBg: 'bg-green-100',
    textColor: 'text-green-800',
    duration: '۳۰ دقیقه',
    tips: ['نرخ بلیت: مجموعا ۴۵۰۰۰ تومان، تاریخ: ۱۴۰۴/۰۶/۳۰']
  },
  {
    id: 'walking',
    title: 'فاصله پیاده‌روی',
    icon: '🚶',
    description: 'مرکز روستا جمع و جور و قابل پیاده‌روی است. بیشتر مکان‌ها در فاصله ۳-۵ دقیقه پیاده‌روی از میدان مرکزی قرار دارند.',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-100',
    textColor: 'text-orange-800',
    duration: '۳-۵ دقیقه',
    tips: ['مسیرهای پیاده‌رو ایمن', 'چشم‌اندازهای زیبا در مسیر']
  }
];

// Transportation card component
const TransportationCard = ({ method }) => (
  <div className={`${method.bgColor} ${method.borderColor} border-2 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}>
    <div className={`${method.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
      <span className="text-3xl">{method.icon}</span>
    </div>
    
    <h4 className={`text-xl font-bold ${method.textColor} mb-3 text-center`}>
      {method.title}
    </h4>
    
    <div className={`${method.textColor} bg-white px-3 py-1 rounded-full text-sm font-semibold text-center mb-4 inline-block w-full`}>
      زمان: {method.duration}
    </div>
    
    <p className="text-gray-700 mb-4 leading-relaxed text-center">
      {method.description}
    </p>
    
    <div className="space-y-2">
      {method.tips.map((tip, index) => (
        <div key={index} className={`${method.bgColor} border ${method.borderColor} rounded-lg p-2 text-sm`}>
          <span className="text-xs">💡</span> {tip}
        </div>
      ))}
    </div>
  </div>
);

const Directions = () => {
  return (
    <section className="mt-12 bg-gray-50 border-2 border-gray-200 p-8 rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🗺️</div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">چگونه به روستای دنگپیا برسیم</h3>
        <p className="text-gray-600">راهنمای کامل دسترسی به روستای زیبای دنگپیا</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {transportationMethods.map((method) => (
          <TransportationCard key={method.id} method={method} />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-4">
          <p className="text-blue-800 font-semibold">
            🧭 برای اطلاعات بیشتر درباره مسیرها، با دفتر اطلاعات روستا تماس بگیرید
          </p>
        </div>
      </div>
    </section>
  );
};

export default Directions;
