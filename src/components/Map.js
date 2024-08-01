'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = L.icon({
  iconUrl: '/images/socialclub-marker.svg',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

function formatNameForUrl(name) {
  return name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
}

export default function Map({ spots }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapRef.current) {
      initializeMap();
    } else {
      updateMarkers();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setMapInitialized(false);
      }
    };
  }, [spots]);

  const initializeMap = () => {
    try {
      mapRef.current = L.map('map').setView([51.1657, 10.4515], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
      setMapInitialized(true);
      updateMarkers();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const updateMarkers = () => {
    if (!mapInitialized) return;

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
              <p><a href="/clubs/${formatNameForUrl(spot.name)}" class="text-blue-500 hover:underline">View Club Details</a></p>
            </div>
          `);
        markersRef.current.push(marker);
      });

      // Adjust map view to fit all markers
      if (allSpots.length > 0 && mapRef.current) {
        const group = L.featureGroup(markersRef.current);
        mapRef.current.fitBounds(group.getBounds().pad(0.1));
      }
    } catch (error) {
      console.error('Error updating markers:', error);
    }
  };

  return <div id="map" className="h-full w-full" />;
}