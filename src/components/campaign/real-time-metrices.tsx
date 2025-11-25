import React, { useEffect, useState } from "react";

export const RealTimeMetrics: React.FC<{ id: string }> = ({ id }) => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const es = new EventSource(`https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights/stream`);
    es.onmessage = (event) => setMetrics(JSON.parse(event.data));
    return () => es.close();
  }, [id]);

  if (!metrics) return <div>Waiting for metrics...</div>;

  return (
    <div>
      {/* Display metrics in KPICards or a table */}
    </div>
  );
};
