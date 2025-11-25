
export type Campaign = {
    id: string,
    name: string,
    status: string,
    platforms: string[],
    budget: number,
    daily_budget: number,
    created_at: string,
}

export interface CampaignMetrics {
  impressions?: number;
  clicks?: number;
  conversions?: number;
  spend?: number;
  ctr?: number;
  cpc?: number;
  conversion_rate?: number;
}
export interface CampaignDetailsProps {
  id: string;
}