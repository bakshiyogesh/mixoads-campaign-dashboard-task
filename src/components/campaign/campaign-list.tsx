import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState,  } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import dayjs from "dayjs";
import { CampaignCardSkeleton } from "../skelton/campaign";

// const platformNames: Record<string, string> = {
//   meta: "Meta",
//   google: "Google",
//   linkedin: "LinkedIn",
//   youtube: "YouTube",
//   instagram: "Instagram",
//   email: "Email",
//   "multi-platform": "Multi-platform",
// };
export const CampaignList: React.FC<{ onSelect: (id: string) => void, selectedId?: string }> = ({ onSelect, selectedId }) => {

//   const [campaigns, setCampaigns] = useState([]);

    const {data,isPending}=useQuery({
        queryKey:["campaigns"],
        queryFn:async()=>{
            const res=await axiosInstance.get("/campaigns")
            return res
        },
        select:(data)=>data?.data?.campaigns
    })
    // console.log({data,isPending});
    
  

// console.log({campaigns});

  return (
    // <ul className="p-4 space-y-2 bg-white shadow rounded">
    //   {data?.map((c: any) => (
    //     <li
    //       key={c.id}
    //       onClick={() => onSelect(c.id)}
    //       className={`p-4 rounded border cursor-pointer hover:bg-gray-100 transition-all ${
    //         selectedId === c.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
    //       }`}
    //     >
    //       <div className="flex justify-between items-center">
    //         <span className="font-bold">{c.name}</span>
    //         <span className={`px-2 py-1 rounded text-xs font-semibold ${
    //           c.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
    //         }`}>
    //           {c.status}
    //         </span>
    //       </div>
    //       <div className="flex gap-4 items-center mt-2">
    //         <div><span className="text-gray-500">Budget:</span> ${c.budget.toLocaleString()}</div>
    //         <div><span className="text-gray-500">Daily:</span> ${c.daily_budget}</div>
    //         <div className="flex gap-1">
    //           {c.platforms.map((p: string) => (
    //             <span key={p} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{platformNames[p] || p}</span>
    //           ))}
    //         </div>
    //         <div className="ml-auto text-xs text-gray-400">
    //           Created {dayjs(c.created_at).format('MMM DD, YYYY')}
    //         </div>
    //       </div>
    //     </li>
    //   ))}
    // </ul>
    <div className="flex flex-wrap gap-4">
      {isPending
        ? Array.from({ length: 6 }).map((_, i) => <CampaignCardSkeleton key={i} />)
        : data?.map((c: any) => (
            <div
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`p-4 rounded border cursor-pointer hover:bg-gray-100 transition-all min-w-[240px] w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] ${selectedId === c.id ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{c.name}</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  c.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}>{c.status}</span>
              </div>
              <div className="mt-2 flex gap-2 items-center flex-wrap">
                <span className="text-xs text-gray-400">
                  Created {dayjs(c.created_at).format('MMM DD, YYYY')}
                </span>
                <div className="ml-2 flex gap-1 items-center">
                  {renderPlatforms(c.platforms)}
                </div>
              </div>
              <div className="flex gap-4 items-center mt-2">
                <div><span className="text-gray-500">Budget:</span> ${c.budget.toLocaleString()}</div>
                <div><span className="text-gray-500">Daily:</span> ${c.daily_budget}</div>
              </div>
            </div>
          ))
      }
    </div>

  );
};

const renderPlatforms = (platforms: string[]) => {
  const maxDisplay = 3;
  const visible = platforms.slice(0, maxDisplay);
  const hiddenCount = platforms.length - maxDisplay;
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
