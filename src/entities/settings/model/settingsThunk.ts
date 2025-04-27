import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdatePwaPayload } from "src/shared/types/createTypes";
import { updatePwa } from "src/shared/api/create";
import { UpdatePwaResponse } from "src/entities/pwa_create";

export const updateSettings = createAsyncThunk<
  UpdatePwaPayload,
  Partial<UpdatePwaPayload>
>("settings/updateSettings", async (payload, { getState }) => {
  const state = (getState() as RootState).settings;

  const { domainApp, domainLanding, naming, whitePage, subdomain } = state;

  const fullPayload = {
    ...payload,
    domain: domainApp?.value,
    subDomain: subdomain,
    domainApp: `${domainApp?.value}/${subdomain}`,
    domainLanding: `${domainApp?.value}/app-${subdomain}`,
    keitaroCampaign: naming?.value,
  };

  const response = await updatePwa("pwa", fullPayload);

  return response as UpdatePwaPayload;
});
