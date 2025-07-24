import React, { Suspense } from 'react';

const Map = React.lazy(() => import('../Map'));

const MapContainer = ({ locations, locationTypes, selectedLocation, onMarkerClick, isClient }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow-inner h-full flex flex-col">
    <div className="bg-gray-200 w-full rounded-lg flex items-center justify-center text-gray-500 relative overflow-hidden flex-grow">
      {isClient && (
        <Suspense fallback={<div>در حال بارگذاری نقشه...</div>}>
          <Map 
            locations={locations} 
            locationTypes={locationTypes}
            selectedLocation={selectedLocation}
            onMarkerClick={onMarkerClick}
          />
        </Suspense>
      )}
    </div>
    
    <div className="mt-4 bg-white p-4 rounded-lg border">
      <h4 className="font-bold mb-4">راهنمای نقشه</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
        {locationTypes.slice(1).map((type, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: type.color }}
            ></div>
            <span className="text-sm">{type.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MapContainer;
