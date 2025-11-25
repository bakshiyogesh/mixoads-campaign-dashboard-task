import { CampaignList } from "@/components/campaign/campaign-list"
import { InsightsOverview } from "@/components/campaign/insights-overview"

export const CampaignDashboard:React.FC=()=>{
    return(
      <div className="min-h-screen bg-gray-50">
        <InsightsOverview />
        <CampaignList  />
    </div>
    )
}