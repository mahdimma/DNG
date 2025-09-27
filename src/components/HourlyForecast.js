import React from 'react';

const HourlyForecast = ({ hourlyData, toPersianDigits, translateCondition, getUVIndexColor, getUVIndexLabel }) => {
  if (!hourlyData?.length) return null;

  return (
    <div className="overflow-x-auto py-2">
      <div className="flex space-x-2 space-x-reverse">
        {hourlyData.map((hour, index) => {
          const time = toPersianDigits(hour.time.split(' ')[1]);
          const temp = toPersianDigits(hour.temp_c);
          const rain = toPersianDigits(hour.chance_of_rain);
          const conditionText = translateCondition(hour.condition.text);
          const uvColor = getUVIndexColor(hour.uv);
          const uv = toPersianDigits(hour.uv);

          return (
            <div key={index} className="flex-shrink-0 w-24 text-center p-2 rounded bg-gray-50 border border-gray-200">
              <p className="text-xs font-medium">{time}</p>
              <img 
                src={`https:${hour.condition.icon}`} 
                alt={conditionText} 
                className="w-10 h-10 mx-auto"
                title={conditionText}
              />
              <p className="text-lg font-bold">{temp}°</p>
              <div className="flex justify-center items-center mt-1">
                <span className="text-xxs text-gray-600">💧</span>
                <span className={`text-xxs mr-1 ${rain > 50 ? 'font-bold' : ''}`}>{rain}%</span>
              </div>
              <div className="flex justify-center items-center mt-1">
                <span className="text-xxs text-gray-600">☀️</span>
                <span className={`text-xxs mr-1 font-bold ${uvColor}`}>{uv}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;