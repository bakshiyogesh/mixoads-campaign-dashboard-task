import React from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';


const MainLayout: React.FC<{}> = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
