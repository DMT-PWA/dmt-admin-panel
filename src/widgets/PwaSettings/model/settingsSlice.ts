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

    /* setExistsCampaign: (state, action) => {
      state.currentCampaign = state.campaigns.find(
        (item) => item.keitaroCampaignId === action.payload.keitaroCampaignId
      );
    }, */
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
        if (action.payload.keitaroCampaignId) {
          state.currentCampaignId = action.payload.keitaroCampaignId;
        }

        if (state.currentCampaignId) {
          const campaign = state.campaigns?.find(
            (item) => item.keitaroCampaignId === Number(state.currentCampaignId)
          );

          if (campaign) {
            state.currentCampaign = campaign;
          }
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
