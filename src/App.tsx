
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './App.css'
import { ErrorBoundary } from './components/ErrorBoundary';
import { Suspense } from 'react';
import { CampaignDashboard } from './components/campaign/dashboard';

const queryClient = new QueryClient();
const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={<CampaignDashboard />}>
        <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};


export default App
