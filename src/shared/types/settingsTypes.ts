export type Domain = { value: number; label: string } | null;

export type Keitaro = {
  value: number;
  label: string;
  keitaroDomain: string;
  keitaroCampaign: string;
  keitaroCampaignId: number;
  keitaroCampaignName: string;
  keitaroState: string;
} | null;

export type KeitaroProps = {
  keitaroDomain: string;
  keitaroCampaign: string;
  keitaroCampaignId: number;
  keitaroCampaignName: string;
  keitaroState: string;
} | null;

export type WhitePageProps = { value: number; label: string } | null;
