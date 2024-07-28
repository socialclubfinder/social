'use client';
import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, PlusCircle, Search, ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Sidebar({ spots, setSelectedCountry }) {
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(true);

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
            <a
              href="https://forms.gle/TyXaJDEbM4C7Ptc36"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-2 px-4 mb-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Submit Your Favorite Spot
            </a>
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
                    <span className="font-semibold">{country}</span>
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
                        <li key={spot.name} className="py-2 px-3 bg-white rounded-md shadow-sm">
                          <span className="text-sm text-gray-700 hover:text-blue-500 transition-colors duration-200">
                            {spot.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors duration-200">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


//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