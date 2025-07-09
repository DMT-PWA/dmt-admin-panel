export { PwaSettings } from "./ui/PwaSettings";
export {
  default as settingsReducer,
  updateSettingField,
} from "./model/settingsSlice";

export { getAllCampaigns, verifyCustomDomain } from "./model/settingsThunk";

export type { Settings } from "./model/types";
