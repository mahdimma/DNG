import React from "react"

const DemographicsSection = () => {
  const demographicData = {
    totalPopulation: 563,
    male: 283,
    female: 280,
    households: 175,
    location: {
      province: "مازندران",
      county: "آمل", 
      district: "دابودشت",
      ruralDistrict: "دابوئ جنوبي",
      village: "دنگپيا"
    },
    statisticalCode: "0201030001055015168"
  }

  const formatNumber = (num) => {
    return num.toLocaleString('fa-IR');
  };

  const stats = [
    {
      label: "جمعیت کل",
      value: formatNumber(demographicData.totalPopulation),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "bg-blue-500",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      label: "مردان",
      value: formatNumber(demographicData.male),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: "bg-indigo-500",
      bgColor: "bg-indigo-100", 
      textColor: "text-indigo-600"
    },
    {
      label: "زنان",
      value: formatNumber(demographicData.female),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: "bg-pink-500",
      bgColor: "bg-pink-100",
      textColor: "text-pink-600"
    },
    {
      label: "تعداد خانوار",
      value: formatNumber(demographicData.households),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      color: "bg-green-500",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    }
  ]

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center">
          <div className="w-3 h-3 bg-primary-500 rounded-full ml-3"></div>
          آمار جمعیتی روستا
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          اطلاعات جمعیت‌شناختی و آماری روستای دنگپیا بر اساس آخرین سرشماری رسمی
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center hover:shadow-lg transition-shadow duration-300">
            <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <div className={stat.textColor}>
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Population Chart */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">توزیع جمعیت بر اساس جنسیت</h3>
        <div className="max-w-lg mx-auto">
          {/* Combined Gender Bar */}
          <div className="relative">
            {/* Labels */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-500 rounded-full ml-2"></div>
                <span className="text-gray-600">مردان</span>
                <span className="font-bold text-indigo-600 mr-2">{formatNumber(demographicData.male)}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-pink-600 ml-2">{formatNumber(demographicData.female)}</span>
                <span className="text-gray-600">زنان</span>
                <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
              </div>
            </div>
            
            {/* Combined Bar */}
            <div className="relative bg-gray-200 rounded-full h-8 overflow-hidden">
              {/* Male bar (left side) */}
              <div 
                className="absolute left-0 top-0 h-full bg-indigo-500 transition-all duration-1000 ease-out"
                style={{ width: `${(demographicData.male / demographicData.totalPopulation) * 100}%` }}
              ></div>
              {/* Female bar (right side) */}
              <div 
                className="absolute right-0 top-0 h-full bg-pink-500 transition-all duration-1000 ease-out"
                style={{ width: `${(demographicData.female / demographicData.totalPopulation) * 100}%` }}
              ></div>
              {/* Center divider line */}
              <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white transform -translate-x-1/2"></div>
            </div>
            
            {/* Percentages */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-indigo-600 font-medium">
                {formatNumber(parseFloat(((demographicData.male / demographicData.totalPopulation) * 100).toFixed(1)))}%
              </span>
              <span className="text-sm text-pink-600 font-medium">
                {formatNumber(parseFloat(((demographicData.female / demographicData.totalPopulation) * 100).toFixed(1)))}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Administrative Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full ml-3"></div>
            تقسیمات کشوری
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">استان:</span>
              <span className="font-medium text-gray-900">{demographicData.location.province}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">شهرستان:</span>
              <span className="font-medium text-gray-900">{demographicData.location.county}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">بخش:</span>
              <span className="font-medium text-gray-900">{demographicData.location.district}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">دهستان:</span>
              <span className="font-medium text-gray-900">{demographicData.location.ruralDistrict}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">آبادی:</span>
              <span className="font-medium text-gray-900">{demographicData.location.village}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full ml-3"></div>
            اطلاعات تکمیلی
          </h3>
          <div className="space-y-4">
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">کد آماری آبادی:</div>
              <div className="font-mono text-sm text-gray-900 bg-white px-3 py-2 rounded border">
                {demographicData.statisticalCode}
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">میانگین اعضای خانوار:</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(parseFloat((demographicData.totalPopulation / demographicData.households).toFixed(1)))} نفر
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">نسبت جنسی:</div>
              <div className="text-lg font-semibold text-green-600">
                {formatNumber(parseFloat(((demographicData.male / demographicData.female) * 100).toFixed(1)))} مرد به ازای هر ۱۰۰ زن
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DemographicsSection
