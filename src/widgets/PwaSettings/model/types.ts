import { SelectValueProp } from "src/shared/types";

export type Keitaro = SelectValueProp & {
  keitaroDomain: string;
  keitaroCampaign: string;
  keitaroCampaignId: number;
  keitaroCampaignName: string;
  keitaroState: string;
};

type SettingNames = "marketerTag" | "domainApp" | "domainLanding" | "whitePage";

export type Settings = Record<SettingNames, SelectValueProp> & {
  currentCampaign: Keitaro | null;
  currentCampaignId: string | null;
  subdomain: string | null;
  campaigns: Array<Keitaro> | null;
};
