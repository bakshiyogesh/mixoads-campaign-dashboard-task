import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosInstance } from "@/api/axiosInstance";
import { KPICardSkeleton } from "@/components/skelton/kpi";
import { KPICard } from "@/components/campaign/kpi-card";

export const InsightsOverview: React.FC = () => {
  const {data:insights,isPending}=useQuery({
        queryKey:["insights"],
        queryFn:async()=>{
            const res=await axiosInstance.get("/campaigns/insights")
            return res
        },
        select:(data)=>data?.data?.insights
    })
    
const kpiList = [
  { label: "Total Campaigns", value: insights?.total_campaigns },
  { label: "Active", value: insights?.active_campaigns },
  { label: "Paused", value: insights?.paused_campaigns },
  { label: "Completed", value: insights?.completed_campaigns },
  { label: "Impressions", value: insights?.total_impressions.toLocaleString() },
  { label: "Clicks", value: insights?.total_clicks.toLocaleString() },
  { label: "Conversions", value: insights?.total_conversions.toLocaleString() },
  { label: "Spend", value: insights?.total_spend? `$${insights?.total_spend.toLocaleString()}` : "" },
  { label: "Avg. CTR", value:insights?.avg_ctr? `${insights?.avg_ctr}%` : "" },
  { label: "Avg. CPC", value: insights?.avg_cpc? `$${insights?.avg_cpc}` : "" },
  { label: "Avg. Conversion Rate", value:insights?.avg_conversion_rate? `${insights?.avg_conversion_rate}%` : "" },
];
  


  return (
    <section className="px-6 pt-8">
        <h1 className="text-2xl font-bold mb-2">Campaign Performance Overview</h1>
        <p className="text-gray-600 mb-6">
          Key metrics across all campaigns. These indicators summarize your overall ad activity and effectiveness for the selected period.
        </p>
    <div className="flex flex-wrap gap-4 mb-6">
    {isPending
      ? Array.from({ length: 6 }).map((_, i) => <KPICardSkeleton key={i} />)
      : kpiList?.map((kpi) => (
          <KPICard key={kpi.label} label={kpi.label} value={kpi.value} />
        ))
    }
  </div>
      </section>
  );
};
