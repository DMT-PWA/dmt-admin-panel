export { PwaSettings } from "./ui";
export {
  default as settingsReducer,
  updateSettingField,
  setExistsCampaign,
} from "./model/settingsSlice";

export { updateSettings, getAllCampaigns } from "./model/settingsThunk";

export type { Settings } from "./model/types";
