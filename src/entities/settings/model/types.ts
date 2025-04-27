import { SelectValueProp } from "src/shared/types";

export type Settings = {
  marketerTag: SelectValueProp | null;
  domainApp: SelectValueProp | null;
  domainLanding: SelectValueProp | null;
  whitePage: SelectValueProp | null;
  naming: SelectValueProp | null;
  subdomain: string | null;
};
