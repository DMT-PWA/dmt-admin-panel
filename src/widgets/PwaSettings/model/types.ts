import { SelectValueProp } from "src/shared/types";

export type Keitaro = SelectValueProp & {
  keitaroDomain: string;
  keitaroCampaign: string;
  keitaroCampaignId: number;
  keitaroCampaignName: string;
  keitaroState: string;
};

export type Settings = {
  marketerTag: SelectValueProp | null;
  domainApp: SelectValueProp | null;
  domainLanding: SelectValueProp | null;
  whitePage: SelectValueProp | null;
  currentCampaign: Keitaro | null;
  currentCampaignId: string | null;
  subdomain: string | null;
  campaigns: Array<Keitaro> | null;
};
