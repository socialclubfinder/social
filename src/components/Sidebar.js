'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, PlusCircle, Search, ChevronLeft, ChevronRight,  Twitter, Instagram, Linkedin } from 'lucide-react';

const countryFlags = {
  'Spain': '🇪🇸',
  'Portugal': '🇵🇹',
  'Germany': '🇩🇪',
  'Malta': '🇲🇹',
  'Switzerland': '🇨🇭'
  // Add more countries and their flags as needed
};

const defaultFlag = '🏳️';

const Telegram = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
  >
    <path
      d="M21.5 3.5l-3 17c-.2 1-1.5 1.4-2.2.7l-5-4.7-2.4 2.3c-.3.3-.7.4-1.1.4l.4-5.7L19 6.5l-11 4.8-4-1.3c-1-.3-1-1.6.2-2L20.5 2c1-.3 2 .5 1.5 1.5z"
      fill="currentColor"
    />
  </svg>
);

export default function Sidebar({ setSelectedCountry }) {
  const [spots, setSpots] = useState({});
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const response = await fetch('/api/clubs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const clubsByCountry = await response.json();
        setSpots(clubsByCountry);
      } catch (error) {
        console.error('Error fetching clubs:', error);
        setError(error.message);
      }
    }
    fetchClubs();
  }, []);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setExpandedCountry(expandedCountry === country ? null : country);
  };

  const filteredSpots = useMemo(() => {
    if (!searchTerm) return spots;
    const lowercasedSearch = searchTerm.toLowerCase();
    return Object.entries(spots).reduce((acc, [country, locations]) => {
      const filteredLocations = locations.filter(
        spot => spot.name.toLowerCase().includes(lowercasedSearch) ||
        spot.city.toLowerCase().includes(lowercasedSearch) ||
        country.toLowerCase().includes(lowercasedSearch)
      );
      if (filteredLocations.length > 0) {
        acc[country] = filteredLocations;
      }
      return acc;
    }, {});
  }, [spots, searchTerm]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  function formatNameForUrl(name) {
    return name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  }

  return (
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-12'} bg-gray-100 overflow-hidden relative flex flex-col h-screen`}>
      <button
        onClick={toggleSidebar}
        className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      
      {isOpen && (
        <>
          <div className="p-4 overflow-y-auto flex-grow">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Socialclubs</h2>
            
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg">
                Error: {error}
              </div>
            )}

            {/* <a
              href="https://forms.gle/TyXaJDEbM4C7Ptc36"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-2 px-4 mb-4 bg-emerald-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Submit Your Favorite SocialClub
            </a> */}

            <div className="mb-4 p-2 bg-gray-200 rounded-lg text-center text-sm text-gray-700">
              <a href="#" className="block">Ad: Discover Amazing Travel Deals!</a>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search spots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <ul className="space-y-2">
              {Object.entries(filteredSpots).map(([country, locations]) => (
                <li key={country} className="mb-3">
                  <button
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ease-in-out flex justify-between items-center ${
                      expandedCountry === country
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-white text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => handleCountryClick(country)}
                  >
                    <span className="font-semibold">
                      {countryFlags[country] || defaultFlag} {country}
                    </span>
                    <span className="flex items-center">
                      <span className={`rounded-full px-2 py-1 text-xs mr-2 ${
                        expandedCountry === country ? 'bg-white text-blue-500' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {locations.length}
                      </span>
                      {expandedCountry === country ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {expandedCountry === country && (
                    <ul className="mt-2 ml-2 space-y-1">
                      {locations.map((spot) => (
                        <li key={spot.id} className="py-2 px-3 bg-white rounded-md shadow-sm">
                          <Link href={`/clubs/${formatNameForUrl(spot.name)}`}>
                            <span className="text-sm text-gray-700 hover:text-blue-500 transition-colors duration-200">
                              {spot.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4 pb-2">
            <a href="https://www.royalqueenseeds.de/?a_aid=54839603&a_bid=a4883cb5" target="_blank" rel="noopener noreferrer">
              <div className="p-2 bg-gray-200 rounded-lg text-center text-sm text-gray-700">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&bgcolor=FFFFFF&data=https%3A%2F%2Fwww.royalqueenseeds.de%2F%3Fa_aid%3D54839603%26a_bid%3Da4883cb5" alt="QR Code" />
              </div>
            </a>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-center space-x-4">
              <a href="https://t.me/socialclubfinder" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                <Telegram className="w-6 h-6" />
              </a>
              <a href="https://x.com/ganjacoin420" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="w-6 h-6" />
              </a>
              {/* <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors duration-200">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}