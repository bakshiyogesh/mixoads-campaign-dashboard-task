import React from "react";

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen">
    <aside className="w-64 bg-gray-800 p-4">
      {/* Sidebar navigation here */}
    </aside>
    <main className="flex-1 bg-gray-50">
      {/* Header, FiltersBar, and children */}
      {children}
    </main>
  </div>
);
