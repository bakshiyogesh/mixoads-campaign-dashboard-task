import { useQuery } from "@tanstack/react-query";
import React, { useState, } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import dayjs from "dayjs";
import { CampaignCardSkeleton } from "../skelton/campaign";
import { useNavigate } from "react-router-dom";
import { STATUS_MAP } from "../../constants";
import type { Campaign } from "./types";

const statusTabs = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Paused", value: "paused" },
    { label: "Completed", value: "completed" },
];



const campaignInitialValues = { id: "", name: "", status: "", platforms: [], budget: 0, daily_budget: 0, created_at: "" };

export const CampaignList: React.FC<{}> = () => {
    const [currentTab, setCurrentTab] = useState("all");
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(campaignInitialValues);
    const navigate = useNavigate();
    const { data, isPending } = useQuery({
        queryKey: ["campaigns"],
        queryFn: async () => {
            const res = await axiosInstance.get("/campaigns")
            return res
        },
        select: (data) => data?.data?.campaigns
    })


    const filteredCampaigns = React.useMemo(
        () =>
            currentTab === "all"
                ? data
                : data?.filter((c: any) => c.status === currentTab),
        [currentTab, data]
    );


    return (
       
        <section className="px-6 pb-8">
            <h2 className="text-xl font-semibold mb-2">Campaigns</h2>
            <p className="text-gray-600 mb-6">
                Explore all ongoing, paused, and completed ad campaigns below. Click any card to see more details.
            </p>
            <div>
                <div className="flex gap-2 mb-4">
                    {statusTabs.map((tab) => (
                        <button
                            key={tab.value}
                            className={`px-4 py-2 rounded font-medium ${currentTab === tab.value ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                                }`}
                            onClick={() => setCurrentTab(tab.value)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="flex flex-wrap gap-4">
                    {isPending
                        ? Array.from({ length: 8 }).map((_, i) => <CampaignCardSkeleton key={i} />)
                        : filteredCampaigns?.map((c: any,) => <div
                            key={c.id}
                            onClick={() => {
                                setSelectedCampaign(c)
                                navigate(`/campaign/${c?.id}`)
                            }}
                            className={`p-4 rounded border cursor-pointer hover:bg-gray-100 transition-all min-w-[240px] w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] ${selectedCampaign.id === c.id ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-bold">{c?.name}</span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_MAP[c?.status as keyof typeof STATUS_MAP]}`}>{c?.status}</span>
                            </div>
                            <div className="mt-2 flex gap-2 items-center flex-wrap">
                                <span className="text-xs text-gray-400">
                                    Created {dayjs(c?.created_at).format('MMM DD, YYYY')}
                                </span>
                                <div className="ml-2 flex gap-1 items-center">
                                    {renderPlatforms(c?.platforms)}
                                </div>
                            </div>
                            <div className="flex gap-4 items-center mt-2">
                                <div><span className="text-gray-500">Budget:</span> ${c?.budget.toLocaleString()}</div>
                                <div><span className="text-gray-500">Daily:</span> ${c?.daily_budget}</div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </section>


    );
};

export const renderPlatforms = (platforms: string[]) => {
    const maxDisplay = 3;
    const visible = platforms?.slice(0, maxDisplay);
    const hiddenCount = platforms?.length - maxDisplay;
    return (
        <>
            {visible.map((p) => (
                <span key={p} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs ml-1">{p}</span>
            ))}
            {hiddenCount > 0 && (
                <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs ml-1">+{hiddenCount} more</span>
            )}
        </>
    );
};
