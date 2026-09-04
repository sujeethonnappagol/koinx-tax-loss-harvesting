import { mockHoldings, capitalGainsResponse, Holding, CapitalGains } from "../data/mockData";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchHoldings(): Promise<Holding[]> {
  await delay(600);
  // Simulate occasional network hiccup (disabled for reliability)
  // if (Math.random() < 0.05) throw new Error("Failed to fetch holdings");
  return [...mockHoldings];
}

export async function fetchCapitalGains(): Promise<{
  capitalGains: {
    stcg: { profits: number; losses: number };
    ltcg: { profits: number; losses: number };
  };
}> {
  await delay(400);
  return JSON.parse(JSON.stringify(capitalGainsResponse));
}
