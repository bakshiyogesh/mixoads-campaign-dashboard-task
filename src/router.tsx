import { lazy, Suspense } from 'react';
import { createBrowserRouter } from "react-router-dom";
import { CampaignDashboard } from "./components/campaign/dashboard";
import { NotFoundPage } from "@/components/NotFound";
import { DashboardLayout } from "@/components/campaign/main-layout";

const CampaignDetails = lazy(() => import('@/components/campaign/campaign-details'));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<CampaignDashboard />}>
          <CampaignDashboard />
        </Suspense>
      },
      {
        path: "campaign/:id",
        element: <CampaignDetails />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
