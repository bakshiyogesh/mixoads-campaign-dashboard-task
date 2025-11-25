import React from "react";
import { Outlet } from "react-router-dom";

export const DashboardLayout: React.FC<{  }> = () => (
  <div className="flex min-h-screen">
    <aside className="w-64 bg-gray-800 p-4">
      {/* Sidebar navigation here */}
    </aside>
    <main className="flex-1 bg-gray-50">
      {/* Header, FiltersBar, and children */}
      <Outlet/>
    </main>
  </div>
);
