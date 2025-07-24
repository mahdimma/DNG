import React from 'react';

const Directions = () => (
  <section className="mt-12 bg-gray-50 p-8 rounded-lg">
    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">چگونه به روستای دانگپیا برسیم</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-2">🚗 با ماشین</h4>
        <p className="text-gray-600">
          از [نزدیکترین شهر] وارد بزرگراه [X] شوید. از خروجی [نام خروجی] خارج شده و علائم را به سمت روستای دانگپیا دنبال کنید. فاصله کل: تقریباً [X] کیلومتر.
        </p>
      </div>
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-2">🚌 با حمل و نقل عمومی</h4>
        <p className="text-gray-600">
          سرویس اتوبوس منظم از [نزدیکترین شهر] به روستای دانگپیا.
          اتوبوس‌ها هر [X] ساعت حرکت می‌کنند. زمان سفر: تقریباً [X] دقیقه.
        </p>
      </div>
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-2">🚶 فاصله پیاده‌روی</h4>
        <p className="text-gray-600">
          مرکز روستا جمع و جور و قابل پیاده‌روی است. بیشتر مکان‌ها در فاصله ۵-۱۰ دقیقه پیاده‌روی از میدان مرکزی قرار دارند.
        </p>
      </div>
    </div>
  </section>
);

export default Directions;
