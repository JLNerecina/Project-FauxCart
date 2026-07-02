'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues with Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

const funnyRiderIcon = L.divIcon({
  html: `<div style="font-size: 32px; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.25)); animation: bounce 1s infinite alternate;">🤪🛵</div>`,
  className: 'custom-div-icon',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

export default function DeliveryMap() {
  const position: [number, number] = [40.7128, -74.0060]; // Example: NYC

  useEffect(() => {
    // Add custom keyframes for bounce animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes bounce {
        from { transform: translateY(0); }
        to { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="h-48 w-full rounded-xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={funnyRiderIcon}>
          <Popup>
            <div className="font-bold text-indigo-600">Simulated Rider</div>
            <div className="text-xs">Speeding to you!</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
