import React from "react";

export const KPICard: React.FC<{ label: string; value: number | string | undefined }> = ({ label, value }) => (
  <div className="bg-blue-50 rounded shadow flex-1 min-w-[140px] max-w-[220px] p-4">
    <div className="text-xs text-gray-500 font-medium truncate">{label}</div>
    <div className="text-2xl font-bold text-blue-950 mt-2">
      {value !== undefined && value !== null && value !== "" ? value : <span className="text-gray-400">N/A</span>}
    </div>
  </div>
);

