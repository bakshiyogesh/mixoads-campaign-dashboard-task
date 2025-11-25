import { Outlet } from "react-router-dom"
import { CampaignList } from "./campaign-list"
import { InsightsOverview } from "./insights-overview"

export const CampaignDashboard:React.FC=()=>{
    return(
      <div className="min-h-screen bg-gray-50">
        <InsightsOverview />
        <CampaignList  />
        <Outlet/>
    </div>
    )
}