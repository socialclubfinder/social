'use client';
import React from 'react';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';

const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false 
});

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar setSelectedCountry={setSelectedCountry} />
      <main className="flex-grow relative">
        <Map />
      </main>
    </div>
  );
}