import React from 'react';

const LocationsList = ({ locations, locationTypes, selectedLocation, onSelectLocation }) => (
  <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
    <h3 className="text-xl font-bold text-gray-900 mb-4">نقاط مورد علاقه</h3>
    <div className="overflow-y-auto flex-grow">
      {locations.map((location) => {
        const locationTypeData = locationTypes.find(t => t.type === location.type);
        return (
          <div 
            key={location.id}
            className={`p-4 mb-4 rounded-lg cursor-pointer transition-all duration-200 border ${
              selectedLocation?.id === location.id
                ? 'bg-green-50'
                : 'bg-white hover:bg-gray-50'
            }`}
            style={{
              borderColor: selectedLocation?.id === location.id ? locationTypeData?.color : '#e2e8f0',
            }}
            onClick={() => onSelectLocation(location)}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: locationTypeData?.color }}
              ></div>
              <div>
                <h4 className="font-bold text-gray-800">{location.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{location.description}</p>
                <div className="text-xs text-gray-500 mt-2 space-y-1">
                  <div>📍 {location.address}</div>
                  <div>🕒 {location.hours}</div>
                  <div>📞 {location.phone}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default LocationsList;
