// components/GooglePlacesAutocomplete.tsx
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const GooglePlacesAutocomplete = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const handlePlaceChanged = () => {
      if (inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          console.log('Selected place:', place);
          setSuggestions([]); // Clear suggestions after selection
        });
      }
    };

    if (window.google) {
      handlePlaceChanged();
    }
  }, []);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACE_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onLoad={() => {
          if (inputRef.current) {
            const autocomplete = new google.maps.places.Autocomplete(inputRef.current);
            autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace();
              console.log('Selected place:', place);
              setSuggestions([]); // Clear suggestions after selection
            });
          }
        }}
      />
      <input
        ref={inputRef}
        placeholder="Enter a location"
        className="bg-[#f6f6f6] w-full h-[80px] rounded-[8px] text-[14px] border-solid border-[1px] border-[#eee] pl-[11px] pr-[80px] py-[15px]"
      />
      {/* Optional: Display suggestions */}
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </>
  );
};

export default GooglePlacesAutocomplete;
