import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { DashboardLayout } from "./components/campaign/main-layout";
import CampaignList from "./components/campaign";
import { InsightsOverview } from "./components/campaign/insights-overview";
import { CampaignDetails } from "./components/campaign/campaign-details";
import { RealTimeMetrics } from "./components/campaign/real-time-metrices";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { CampaignList, CampaignDetails, InsightsOverview, RealTimeMetrics } from "./components/campaign";

const queryClient = new QueryClient();
const App = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
    <DashboardLayout>
      <InsightsOverview />
      <CampaignList onSelect={setSelectedCampaign} />
      {/* {selectedCampaign && (
        <>
          <CampaignDetails id={selectedCampaign} />
          <RealTimeMetrics id={selectedCampaign} />
        </>
      )} */}
    </DashboardLayout>
    </QueryClientProvider>
  );
};


export default App
