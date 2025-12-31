import React from 'react';
import HourlyForecast from './HourlyForecast';
import AstroDetail from './AstroDetail';

const DayForecast = ({
  day,
  index,
  isActive,
  onToggle,
  toPersianDigits,
  getDayName,
  translateCondition,
  getUVIndexColor,
  getUVIndexLabel,
  translateMoonPhase,
}) => {
  // Calculate max UV from hourly data
  const maxHourlyUV = day.hour && day.hour.length > 0 
    ? Math.max(...day.hour.map(hour => hour.uv || 0))
    : day.day.uv;

  const detailsId = `forecast-details-${index}`;

  return (
    <div className="card p-4 rounded-lg shadow-md transition-all hover:shadow-lg">
      <button
        type="button"
        className="w-full text-right grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        onClick={onToggle}
        aria-expanded={Boolean(isActive)}
        aria-controls={detailsId}
      >
        <div className="lg:col-span-1 md:col-span-1 col-span-2">
          <p className="font-bold text-lg text-primary-600">{index === 0 ? 'امروز' : getDayName(day.date)}</p>
          <p className="text-sm text-gray-500">{new Date(day.date_epoch * 1000).toLocaleDateString('fa-IR', { month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3 lg:col-span-1 md:col-span-2 col-span-3">
          <img
            src={`https:${day.day.condition.icon}`}
            alt={translateCondition(day.day.condition.text)}
            className="w-16 h-16"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="text-lg font-semibold">{toPersianDigits(day.day.maxtemp_c)}° / {toPersianDigits(day.day.mintemp_c)}°</p>
            <p className="text-sm text-gray-600" title={translateCondition(day.day.condition.text)}>{translateCondition(day.day.condition.text)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-2 lg:col-span-3 md:col-span-3 col-span-5 text-sm">
          <div className="text-center p-2 rounded-lg bg-gray-50">
            <p className="font-semibold">باد</p>
            <p>{toPersianDigits(day.day.maxwind_kph)} <span className="text-xs">کیلومتر/ساعت</span></p>
          </div>
          <div className="text-center p-2 rounded-lg bg-gray-50">
            <p className="font-semibold">بارش</p>
            <p>{toPersianDigits(day.day.totalprecip_mm)} <span className="text-xs">میلی‌متر</span></p>
          </div>
          <div className="text-center p-2 rounded-lg bg-gray-50">
            <p className="font-semibold">احتمال بارش</p>
            <p>{toPersianDigits(day.day.daily_chance_of_rain)}%</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-gray-50">
            <p className="font-semibold">اشعه فرابنفش</p>
            <p className={`font-bold ${getUVIndexColor(maxHourlyUV)}`}>{getUVIndexLabel(maxHourlyUV)} ({toPersianDigits(maxHourlyUV)})</p>
          </div>
        </div>
      </button>
      {isActive && (
        <div id={detailsId} className="col-span-1 md:col-span-3 lg:col-span-5 mt-4 animate-fade-in">
          <AstroDetail 
            astro={day.astro}
            toPersianDigits={toPersianDigits}
            translateMoonPhase={translateMoonPhase}
          />
          <HourlyForecast
            hourlyData={day.hour}
            toPersianDigits={toPersianDigits}
            translateCondition={translateCondition}
            getUVIndexColor={getUVIndexColor}
            getUVIndexLabel={getUVIndexLabel}
          />
        </div>
      )}
    </div>
  );
};

export default DayForecast;
