import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

let L;
if (typeof window !== 'undefined') {
  L = require('leaflet');
  // ... (rest of the icon fix)
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });
}

const createCustomIcon = (color) => {
  return L.divIcon({
    html: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
             <circle cx="12" cy="12" r="4" fill="white"/>
           </svg>`,
    className: 'custom-marker-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

const MapUpdater = ({ selectedLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedLocation) {
      map.setView([selectedLocation.coordinates.lat, selectedLocation.coordinates.lng], 16, {
        animate: true,
        pan: {
          duration: 1
        }
      });
    }
  }, [selectedLocation, map]);
  return null;
};

const Map = ({ locations, locationTypes, selectedLocation, onMarkerClick }) => {
  const center = [36.5145, 52.4795];

  const locationTypeColor = (type) => {
    if (!Array.isArray(locationTypes)) {
      return '#333'; // Return a default color if locationTypes is not ready
    }
    const locationType = locationTypes.find(lt => lt.type === type);
    return locationType ? locationType.color : '#333';
  };

  return (
    <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%', borderRadius: '8px', zIndex: 0 }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map(location => (
        <Marker 
          key={location.id} 
          position={[location.coordinates.lat, location.coordinates.lng]}
          icon={createCustomIcon(locationTypeColor(location.type))}
          eventHandlers={{
            click: () => {
              onMarkerClick(location);
            },
          }}
        >
          <Popup>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: 0, paddingBottom: '0.5rem' }}>{location.name}</h3>
              <p style={{ margin: 0 }}>{location.description}</p>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: '#555' }}>{location.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      <MapUpdater selectedLocation={selectedLocation} />
    </MapContainer>
  );
};

export default Map;
