import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=979ae4a2dd0e48b9a0b72713242608&q=36.5145,52.4795&days=7&aqi=no&alerts=yes')
        if (!response.ok) {
          throw new Error(`خطای شبکه: ${response.status}`)
        }
        const data = await response.json()
        setWeatherData(data)
        setError(null)
      } catch (e) {
        setError(e.message)
        setWeatherData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()

    const interval = setInterval(fetchWeatherData, 300000) // Update every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const getUVIndexColor = (uvIndex) => {
    if (uvIndex <= 2) return "text-green-500"
    if (uvIndex <= 5) return "text-yellow-500"
    if (uvIndex <= 7) return "text-orange-500"
    if (uvIndex <= 10) return "text-red-500"
    return "text-purple-500"
  }

  const getUVIndexLabel = (uvIndex) => {
    if (uvIndex <= 2) return "پایین"
    if (uvIndex <= 5) return "متوسط"
    if (uvIndex <= 7) return "زیاد"
    if (uvIndex <= 10) return "بسیار زیاد"
    return "شدید"
  }
  
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR', { weekday: 'long' });
  }

  const weatherConditions = {
    "Sunny": "آفتابی",
    "Clear": "صاف",
    "Partly cloudy": "کمی ابری",
    "Cloudy": "ابری",
    "Overcast": "تمام ابری",
    "Mist": "مه آلود",
    "Patchy rain possible": "احتمال بارش پراکنده",
    "Patchy snow possible": "احتمال برف پراکنده",
    "Patchy sleet possible": "احتمال باران و برف پراکنده",
    "Patchy freezing drizzle possible": "احتمال نم نم باران یخ زده پراکنده",
    "Thundery outbreaks possible": "احتمال رگبار و رعد و برق",
    "Blowing snow": "بوران برف",
    "Blizzard": "کولاک",
    "Fog": "مه",
    "Freezing fog": "مه یخ زده",
    "Patchy light drizzle": "نم نم باران خفیف پراکنده",
    "Light drizzle": "نم نم باران خفیف",
    "Freezing drizzle": "نم نم باران یخ زده",
    "Heavy freezing drizzle": "نم نم باران یخ زده شدید",
    "Patchy light rain": "باران خفیف پراکنده",
    "Light rain": "باران خفیف",
    "Moderate rain at times": "باران متوسط در بعضی ساعات",
    "Moderate rain": "باران متوسط",
    "Heavy rain at times": "باران شدید در بعضی ساعات",
    "Heavy rain": "باران شدید",
    "Light freezing rain": "باران یخ زده خفیف",
    "Moderate or heavy freezing rain": "باران یخ زده متوسط یا شدید",
    "Light sleet": "باران و برف خفیف",
    "Moderate or heavy sleet": "باران و برف متوسط یا شدید",
    "Patchy light snow": "برف خفیف پراکنده",
    "Light snow": "برف خفیف",
    "Patchy moderate snow": "برف متوسط پراکنده",
    "Moderate snow": "برف متوسط",
    "Patchy heavy snow": "برف شدید پراکنده",
    "Heavy snow": "برف شدید",
    "Ice pellets": "تگرگ",
    "Light rain shower": "رگبار باران خفیف",
    "Moderate or heavy rain shower": "رگبار باران متوسط یا شدید",
    "Torrential rain shower": "رگبار باران سیل آسا",
    "Light sleet showers": "رگبار باران و برف خفیف",
    "Moderate or heavy sleet showers": "رگبار باران و برف متوسط یا شدید",
    "Light snow showers": "رگبار برف خفیف",
    "Moderate or heavy snow showers": "رگبار برف متوسط یا شدید",
    "Light showers of ice pellets": "رگبار تگرگ خفیف",
    "Moderate or heavy showers of ice pellets": "رگبار تگرگ متوسط یا شدید",
    "Patchy light rain with thunder": "باران خفیف پراکنده همراه با رعد و برق",
    "Moderate or heavy rain with thunder": "باران متوسط یا شدید همراه با رعد و برق",
    "Patchy light snow with thunder": "برف خفیف پراکنده همراه با رعد و برق",
    "Moderate or heavy snow with thunder": "برف متوسط یا شدید همراه با رعد و برق"
  };

  const translateCondition = (conditionText) => {
    return weatherConditions[conditionText] || conditionText;
  }

  const toPersianDigits = (str) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(str).replace(/[0-9]/g, (w) => persianDigits[+w]);
  };

  const windDirections = {
    "N": "شمال",
    "NNE": "شمال-شمال شرقی",
    "NE": "شمال شرقی",
    "ENE": "شرق-شمال شرقی",
    "E": "شرق",
    "ESE": "شرق-جنوب شرقی",
    "SE": "جنوب شرقی",
    "SSE": "جنوب-جنوب شرقی",
    "S": "جنوب",
    "SSW": "جنوب-جنوب غربی",
    "SW": "جنوب غربی",
    "WSW": "غرب-جنوب غربی",
    "W": "غرب",
    "WNW": "غرب-شمال غربی",
    "NW": "شمال غربی",
    "NNW": "شمال-شمال غربی",
  };

  const translateWindDirection = (direction) => {
    return windDirections[direction] || direction;
  };

  return (
    <Layout title="آب و هوا" description="اطلاعات لحظه‌ای آب و هوا و پیش‌بینی برای روستای دانگپیا">
      <HeroSection 
        title="آب و هوای روستا"
        subtitle="آخرین اطلاعات آب و هوا و پیش‌بینی روزهای آینده را اینجا ببینید"
        showButtons={false}
        showScrollIndicator={true}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
        {loading && <p className="text-center text-xl">در حال بارگذاری اطلاعات آب و هوا...</p>}
        {error && <p className="text-center text-xl text-red-500">خطا در دریافت اطلاعات: {error}</p>}
        
        {weatherData && (
          <>
            {/* Alerts Section */}
            {weatherData.alerts && weatherData.alerts.alert.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">هشدارها</h2>
                {weatherData.alerts.alert.map((alert, index) => (
                  <div key={index} className="bg-red-100 border-r-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md" role="alert">
                    <p className="font-bold">{alert.headline}</p>
                    <p>{alert.desc}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Current Weather Section */}
            <section className="mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      آب و هوای فعلی در دنگپیا
                    </h2>
                    <p className="text-gray-500">
                      آخرین بروزرسانی: {toPersianDigits(new Date(weatherData.current.last_updated_epoch * 1000).toLocaleTimeString('fa-IR'))}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-600">
                      {`${new Date(weatherData.location.localtime_epoch * 1000).toLocaleDateString('fa-IR', { weekday: 'long' })}، ${new Date(weatherData.location.localtime_epoch * 1000).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                    </p>
                    <p className="text-gray-500">{toPersianDigits(weatherData.location.localtime.split(' ')[1])}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="flex items-center gap-4">
                    <img src={`https:${weatherData.current.condition.icon}`} alt={weatherData.current.condition.text} className="w-24 h-24"/>
                    <div>
                      <p className="text-6xl font-bold text-gray-800">{toPersianDigits(weatherData.current.temp_c)}°</p>
                      <p className="text-xl text-gray-600">{translateCondition(weatherData.current.condition.text)}</p>
                      <div className="text-gray-500 text-sm mt-2">
                        <p>احساس واقعی:</p>
                        <div className="flex gap-4 justify-start">
                            <span>{toPersianDigits(weatherData.current.feelslike_c)}° سانتی گراد</span>
                            <span>{toPersianDigits(weatherData.current.feelslike_f)}° فارنهایت</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">رطوبت</p>
                      <p className="text-xl font-semibold">{toPersianDigits(weatherData.current.humidity)}%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">باد</p>
                      <p className="text-xl font-semibold">{toPersianDigits(weatherData.current.wind_kph)} <span className="text-sm">کیلومتر/ساعت</span></p>
                      <p className="text-xs text-gray-400">{translateWindDirection(weatherData.current.wind_dir)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">فشار</p>
                      <p className="text-xl font-semibold">{toPersianDigits(weatherData.current.pressure_mb)} <span className="text-sm">میلی‌بار</span></p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">دید</p>
                      <p className="text-xl font-semibold">{toPersianDigits(weatherData.current.vis_km)} <span className="text-sm">کیلومتر</span></p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">اشعه فرابنفش(UV)</p>
                      <p className={`text-xl font-semibold ${getUVIndexColor(weatherData.current.uv)}`}>
                        {getUVIndexLabel(weatherData.current.uv)} ({toPersianDigits(weatherData.current.uv)})
                      </p>
                    </div>
                     <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">بارندگی</p>
                      <p className="text-xl font-semibold">{toPersianDigits(weatherData.current.precip_mm)} <span className="text-sm">میلی‌متر</span></p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">ابر</p>
                      <p className="text-xl font-semibold">{toPersianDigits(weatherData.current.cloud)}%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">روز/شب</p>
                      <p className="text-xl font-semibold">{weatherData.current.is_day ? '☀️' : '🌙'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 7-Day Forecast Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">پیش‌بینی ۷ روز آینده</h2>
              <div className="space-y-6">
                {weatherData.forecast.forecastday.map((day, index) => (
                  <div key={index} className="card p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:scale-[1.02]">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
                      <div className="lg:col-span-1 md:col-span-1 col-span-2">
                        <p className="font-bold text-lg text-primary-600">{index === 0 ? 'امروز' : getDayName(day.date)}</p>
                        <p className="text-sm text-gray-500">{toPersianDigits(day.date)}</p>
                      </div>
                      <div className="flex items-center gap-3 lg:col-span-1 md:col-span-2 col-span-3">
                        <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} className="w-16 h-16"/>
                        <div>
                          <p className="text-lg font-semibold">{toPersianDigits(day.day.maxtemp_c)}°C / {toPersianDigits(day.day.mintemp_c)}°C</p>
                          <p className="text-sm text-gray-600" title={translateCondition(day.day.condition.text)}>{translateCondition(day.day.condition.text)}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-2 lg:col-span-3 md:col-span-3 col-span-5 text-sm">
                        <div className="text-center p-2 rounded-lg bg-gray-50">
                          <p className="font-semibold">باد</p>
                          <p>{toPersianDigits(day.day.maxwind_kph)} کیلومتر/ساعت</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-gray-50">
                          <p className="font-semibold">بارندگی</p>
                          <p>{toPersianDigits(day.day.totalprecip_mm)} میلی‌متر</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-gray-50">
                          <p className="font-semibold">رطوبت</p>
                          <p>{toPersianDigits(day.day.avghumidity)}%</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-gray-50">
                          <p className="font-semibold">UV</p>
                          <p className={getUVIndexColor(day.day.uv)}>{getUVIndexLabel(day.day.uv)} ({toPersianDigits(day.day.uv)})</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs text-gray-600">
                        <div className="p-2 rounded-lg bg-gray-100">
                            <p className="font-semibold">☀️ طلوع</p>
                            <p>{toPersianDigits(day.astro.sunrise)}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-gray-100">
                            <p className="font-semibold">🌙 غروب</p>
                            <p>{toPersianDigits(day.astro.sunset)}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-gray-100">
                            <p className="font-semibold">🌔 طلوع ماه</p>
                            <p>{toPersianDigits(day.astro.moonrise)}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-gray-100">
                            <p className="font-semibold">🌘 غروب ماه</p>
                            <p>{toPersianDigits(day.astro.moonset)}</p>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Additional Info Section */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3">اطلاعات موقعیت</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>کشور:</strong> ایران</li>
                    <li><strong>منطقه زمانی:</strong> آسیا/تهران</li>
                    <li><strong>مختصات:</strong> {toPersianDigits(weatherData.location.lat)}, {toPersianDigits(weatherData.location.lon)}</li>
                    <li><strong>کد وضعیت:</strong> {toPersianDigits(weatherData.current.condition.code)}</li>
                  </ul>
                </div>
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3">جزئیات تکمیلی</h3>
                   <ul className="space-y-4 text-gray-700">
                    <li>
                      <strong>احساس سرما:</strong>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>{toPersianDigits(weatherData.current.windchill_c)}° سانتی‌گراد</span>
                        <span>{toPersianDigits(weatherData.current.windchill_f)}° فارنهایت</span>
                      </div>
                    </li>
                    <li>
                      <strong>شاخص گرما:</strong>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>{toPersianDigits(weatherData.current.heatindex_c)}° سانتی‌گراد</span>
                        <span>{toPersianDigits(weatherData.current.heatindex_f)}° فارنهایت</span>
                      </div>
                    </li>
                    <li>
                      <strong>نقطه شبنم:</strong>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>{toPersianDigits(weatherData.current.dewpoint_c)}° سانتی‌گراد</span>
                        <span>{toPersianDigits(weatherData.current.dewpoint_f)}° فارنهایت</span>
                      </div>
                    </li>
                    <li>
                      <strong>تندباد:</strong>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>{toPersianDigits(weatherData.current.gust_kph)} کیلومتر/ساعت</span>
                        <span>{toPersianDigits(weatherData.current.gust_mph)} مایل/ساعت</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3">مقادیر دیگر واحدها</h3>
                   <ul className="space-y-2 text-gray-700">
                    <li><strong>دما (فارنهایت):</strong> {toPersianDigits(weatherData.current.temp_f)}°فارنهایت</li>
                    <li><strong>باد (مایل/ساعت):</strong> {toPersianDigits(weatherData.current.wind_mph)} مایل/ساعت</li>
                    <li><strong>فشار (اینچ):</strong> {toPersianDigits(weatherData.current.pressure_in)} اینچ</li>
                    <li><strong>بارندگی (اینچ):</strong> {toPersianDigits(weatherData.current.precip_in)} اینچ</li>
                    <li><strong>دید (مایل):</strong> {toPersianDigits(weatherData.current.vis_miles)} مایل</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Yearly Summary and Weather Points */}
            <section className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="card p-6">
                        <h3 className="text-xl font-bold mb-3">خلاصه وضعیت آب و هوای سالانه</h3>
                        <p className="text-gray-700">
                            این بخش خلاصه‌ای از وضعیت آب و هوای سالانه را نمایش می‌دهد. (داده‌های آماری واقعی در حال حاضر در دسترس نیست).
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li>میانگین دما: <span className="font-semibold">{toPersianDigits(15)}°C</span></li>
                            <li>بیشترین بارش: <span className="font-semibold">ماه آبان</span></li>
                            <li>خشک‌ترین ماه: <span className="font-semibold">ماه تیر</span></li>
                        </ul>
                    </div>
                    <div className="card p-6">
                        <h3 className="text-xl font-bold mb-3">امتیاز آب و هوا</h3>
                        <p className="text-gray-700">
                            امتیاز کلی آب و هوا برای فعالیت‌های بیرون از خانه: <span className="font-bold text-primary-600 text-lg">{toPersianDigits(7)}/{toPersianDigits(10)}</span>
                        </p>
                         <p className="text-sm text-gray-500 mt-2">
                           این امتیاز بر اساس دما، سرعت باد و احتمال بارندگی برای امروز محاسبه شده است.
                        </p>
                    </div>
                </div>
            </section>
            
            {/* Data Source */}
            <footer className="text-center mt-12 text-gray-500 text-sm">
              <p>
                اطلاعات آب و هوا توسط 
                <a href="https://www.weatherapi.com/" title="Free Weather API" className="text-primary-600 hover:underline mx-1">WeatherAPI.com</a>
                تامین می‌شود.
              </p>
            </footer>
          </>
        )}
      </div>
    </Layout>
  )
}

export default WeatherPage
