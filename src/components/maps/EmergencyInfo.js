import React from 'react';

const EmergencyInfo = () => (
  <section className="mt-8 bg-red-50 border border-red-200 p-8 rounded-lg">
    <h3 className="text-2xl font-bold text-red-700 mb-6 text-center">مکان‌های اضطراری</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div>
        <strong className="text-red-800">ایستگاه پلیس:</strong><br />
        خیابان اصلی، نزدیک دفتر روستا<br />
        اورژانس: ۱۱۰
      </div>
      <div>
        <strong className="text-red-800">ایستگاه آتش‌نشانی:</strong><br />
        خیابان ایمنی، غرب مرکز<br />
        اورژانس: ۱۲۵
      </div>
      <div>
        <strong className="text-red-800">درمانگاه:</strong><br />
        خیابان بهداشت، موقعیت مرکزی<br />
        اورژانس: ۱۱۵
      </div>
    </div>
  </section>
);

export default EmergencyInfo;
