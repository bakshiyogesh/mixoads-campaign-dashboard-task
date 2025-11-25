// src/components/CampaignCardSkeleton.tsx
import React from "react";

export const CampaignCardSkeleton: React.FC = () => (
  <div className="p-4 rounded border border-gray-200 bg-white shadow min-w-[240px] w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] animate-pulse">
    <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
    <div className="h-3 w-1/4 bg-gray-100 rounded mb-2"></div>
    <div className="h-3 w-2/3 bg-gray-100 rounded mb-2"></div>
    <div className="flex gap-1 mt-2">
      <div className="h-5 w-10 bg-gray-200 rounded"></div>
      <div className="h-5 w-10 bg-gray-200 rounded"></div>
      <div className="h-5 w-10 bg-gray-200 rounded"></div>
    </div>
    <div className="mt-2 flex gap-2 items-center">
      <div className="h-3 w-14 bg-gray-100 rounded"></div>
      <div className="flex gap-1">
        <div className="h-5 w-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);
