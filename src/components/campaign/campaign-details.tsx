import React, { useEffect, useState } from "react";

export const CampaignDetails: React.FC<{ id: string }> = ({ id }) => {
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    fetch(`https://mixo-fe-backend-task.vercel.app/campaigns/${id}`)
      .then((res) => res.json())
      .then(setDetails);
  }, [id]);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold">{details.name}</h2>
      {/* Display other campaign details */}
    </div>
  );
};
