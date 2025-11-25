import { useEffect, useState } from "react";

const useLiveCampaignMetrics = (id: string) => {
  const [metrics, setMetrics] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const sse = new EventSource(
      `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights/stream`
    );
    sse.onmessage = (event) => {
      setMetrics(JSON.parse(event.data));
      setLoading(false);
    };
    sse.onerror = () => {
      sse.close();
      setLoading(false);
    };
    return () => sse.close();
  }, [id]);

  return { metrics, loading };
};

export default useLiveCampaignMetrics;