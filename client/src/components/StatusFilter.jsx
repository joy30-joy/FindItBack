import React from 'react';

const StatusFilter = ({ statusFilter, setStatusFilter }) => {
  const filters = [
    { value: 'All', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'Resolved', label: 'Resolved' }
  ];

  return (
    <div className="flex space-x-2">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => setStatusFilter(filter.value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            statusFilter === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;