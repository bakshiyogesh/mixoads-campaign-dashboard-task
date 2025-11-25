import { createBrowserRouter } from "react-router-dom";
import { CampaignDashboard } from "./components/campaign/dashboard";
import { CampaignDetails } from "./components/campaign/campaign-details";
import { NotFoundPage } from "./components/NotFound";
import { DashboardLayout } from "./components/campaign/main-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <CampaignDashboard />
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
