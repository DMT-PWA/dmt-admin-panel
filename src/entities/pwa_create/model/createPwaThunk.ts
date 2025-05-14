import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { updatePwa } from "src/shared/api/create";
import {
  CreateInitPayload,
  UpdatePwaPayload,
  UpdatePwaResponse,
} from "./types";
import { AxiosRequestConfig } from "axios";

export const updatePwaByLang = createAsyncThunk<
  UpdatePwaResponse,
  Partial<UpdatePwaPayload>
>("create/updatePwaByLang", async (payload) => {
  const response = await updatePwa("pwa", payload);

  return response;
});

export const getPwaById = createAsyncThunk<UpdatePwaPayload, string>(
  "create/getPwaById",
  async (id) => {
    const response = await apiInstance.get<UpdatePwaPayload>(`pwa/${id}`);

    return response;
  }
);

export const finishCreatePWA = createAsyncThunk<unknown, CreateInitPayload>(
  "create/createPWA",
  async (payload, { getState }) => {
    const {
      comments,
      metrics,
      pwa_description,
      pwa_design,
      collections,
      settings,
    } = getState() as RootState;

    const { pwa_title, pwa_tags } = pwa_design;

    const {
      title,
      developer_name,
      checkboxes_state,
      about_description,
      raiting,
      number_of_downloads,
      review_count,
    } = pwa_description;

    const { selected_comment } = comments;

    const { facebookPixelList } = metrics;

    const { currentCollection } = collections;

    const { domainApp, subdomain, currentCampaign } = settings;

    const {
      android_version,
      description,
      last_update,
      release_date,
      version,
      whats_new,
    } = about_description;

    const fullPayload = {
      ...payload,
      isExist: true,
      appTitle: title,
      appSubTitle: developer_name,
      displayName: pwa_title,
      collectionId: currentCollection?._id,
      commentId: selected_comment,
      domain: domainApp?.value,
      subDomain: subdomain,
      pixelId: facebookPixelList[0].pixel,
      accessToken: facebookPixelList[0].token,
      domainApp: `https://www.${subdomain}.${domainApp?.value}`,
      domainLanding: `https://www.app-${subdomain}.${domainApp?.value}`,
      keitaroDomain: currentCampaign?.keitaroDomain,
      keitaroCampaign: currentCampaign?.keitaroCampaign,
      keitaroCampaignId: currentCampaign?.keitaroCampaignId,
      marketerTag: pwa_tags,
      oneSignalApiKey: "",
      oneSignalAppId: "",
      lastUpdate: last_update,
      releaseDate: release_date,
      downloadsCount: number_of_downloads,
      androidVersion: android_version,
      about: description,
      rating: raiting,
      reviewCount: review_count,
      isContainsAds: checkboxes_state[0].value,
      isEditorsChoice: checkboxes_state[1].value,
      isInAppPurchases: checkboxes_state[2].value,
      version,
      newFeatures: whats_new,
      updatedDate: last_update,
    };

    const response = await apiInstance.post("pwa", fullPayload);

    return response;
  }
);

export const createRenderService = createAsyncThunk<
  unknown,
  Partial<UpdatePwaPayload> & { domain: string }
>("create/createRenderService", async (payload) => {
  const response = await apiInstance.post(
    "render",
    payload as AxiosRequestConfig<Partial<UpdatePwaPayload>>
  );

  return response;
});
