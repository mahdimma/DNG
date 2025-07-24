import React, { useState } from 'react';

const AirQuality = ({ data, toPersianDigits }) => {
  const [showAqiHelp, setShowAqiHelp] = useState(false);
  const [showPollutantHelp, setShowPollutantHelp] = useState(false);

  if (!data) return null;

  const getEPAIndexDescription = (index) => {
    switch (index) {
      case 1: return { text: 'خوب', color: 'text-green-600', bgColor: 'bg-green-100' };
      case 2: return { text: 'متوسط', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      case 3: return { text: 'ناسالم برای گروه‌های حساس', color: 'text-orange-600', bgColor: 'bg-orange-100' };
      case 4: return { text: 'ناسالم', color: 'text-red-600', bgColor: 'bg-red-100' };
      case 5: return { text: 'بسیار ناسالم', color: 'text-purple-600', bgColor: 'bg-purple-100' };
      case 6: return { text: 'خطرناک', color: 'text-maroon-600', bgColor: 'bg-maroon-100' };
      default: return { text: 'نامشخص', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  const getDefraIndexDescription = (index) => {
    if (index <= 3) return { text: 'پایین', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (index <= 6) return { text: 'متوسط', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (index <= 9) return { text: 'بالا', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    if (index === 10) return { text: 'بسیار بالا', color: 'text-red-600', bgColor: 'bg-red-100' };
    return { text: 'نامشخص', color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };

  const getPollutantStyle = (name, apiData) => {
    // Source: U.S. EPA AQI Technical Assistance Document.
    // Thresholds are defined in their native units (ppb, ppm) as per the EPA standard.
    // The function converts the API's µg/m³ value to the correct unit for comparison.
    const thresholds = {
      co_ppm: [4.4, 9.4, 12.4, 15.4, 30.4],      // 8-hour CO in ppm
      o3_ppb: [54, 70, 85, 105, 200],           // 8-hour O3 in ppb
      no2_ppb: [53, 100, 360, 649, 1249],       // 1-hour NO2 in ppb
      so2_ppb: [35, 75, 185, 304, 604],         // 1-hour SO2 in ppb
      pm2_5: [12.0, 35.4, 55.4, 150.4, 250.4],  // 24-hour PM2.5 in µg/m³
      pm10: [54, 154, 254, 354, 424],           // 24-hour PM10 in µg/m³
    };

    const colors = ['bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-orange-100 text-orange-800', 'bg-red-100 text-red-800', 'bg-purple-100 text-purple-800', 'bg-maroon-100 text-maroon-800'];
    
    let t;
    let value;

    // Select the appropriate threshold and convert API value for comparison
    switch(name) {
        case 'co':
            // Convert µg/m³ from API to ppm for comparison. Factor: ppm = µg/m³ / 1145
            value = apiData.co / 1145;
            t = thresholds.co_ppm;
            break;
        case 'o3':
            // Convert µg/m³ from API to ppb for comparison. Factor: ppb = µg/m³ / 1.96
            value = apiData.o3 / 1.96;
            t = thresholds.o3_ppb;
            break;
        case 'no2':
             // Convert µg/m³ from API to ppb for comparison. Factor: ppb = µg/m³ / 1.88
            value = apiData.no2 / 1.88;
            t = thresholds.no2_ppb;
            break;
        case 'so2':
            // Convert µg/m³ from API to ppb for comparison. Factor: ppb = µg/m³ / 2.62
            value = apiData.so2 / 2.62;
            t = thresholds.so2_ppb;
            break;
        case 'pm2_5':
            // No conversion needed, units match
            value = apiData.pm2_5;
            t = thresholds.pm2_5;
            break;
        case 'pm10':
            // No conversion needed, units match
            value = apiData.pm10;
            t = thresholds.pm10;
            break;
        default:
            return 'bg-gray-100';
    }

    if (!t) return 'bg-gray-100';

    if (value <= t[0]) return colors[0];
    if (value <= t[1]) return colors[1];
    if (value <= t[2]) return colors[2];
    if (value <= t[3]) return colors[3];
    if (value <= t[4]) return colors[4];
    return colors[5];
  };

  const epaIndexInfo = getEPAIndexDescription(data['us-epa-index']);
  const defraIndexInfo = getDefraIndexDescription(data['gb-defra-index']);

  const aqiHelpContent = [
    {
      level: 'خوب',
      color: 'bg-green-400',
      description: 'کیفیت هوا رضایت‌بخش است و آلودگی هوا خطر کمی دارد یا هیچ خطری ندارد.'
    },
    {
      level: 'متوسط',
      color: 'bg-yellow-400',
      description: 'کیفیت هوا قابل قبول است؛ با این حال، برخی آلاینده‌ها ممکن است برای تعداد بسیار کمی از افراد که به طور غیرمعمول به آلودگی هوا حساس هستند، نگرانی متوسطی برای سلامتی ایجاد کند.'
    },
    {
      level: 'ناسالم برای گروه‌های حساس',
      color: 'bg-orange-400',
      description: 'افراد گروه‌های حساس (مبتلایان به بیماری‌های ریوی، سالمندان و کودکان) ممکن است اثرات بهداشتی را تجربه کنند. عموم مردم احتمالاً تحت تأثیر قرار نمی‌گیرند.'
    },
    {
      level: 'ناسالم',
      color: 'bg-red-400',
      description: 'همه ممکن است اثرات بهداشتی را تجربه کنند؛ اعضای گروه‌های حساس ممکن است اثرات جدی‌تری را تجربه کنند.'
    },
    {
      level: 'بسیار ناسالم',
      color: 'bg-purple-400',
      description: 'هشدار بهداشتی: همه ممکن است اثرات بهداشتی جدی‌تری را تجربه کنند.'
    },
    {
      level: 'خطرناک',
      color: 'maroon',
      description: 'هشدار بهداشتی شرایط اضطراری. کل جمعیت به احتمال زیاد تحت تأثیر قرار می‌گیرند.'
    }
  ];

  const pollutantInfo = {
    co: {
      name: 'کربن مونوکسید (CO)',
      description: 'گازی بی‌رنگ و بی‌بو که از احتراق ناقص سوخت‌های فسیلی (مانند خودروها) تولید می‌شود. غلظت بالای آن می‌تواند باعث کاهش رسیدن اکسیژن به اندام‌ها و بافت‌های بدن شود و منجر به سردرد، سرگیجه و در موارد شدید مرگ شود.'
    },
    no2: {
      name: 'نیتروژن دی‌اکسید (NO₂)',
      description: 'گازی با بوی تند که عمدتاً از ترافیک جاده‌ای و سایر فرآیندهای احتراق سوخت فسیلی منتشر می‌شود. می‌تواند باعث التهاب راه‌های هوایی و تشدید بیماری‌های تنفسی مانند آسم شود.'
    },
    o3: {
      name: 'ازن (O₃)',
      description: 'یک آلاینده ثانویه که از واکنش نور خورشید با سایر آلاینده‌ها (مانند NOx و VOCs) تشکیل می‌شود. ازن در سطح زمین می‌تواند باعث مشکلات تنفسی، تحریک گلو و آسیب به ریه‌ها شود.'
    },
    so2: {
      name: 'گوگرد دی‌اکسید (SO₂)',
      description: 'گازی که از سوزاندن سوخت‌های فسیلی حاوی گوگرد (مانند زغال سنگ و نفت) در نیروگاه‌ها و صنایع تولید می‌شود. می‌تواند سیستم تنفسی را تحریک کرده و عملکرد ریه را مختل کند.'
    },
    pm2_5: {
      name: 'ذرات معلق (PM2.5)',
      description: 'ذرات بسیار ریز معلق در هوا با قطر ۲.۵ میکرومتر یا کمتر. این ذرات می‌توانند به عمق ریه‌ها و جریان خون نفوذ کنند و با بیماری‌های قلبی، مشکلات تنفسی و سرطان ریه مرتبط هستند.'
    },
    pm10: {
      name: 'ذرات معلق (PM10)',
      description: 'ذرات معلق در هوا با قطر ۱۰ میکرومتر یا کمتر. این ذرات نیز می‌توانند باعث مشکلات تنفسی شوند، اما PM2.5 خطرناک‌تر است زیرا به عمق بیشتری در ریه‌ها نفوذ می‌کند.'
    }
  };

  return (
    <div className="card p-6 col-span-1 md:col-span-2 lg:col-span-3">
      <h3 className="text-xl font-bold mb-4">کیفیت هوا</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className={`p-3 rounded-lg ${epaIndexInfo.bgColor}`}>
          <p className="text-center">
            <span className="font-semibold">شاخص EPA آمریکا:</span>
            <span className={`font-bold text-lg mx-2 ${epaIndexInfo.color}`}>{epaIndexInfo.text}</span>
            ({toPersianDigits(data['us-epa-index'])})
          </p>
        </div>
        <div className={`p-3 rounded-lg ${defraIndexInfo.bgColor}`}>
          <p className="text-center">
            <span className="font-semibold">شاخص DEFRA بریتانیا:</span>
            <span className={`font-bold text-lg mx-2 ${defraIndexInfo.color}`}>{defraIndexInfo.text}</span>
            ({toPersianDigits(data['gb-defra-index'])})
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm">
        <div className={`text-center p-2 rounded-lg ${getPollutantStyle('co', data)}`}>
          <p className="font-semibold">CO</p>
          <p>{toPersianDigits(data.co.toFixed(1))}</p>
        </div>
        <div className={`text-center p-2 rounded-lg ${getPollutantStyle('no2', data)}`}>
          <p className="font-semibold">NO₂</p>
          <p>{toPersianDigits(data.no2.toFixed(1))}</p>
        </div>
        <div className={`text-center p-2 rounded-lg ${getPollutantStyle('o3', data)}`}>
          <p className="font-semibold">O₃</p>
          <p>{toPersianDigits(data.o3.toFixed(1))}</p>
        </div>
        <div className={`text-center p-2 rounded-lg ${getPollutantStyle('so2', data)}`}>
          <p className="font-semibold">SO₂</p>
          <p>{toPersianDigits(data.so2.toFixed(1))}</p>
        </div>
        <div className={`text-center p-2 rounded-lg ${getPollutantStyle('pm2_5', data)}`}>
          <p className="font-semibold">PM2.5</p>
          <p>{toPersianDigits(data.pm2_5.toFixed(1))}</p>
        </div>
        <div className={`text-center p-2 rounded-lg ${getPollutantStyle('pm10', data)}`}>
          <p className="font-semibold">PM10</p>
          <p>{toPersianDigits(data.pm10.toFixed(1))}</p>
        </div>
      </div>
       <p className="text-xs text-gray-500 mt-4">
        مقادیر آلاینده‌ها به میکروگرم بر متر مکعب (µg/m³) است.
      </p>
      <div className="mt-6 border-t pt-2 space-y-2">
        {/* AQI Help Section */}
        <div className="border-b pb-2">
          <div className="flex justify-between items-center cursor-pointer p-2 rounded-md hover:bg-gray-50" onClick={() => setShowAqiHelp(!showAqiHelp)}>
            <h4 className="text-md font-semibold text-gray-700">راهنمای شاخص کیفیت هوا (AQI)</h4>
            <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${showAqiHelp ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          {showAqiHelp && (
            <div className="mt-2 pl-2 pr-4 space-y-4">
              {aqiHelpContent.map(item => (
                <div key={item.level} className="flex items-start gap-3 text-xs">
                  <span 
                    style={{ backgroundColor: item.color === 'maroon' ? '#800000' : undefined }}
                    className={`w-4 h-4 rounded-full flex-shrink-0 mt-0.5 ${item.color}`}
                  ></span>
                  <div>
                    <p className="font-bold text-gray-800">{item.level}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pollutants Help Section */}
        <div>
          <div className="flex justify-between items-center cursor-pointer p-2 rounded-md hover:bg-gray-50" onClick={() => setShowPollutantHelp(!showPollutantHelp)}>
            <h4 className="text-md font-semibold text-gray-700">درباره آلاینده‌ها</h4>
            <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${showPollutantHelp ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          {showPollutantHelp && (
            <div className="mt-2 pl-2 pr-4 space-y-4">
              {Object.values(pollutantInfo).map(p => (
                <div key={p.name} className="text-xs">
                  <p className="font-bold text-gray-800">{p.name}</p>
                  <p className="text-gray-600">{p.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AirQuality;
