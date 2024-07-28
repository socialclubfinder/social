'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = L.icon({
  iconUrl: '/images/socialclub-marker.svg',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

export default function Map({ spots }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) {
      initializeMap();
    }

    updateMarkers();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [spots]);

  const initializeMap = () => {
    try {
      mapRef.current = L.map('map').setView([51.1657, 10.4515], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const updateMarkers = () => {
    try {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add new markers
      const allSpots = Object.values(spots).flat();
      allSpots.forEach(spot => {
        const marker = L.marker([spot.lat, spot.long], { icon: customIcon })
          .addTo(mapRef.current)
          .bindPopup(`
            <div class="text-center">
              <h3 class="font-bold text-lg">${spot.name}</h3>
              <p>${spot.address}</p>
              <p>${spot.city}, ${spot.country}</p>
              <p>Zip Code: ${spot.zipCode}</p>
              ${spot.website ? `<p><a href="${spot.website}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">Visit Website</a></p>` : ''}
              ${spot.phone ? `<p><a href="tel:${spot.phone}" class="text-blue-500 hover:underline">Call ${spot.phone}</a></p>` : ''}
            </div>
          `);
        markersRef.current.push(marker);
      });

      // Adjust map view to fit all markers
      if (allSpots.length > 0) {
        const group = L.featureGroup(markersRef.current);
        mapRef.current.fitBounds(group.getBounds().pad(0.1));
      }
    } catch (error) {
      console.error('Error updating markers:', error);
    }
  };

  return <div id="map" className="h-full w-full" />;
}