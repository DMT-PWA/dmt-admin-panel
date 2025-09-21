import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Settings } from "./types";
import { UpdateFieldPayload } from "src/shared/lib/store";
import { getAllCampaigns } from "./settingsThunk";
import { getPwaById, getPwaByIdAndLanguage } from "src/shared/api/create";
import { domains } from "../lib/constants";

const initialState: Settings = {
  domainApp: null,
  domainLanding: null,
  marketerTag: null,
  whitePage: null,
  currentCampaign: null,
  currentCampaignId: null,
  subdomain: null,
  campaigns: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettingField: (
      state,
      action: PayloadAction<UpdateFieldPayload<Settings> | string>
    ) => {
      if (typeof action.payload !== "string") {
        const { field, value } = action.payload;

        state[field] = value as never;

        return;
      }

      state["subdomain"] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCampaigns.fulfilled, (state, action) => {
        state.campaigns = action.payload.map((item) => ({
          value: item.keitaroCampaignName,
          label: item.keitaroCampaignName,
          keitaroDomain: item.keitaroDomain,
          keitaroCampaign: item.keitaroCampaign,
          keitaroCampaignId: item.keitaroCampaignId,
          keitaroCampaignName: item.keitaroCampaignName,
          keitaroState: item.keitaroState,
        }));
      })
      .addCase(getPwaByIdAndLanguage.fulfilled, (state, action) => {
        const { keitaroCampaignId, domain, subDomain } = action.payload;

        if (keitaroCampaignId) {
          state.currentCampaignId = keitaroCampaignId;
        }

        if (state.currentCampaignId) {
          const campaign = state.campaigns?.find(
            (item) => item.keitaroCampaignId === Number(state.currentCampaignId)
          );

          if (campaign) {
            state.currentCampaign = campaign;
          }
        }

        if (subDomain) {
          state.subdomain = subDomain;
        }

        const newDomain = domains.find((el) => el.label === domain);

        if (newDomain) {
          state.domainApp = newDomain;
        }
      })
      .addCase(getPwaById.fulfilled, (state, action) => {
        const { domain, subDomain } = action.payload;

        const currentDomain = domains.find((item) => item?.value === domain);

        if (!currentDomain) return;

        state.domainApp = currentDomain;

        if (!subDomain) return;

        state.subdomain = subDomain;
      });
  },
});

export const { updateSettingField } = settingsSlice.actions;

export default settingsSlice.reducer;
