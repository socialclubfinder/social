"use client";
import React from 'react';


import { useCallback, useEffect, useRef, useState } from 'react';
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

export default function Map() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function fetchSpots() {
      try {
        const response = await fetch('/api/clubs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const clubsByCountry = await response.json();
        const allSpots = Object.values(clubsByCountry).flat();
        setSpots(allSpots);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    }
    fetchSpots();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const updateMarkers = useCallback(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    spots.forEach(spot => {
      if (spot.lat && spot.long) {
        const marker = L.marker([spot.lat, spot.long], { icon: customIcon })
          .addTo(mapInstanceRef.current)
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
      }
    });

    // Adjust map view to fit all markers
    if (spots.length > 0) {
      const group = L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [spots]);

  useEffect(() => {
    if (mapInstanceRef.current && spots.length > 0) {
      updateMarkers();
    }
  }, [spots, updateMarkers]);

  return (
    <div ref={mapRef} className="h-full w-full" />
  );
}
