import React from 'react';

// Emergency location data for better maintainability
const emergencyLocations = [
  {
    id: 'police',
    title: 'ایستگاه پلیس',
    address: 'دابودشت، درویشخیل',
    emergency: '۱۱۰',
    icon: '🚔',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800'
  },
  {
    id: 'fire',
    title: 'ایستگاه آتش‌نشانی',
    address: 'دابودشت، درویشخیل',
    emergency: '۱۲۵',
    icon: '🚒',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-800'
  },
  {
    id: 'medical',
    title: 'درمانگاه',
    address: 'خیابان ولیعصر، ۵۰ متری ابتدای خیابان',
    emergency: '۱۱۵',
    icon: '🏥',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800'
  }
];

// Emergency card component for better organization
const EmergencyCard = ({ location }) => (
  <div className={`${location.bgColor} ${location.borderColor} border-2 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="text-4xl mb-3">{location.icon}</div>
    <h4 className={`font-bold text-lg ${location.textColor} mb-3`}>
      {location.title}
    </h4>
    <div className="text-gray-700 mb-4 leading-relaxed">
      <div className="mb-2">{location.address}</div>
    </div>
    <div className={`${location.textColor} font-bold text-xl bg-white px-4 py-2 rounded-lg border ${location.borderColor}`}>
      اورژانس: {location.emergency}
    </div>
  </div>
);

const EmergencyInfo = () => {
  return (
    <section className="mt-8 bg-red-50 border-2 border-red-200 p-8 rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🚨</div>
        <h3 className="text-3xl font-bold text-red-700 mb-2">مکان‌های اضطراری</h3>
        <p className="text-red-600">در مواقع اضطراری با شماره‌های زیر تماس بگیرید</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {emergencyLocations.map((location) => (
          <EmergencyCard key={location.id} location={location} />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4">
          <p className="text-red-800 font-semibold">
            ⚠️ در مواقع اضطراری، همیشه اول با شماره مربوطه تماس بگیرید
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmergencyInfo;
