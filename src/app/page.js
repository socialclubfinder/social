'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '../components/Sidebar';

const Map = dynamic(() => import('../components/Map'), { 
  ssr: false 
});

export default function Home() {
  const [spots, setSpots] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSpots() {
      try {
        const response = await fetch('/api/socialclubs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSpots(data);
      } catch (e) {
        console.error('Error fetching socialclubs:', e);
        setError('Failed to fetch socialclubs');
      }
    }
    fetchSpots();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-screen">
      
      <Sidebar 
        spots={spots}
        setSelectedCountry={setSelectedCountry}
      />
      <main className="flex-grow">
        <Map spots={selectedCountry ? { [selectedCountry]: spots[selectedCountry] } : spots} />
      </main>
    </div>
  );
}