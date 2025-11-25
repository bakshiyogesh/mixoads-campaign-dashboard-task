import React from "react";

export const KPICardSkeleton: React.FC = () => (
  <div className="bg-blue-50 rounded shadow flex-1 min-w-[140px] max-w-[220px] p-4 animate-pulse">
    <div className="h-4 bg-blue-100 rounded w-2/3 mb-2"></div>
    <div className="h-8 bg-blue-200 rounded w-3/4"></div>
  </div>
);
