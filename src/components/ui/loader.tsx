import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-1 border-4 border-gray-200 rounded-full"></div>
      </div>
      <span className="ml-3 text-gray-600 font-medium">Loading...</span>
    </div>
  );
};

export default Loader;
