import React from 'react';

const HourlyForecast = ({ hourlyData, toPersianDigits, translateCondition, getUVIndexColor, getUVIndexLabel }) => {
  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4 space-x-reverse">
        {hourlyData.map((hour, index) => (
          <div key={index} className="flex-shrink-0 w-40 text-center p-3 rounded-lg bg-gray-50 border border-gray-200">
            <p className="font-semibold">{toPersianDigits(hour.time.split(' ')[1])}</p>
            <img 
              src={`https:${hour.condition.icon}`} 
              alt={translateCondition(hour.condition.text)} 
              className="w-16 h-16 mx-auto"
              title={translateCondition(hour.condition.text)}
            />
            <p className="text-2xl font-bold">{toPersianDigits(hour.temp_c)}°</p>
            <p className="text-xs text-gray-500 mb-3">حس واقعی: {toPersianDigits(hour.feelslike_c)}°</p>
            
            <div className="text-xs space-y-2 text-gray-700">
              <div className="flex justify-between items-center">
                <span className="font-semibold">💧 بارش</span>
                <span className="font-bold">{toPersianDigits(hour.chance_of_rain)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">💨 باد</span>
                <span>{toPersianDigits(hour.wind_kph)} <span className="text-xxs">km/h</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">💦 رطوبت</span>
                <span className="font-bold">{toPersianDigits(hour.humidity)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">☀️ UV</span>
                <span className={`font-bold ${getUVIndexColor(hour.uv)}`}>{getUVIndexLabel(hour.uv)} ({toPersianDigits(hour.uv)})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
