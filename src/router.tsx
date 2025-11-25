import { lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";
import { CampaignDashboard } from "@/components/campaign/dashboard";
import { NotFoundPage } from "@/components/NotFound";
import MainLayout from "@/components/layout/main-layout";

const CampaignDetails = lazy(() => import('@/components/campaign/campaign-details'));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        index: true,
        element: <CampaignDashboard />
      },
      {
        path: "campaign/:id",
        element: <CampaignDetails />
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
