import React from 'react';

const to24HourFormat = (timeStr) => {
  if (!timeStr || !timeStr.includes(' ')) return timeStr;
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);

  if (modifier.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  const hoursStr = hours.toString().padStart(2, '0');
  
  return `${hoursStr}:${minutes}`;
};

const AstroDetail = ({ astro, toPersianDigits, translateMoonPhase }) => {
  if (!astro) return null;

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg animate-fade-in">
      <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">جزئیات نجومی</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
        <div className="flex flex-col items-center p-2 rounded-lg">
          <span className="text-3xl">🌅</span>
          <p className="text-sm font-semibold mt-2">طلوع خورشید</p>
          <p className="text-lg font-bold text-gray-700">{toPersianDigits(to24HourFormat(astro.sunrise))}</p>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg">
          <span className="text-3xl">🌇</span>
          <p className="text-sm font-semibold mt-2">غروب خورشید</p>
          <p className="text-lg font-bold text-gray-700">{toPersianDigits(to24HourFormat(astro.sunset))}</p>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg">
          <span className="text-3xl">🌔</span>
          <p className="text-sm font-semibold mt-2">طلوع ماه</p>
          <p className="text-lg font-bold text-gray-700">{toPersianDigits(to24HourFormat(astro.moonrise))}</p>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg">
          <span className="text-3xl">🌘</span>
          <p className="text-sm font-semibold mt-2">غروب ماه</p>
          <p className="text-lg font-bold text-gray-700">{toPersianDigits(to24HourFormat(astro.moonset))}</p>
        </div>
        <div className="flex flex-col items-center justify-center p-2 rounded-lg">
           <p className="text-3xl">🌗</p>
          <p className="text-sm font-semibold mt-1">فاز ماه</p>
          <p className="text-base font-bold text-gray-700">{translateMoonPhase(astro.moon_phase)}</p>
          <p className="text-xs text-gray-500">({toPersianDigits(astro.moon_illumination)}% روشن)</p>
        </div>
      </div>
    </div>
  );
};

export default AstroDetail;
