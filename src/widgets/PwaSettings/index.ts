export { PwaSettings } from "./ui/PwaSettings";
export {
  default as settingsReducer,
  updateSettingField,
  setExistsCampaign,
} from "./model/settingsSlice";

export {
  updateSettings,
  getAllCampaigns,
  verifyCustomDomain,
} from "./model/settingsThunk";

export type { Settings } from "./model/types";
