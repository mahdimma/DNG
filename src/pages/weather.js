import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import AirQuality from "../components/AirQuality"
import DayForecast from "../components/DayForecast"

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeDay, setActiveDay] = useState(0);


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=979ae4a2dd0e48b9a0b72713242608&q=36.5145,52.4795&days=14&aqi=yes&alerts=yes')
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
    "Patchy rain nearby": "احتمال بارش پراکنده",
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
    // Trim whitespace which might be present in API response
    const trimmedText = conditionText.trim();
    return weatherConditions[trimmedText] || trimmedText;
  }

  const toPersianDigits = (str) => {
    if (str === null || str === undefined) return '';
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

  const moonPhases = {
    "New Moon": "ماه نو",
    "Waxing Crescent": "هلال فزاینده",
    "First Quarter": "تربیع اول",
    "Waxing Gibbous": "کوژماه فزاینده",
    "Full Moon": "ماه کامل",
    "Waning Gibbous": "کوژماه کاهنده",
    "Last Quarter": "تربیع آخر",
    "Waning Crescent": "هلال کاهنده",
  };

  const translateMoonPhase = (phase) => {
    return moonPhases[phase] || phase;
  }

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
                      آب و هوای فعلی در {weatherData.location.name}
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
                      <p className="text-sm text-gray-500">تندباد</p>
                      <p className="text-xl font-semibold">{toPersianDigits(weatherData.current.gust_kph)} <span className="text-sm">کیلومتر/ساعت</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Forecast Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">پیش‌بینی {toPersianDigits(weatherData.forecast.forecastday.length)} روز آینده</h2>
              <div className="space-y-4">
                {weatherData.forecast.forecastday.map((day, index) => (
                  <DayForecast
                    key={index}
                    day={day}
                    index={index}
                    isActive={activeDay === index}
                    onToggle={() => setActiveDay(activeDay === index ? null : index)}
                    toPersianDigits={toPersianDigits}
                    getDayName={getDayName}
                    translateCondition={translateCondition}
                    getUVIndexColor={getUVIndexColor}
                    getUVIndexLabel={getUVIndexLabel}
                    translateMoonPhase={translateMoonPhase}
                  />
                ))}
              </div>
            </section>

            {/* Air Quality Section */}
            <section className="mb-12">
              <AirQuality data={weatherData.current.air_quality} toPersianDigits={toPersianDigits} />
            </section>
          </>
        )}
      </div>
    </Layout>
  )
}

export default WeatherPage
