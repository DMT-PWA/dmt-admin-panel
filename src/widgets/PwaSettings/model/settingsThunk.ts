import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { ValidationResponse } from "src/shared/types";
import { Keitaro } from "./types";

export const getAllCampaigns = createAsyncThunk<
  Array<Omit<Keitaro, "value" | "label">>
>("settings/getAllCampaigns", async () => {
  const resp: Array<Omit<Keitaro, "value" | "label">> = await apiInstance.get(
    "campaign/get-updated-campaigns"
  );

  return resp;
});

export const verifyCustomDomain = createAsyncThunk<
  ValidationResponse,
  { domain: string; subDomain: string }
>("settings/verifyCustomDomain", async (payload) => {
  return await apiInstance.post("/pwa/verifySubdomain", {
    domain: payload.domain,
    subDomain: payload?.subDomain,
  });
});
