'use client';

import { useState } from 'react';
import axios from 'axios';

const AddressAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1,
          limit: 5
        }
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSelect = (address) => {
    setSelectedAddress(address);
    setQuery(`${address.address.house_number}, ${address.address.road}`);
    setSuggestions([]);
    if (onSelect) {
      onSelect(address);
    }
  };

  return (
    <div style={{ position: 'relative', maxWidth: '600px', margin: 'auto' }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter address"
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          fontSize: '16px',
          color: 'black'
        }}
      />
      {suggestions.length > 0 && (
        <ul style={{
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '0',
          margin: '0',
          listStyle: 'none',
          position: 'absolute',
          width: '100%',
          maxHeight: '200px',
          overflowY: 'auto',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 1000,
          color: 'black'
        }}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              style={{
                padding: '12px',
                cursor: 'pointer',
                borderBottom: '1px solid #ddd',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
      {selectedAddress && (
        <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9', maxWidth: '100%', color: 'black' }}>
          <h3>Selected Address:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: '0' }}>
            {JSON.stringify(selectedAddress, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
