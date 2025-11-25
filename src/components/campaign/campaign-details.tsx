
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import { KPICardSkeleton } from "../skelton/kpi";
import { KPICard } from "./kpi-card";
import { renderPlatforms } from "./campaign-list";
import dayjs from "dayjs";
import { CampaignCardSkeleton } from "../skelton/campaign";
import useLiveCampaignMetrics from "../../hooks/useLiveCampaignMetrics"; // SSE hook
import { STATUS_MAP } from "../../constants";

export const CampaignDetails: React.FC = () => {
    const { id = "" } = useParams();

    const { data: campaign, isPending: campaignPending } = useQuery({
        queryKey: ["campaign-with-id", id],
        queryFn: async () => (await axiosInstance.get(`/campaigns/${id}`)).data?.campaign,
        enabled: !!id,
    });

    const { data: insights, isPending: insightsPending } = useQuery({
        queryKey: ["campaign-insights", id],
        queryFn: async () => (await axiosInstance.get(`/campaigns/${id}/insights`)).data?.insights,
        enabled: !!id,
    });

    const { metrics: liveMetrics, } = useLiveCampaignMetrics(id);

    const kpiList = [
        {
            label: "Impressions",
            value: liveMetrics?.impressions?.toLocaleString() ||
                insights?.impressions?.toLocaleString() || "N/A",
        },
        {
            label: "Clicks",
            value: liveMetrics?.clicks?.toLocaleString() ||
                insights?.clicks?.toLocaleString() || "N/A",
        },
        {
            label: "Conversions",
            value: liveMetrics?.conversions?.toLocaleString() ||
                insights?.conversions?.toLocaleString() || "N/A",
        },
        {
            label: "Spend",
            value: liveMetrics?.spend
                ? `$${liveMetrics?.spend.toLocaleString()}`
                : insights?.spend
                    ? `$${insights.spend.toLocaleString()}`
                    : "N/A",
        },
        {
            label: "CTR",
            value: liveMetrics?.ctr
                ? `${liveMetrics?.ctr}%`
                : insights?.ctr
                    ? `${insights.ctr}%`
                    : "N/A",
        },
        {
            label: "CPC",
            value: liveMetrics?.cpc
                ? `$${liveMetrics?.cpc}`
                : insights?.cpc
                    ? `$${insights.cpc}`
                    : "N/A",
        },
        {
            label: "Conversion Rate",
            value: liveMetrics?.conversion_rate
                ? `${liveMetrics?.conversion_rate}%`
                : insights?.conversion_rate
                    ? `${insights.conversion_rate}%`
                    : "N/A",
        },
    ];

    const {
        status = "",
        platforms = [],
        daily_budget = 0,
        budget = 0,
        created_at = "",
        name = "",
    } = campaign || {};

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-bold">{name || <div className="h-4 w-1/2 bg-gray-200 rounded mb-2 animate-pulse"></div>}</h2>

            <section className="px-6 pt-8">
                <h3 className="text-2xl font-bold mb-2">Campaign Performance Overview</h3>
                <p className="text-gray-600 mb-6">
                    Key metrics for this campaign. Values update in real time.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                    {campaignPending || insightsPending
                        ? Array.from({ length: 6 }).map((_, i) => <KPICardSkeleton key={i} />)
                        : kpiList.map((kpi) => (
                            <KPICard key={kpi.label} label={kpi.label} value={kpi.value} />
                        ))}
                </div>
            </section>

            <section className="px-6 pb-8">
                <h3 className="text-xl font-semibold mb-2">Campaign Details</h3>
                {campaignPending || insightsPending ? <CampaignCardSkeleton /> : <div className="flex flex-wrap gap-4">
                    <div className="p-4 rounded border min-w-[240px]">
                        <div className="flex justify-between items-center">
                            <span className="font-bold mr-2">{name}</span>
                            <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_MAP[status as keyof typeof STATUS_MAP]}`}
                            >
                                {status}
                            </span>
                        </div>
                        <div className="mt-2 flex gap-2 items-center flex-wrap">
                            <span className="text-xs text-gray-400">
                                Created {created_at && dayjs(created_at).format("MMM DD, YYYY")}
                            </span>
                            <div className="ml-2 flex gap-1 items-center">
                                {renderPlatforms(platforms)}
                            </div>
                        </div>
                        <div className="flex gap-4 items-center mt-2">
                            <div>
                                <span className="text-gray-500">Budget:</span> ${budget.toLocaleString()}
                            </div>
                            <div>
                                <span className="text-gray-500">Daily:</span> ${daily_budget}
                            </div>
                        </div>
                    </div>
                </div>}
            </section>
        </div>
    );
};

