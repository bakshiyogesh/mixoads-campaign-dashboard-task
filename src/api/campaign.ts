export async function fetchCampaigns() {
    return fetch('/campaigns').then(res => res.json());
}

export async function fetchCampaignDetails(id: string) {
    return fetch(`/campaigns/${id}`).then(res => res.json());
}

export async function fetchCampaignInsights() {
    return fetch('/campaigns/insights').then(res => res.json());
}

export async function fetchInsightsForCampaign(id: string) {
    return fetch(`/campaigns/${id}/insights`).then(res => res.json());
}
