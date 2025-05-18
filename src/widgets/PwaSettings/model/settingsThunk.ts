import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdatePwaPayload } from "src/shared/types/createTypes";
import { updatePwa } from "src/shared/api/create";
import { UpdatePwaResponse } from "src/entities/pwa_create";
import { apiInstance } from "src/shared/api/base";

export const updateSettings = createAsyncThunk<
  UpdatePwaPayload,
  Partial<UpdatePwaPayload>
>("settings/updateSettings", async (payload, { getState }) => {
  const state = getState() as RootState;

  const { domainApp, currentCampaign, whitePage, subdomain } = state.settings;

  const {
    keitaroDomain,
    keitaroCampaign,
    keitaroCampaignId,
    keitaroCampaignName,
    keitaroState,
  } = currentCampaign;

  const fullPayload = {
    ...payload,
    domain: domainApp?.value,
    subDomain: subdomain,
    domainApp: `https://www.${subdomain}.${domainApp?.value}`,
    domainLanding: `https://www.app-${subdomain}.${domainApp?.value}`,
    keitaroCampaign,
    keitaroDomain,
    keitaroCampaignId,
    keitaroCampaignName,
    keitaroState,
  };

  const response = await updatePwa("pwa", fullPayload);

  return response as UpdatePwaPayload;
});

export const getAllCampaigns = createAsyncThunk(
  "settings/getAllCampaigns",
  async () => {
    const resp = await apiInstance.get("campaign/get-updated-campaigns");

    return resp;
  }
);
