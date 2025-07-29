import React, { useState, useCallback, useRef, useEffect } from "react";

const GallerySearchBar = ({ onSearch, placeholder = "جستجو در تصاویر..." }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceRef = useRef(null);

  // Debounced search function to reduce lag
  const debouncedSearch = useCallback((value) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, 300); // 300ms delay
  }, [onSearch]);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    onSearch("");
  }, [onSearch]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="mb-8 max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={placeholder}
          className="form-input pr-10 pl-10 text-center focus:ring-primary-500 focus:border-primary-500"
          autoComplete="off"
          spellCheck={false}
        />
        
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="text-center mt-2 text-sm text-gray-600">
          جستجو برای: "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default GallerySearchBar;
