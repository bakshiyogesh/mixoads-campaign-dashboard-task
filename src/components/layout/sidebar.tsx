import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const isCampaignsActive = () => {
  // Highlight for root "/" and any "/campaign/..." subpage
  return location.pathname === '/' || location.pathname.startsWith('/campaign');
};

const isSidebarActive=isCampaignsActive() ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'


  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      <div className="mb-8 p-2">
        <h1 className="text-xl font-bold text-gray-800">Campaign</h1>
      </div>
      
      <nav className="space-y-1">
        <Link 
          to="/" 
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isSidebarActive}`}
        >
          <span>Campaigns</span>
        </Link>
        
        <Link 
          to="/" 
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50`}
        >
          <span>Analytics</span>
        </Link>
        
        <Link 
          to="/" 
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50`} 
        >
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
