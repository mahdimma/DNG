import React from 'react';

const FilterButtons = ({ locationTypes, filter, setFilter }) => (
  <div className="mb-8 flex justify-center flex-wrap gap-2">
    {locationTypes.map(({ type, name, color }) => (
      <button
        key={type}
        onClick={() => setFilter(type)}
        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 border-2 ${
          filter === type
            ? 'text-white'
            : 'bg-white'
        }`}
        style={{
          backgroundColor: filter === type ? color : 'white',
          borderColor: color,
          color: filter === type ? 'white' : color,
        }}
      >
        {name}
      </button>
    ))}
  </div>
);

export default FilterButtons;
