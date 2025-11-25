// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
// import { CampaignList, CampaignDetails, InsightsOverview, RealTimeMetrics } from "./components/campaign";

const queryClient = new QueryClient();
const App = () => {
  // const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};


export default App
