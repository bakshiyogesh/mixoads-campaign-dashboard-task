import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import { KPICardSkeleton } from "../skelton/kpi";
import { KPICard } from "./kpi-card";
import { renderPlatforms } from "./campaign-list";
import dayjs from "dayjs";
import { CampaignCardSkeleton } from "../skelton/campaign";
import useLiveCampaignMetrics from "@/hooks/useLiveCampaignMetrics";
import { STATUS_MAP } from "../../constants";
import type { Campaign, CampaignMetrics } from "./types";
import { ChevronBackIcon } from "@/assets/icon";

const useCampaignData = (id: string) => {
  const { data: campaign, isPending: campaignPending, error: campaignError } = useQuery({
    queryKey: ["campaign-with-id", id],
    queryFn: async () => {
      const response = await axiosInstance.get<{ campaign: Campaign }>(`/campaigns/${id}`);
      return response.data?.campaign;
    },
    enabled: !!id,
  });

  const { data: insights, isPending: insightsPending, error: insightsError } = useQuery({
    queryKey: ["campaign-insights", id],
    queryFn: async () => {
      const response = await axiosInstance.get<{ insights: CampaignMetrics }>(`/campaigns/${id}/insights`);
      return response.data?.insights;
    },
    enabled: !!id,
  });

  return {
    campaign,
    insights,
    isLoading: campaignPending || insightsPending,
    error: campaignError || insightsError,
  };
};

const useKpiList = (insights: CampaignMetrics | undefined, liveMetrics: CampaignMetrics | null) => {
  return useMemo(() => {
    const getValue = (key: keyof CampaignMetrics, formatter?: (val: any) => string) => {
      const liveValue = liveMetrics?.[key];
      const insightValue = insights?.[key];
      
      if (liveValue !== undefined) {
        return formatter ? formatter(liveValue) : liveValue;
      }
      if (insightValue !== undefined) {
        return formatter ? formatter(insightValue) : insightValue;
      }
      return "N/A";
    };

    return [
      { label: "Impressions", value: getValue("impressions", (v) => v.toLocaleString()) },
      { label: "Clicks", value: getValue("clicks", (v) => v.toLocaleString()) },
      { label: "Conversions", value: getValue("conversions", (v) => v.toLocaleString()) },
      { label: "Spend", value: getValue("spend", (v) => `$${v.toLocaleString()}`) },
      { label: "CTR", value: getValue("ctr", (v) => `${v}%`) },
      { label: "CPC", value: getValue("cpc", (v) => `$${v}`) },
      { label: "Conversion Rate", value: getValue("conversion_rate", (v) => `${v}%`) },
    ];
  }, [insights, liveMetrics]);
};

const CampaignDetails: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const { campaign, insights, isLoading, error } = useCampaignData(id);
  const { metrics: liveMetrics } = useLiveCampaignMetrics(id);
  const kpiList = useKpiList(insights, liveMetrics);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded">
        Error loading campaign data. Please try again later.
      </div>
    );
  }

  const {
    status = "",
    platforms = [],
    daily_budget = 0,
    budget = 0,
    created_at = "",
    name = "",
  } = campaign || {};

  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white shadow rounded">
      <button 
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 mb-4 transition-colors text-sm font-medium cursor-pointer"
      >
        <ChevronBackIcon />
      </button>
      <h2 className="text-2xl font-bold px-3">
        {isLoading ? <div className="h-8 w-1/2 bg-gray-200 rounded mb-2 animate-pulse" /> : name}
      </h2>

      <section className="px-3 pt-5">
        <h3 className="text-xl font-bold mb-2">Campaign Performance Overview</h3>
        <p className="text-gray-600 mb-6">
          Key metrics for this campaign. Values update in real time.
        </p>
        <div className="flex flex-wrap gap-4 mb-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <KPICardSkeleton key={i} />)
            : kpiList.map((kpi) => (
                <KPICard key={kpi.label} label={kpi.label} value={kpi.value} />
              ))}
        </div>
      </section>

      <section className="px-3 pb-5">
        <h3 className="text-xl font-semibold mb-2">Campaign Details</h3>
        {isLoading ? (
          <CampaignCardSkeleton />
        ) : (
          <div className={`p-4 rounded border cursor-pointer hover:bg-gray-100 transition-all min-w-[240px] w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]  border-gray-300`}>
            <div className="flex justify-between items-center">
              <span className="font-bold mr-2">{name}</span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  STATUS_MAP[status as keyof typeof STATUS_MAP] || "bg-gray-100"
                }`}
              >
                {status}
              </span>
            </div>
            <div className="mt-2 flex gap-2 items-center flex-wrap">
              <span className="text-xs text-gray-400">
                {created_at ? `Created ${dayjs(created_at).format("MMM DD, YYYY")}` : "No creation date"}
              </span>
              {platforms?.length > 0 && (
                <div className="ml-2 flex gap-1 items-center">
                  {renderPlatforms(platforms)}
                </div>
              )}
            </div>
            <div className="flex gap-4 items-center mt-2">
              <div>
                <span className="text-gray-500">Budget:</span> ${budget.toLocaleString()}
              </div>
              <div>
                <span className="text-gray-500">Daily:</span> ${daily_budget.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CampaignDetails;