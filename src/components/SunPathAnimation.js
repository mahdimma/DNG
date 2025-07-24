import React, { useState, useEffect } from 'react';

const SunPathAnimation = ({ sunrise, sunset, toPersianDigits }) => {
  const [sunPosition, setSunPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
      hours = 0;
    }
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return date;
  };

  useEffect(() => {
    const calculateSunPosition = () => {
      const now = new Date();
      const sunriseTime = parseTime(sunrise);
      const sunsetTime = parseTime(sunset);

      const totalDaylight = sunsetTime.getTime() - sunriseTime.getTime();
      const timeSinceSunrise = now.getTime() - sunriseTime.getTime();
      
      let percentage = (timeSinceSunrise / totalDaylight) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      
      setSunPosition(percentage);
      setCurrentTime(toPersianDigits(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })));
    };

    calculateSunPosition();
    const interval = setInterval(calculateSunPosition, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [sunrise, sunset, toPersianDigits]);

  const angle = -180 + (sunPosition * 180) / 100;

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow">
      <div className="relative w-56 h-28 overflow-hidden">
        {/* Dashed Arc Path */}
        <svg width="224" height="112" viewBox="0 0 224 112" className="absolute top-0 left-0">
          <path
            d="M 12 100 A 100 100 0 0 1 212 100"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
        
        {/* Sun */}
        <div
          className="absolute w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center"
          style={{
            top: '100%',
            left: '50%',
            transformOrigin: 'center -88px',
            transform: `translateX(-50%) rotate(${angle}deg)`,
            transition: 'transform 1s ease-out',
          }}
        >
          ☀️
        </div>
      </div>
      <div className="flex justify-between w-full px-2 mt-1 text-xs text-gray-600">
        <span>طلوع: {toPersianDigits(sunrise.replace(' AM', ''))}</span>
        <span className="font-bold text-primary-600">اکنون: {currentTime}</span>
        <span>غروب: {toPersianDigits(sunset.replace(' PM', ''))}</span>
      </div>
    </div>
  );
};

export default SunPathAnimation;
