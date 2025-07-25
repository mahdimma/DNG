// Persian number conversion utility
export const toPersianNumbers = (str) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.toString().replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit)]);
};

// Detect RTL (can be enhanced with context or props)
export const isRTL = () => {
  return document.documentElement.dir === 'rtl' || 
         document.documentElement.lang === 'fa' || 
         document.documentElement.lang === 'ar';
};

// Format time with Persian numbers if RTL
export const formatDisplayTime = (time, formatTime, rtl) => {
  const formatted = formatTime(time);
  return rtl ? toPersianNumbers(formatted) : formatted;
};
