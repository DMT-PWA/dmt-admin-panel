import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { UpdatePwaPayload } from "./types";
import { CombinedDescription } from "src/entities/pwa_description";
import { ICommentsState } from "src/entities/comments";
import { IDescriptionAbout, ICollection, AppDataProps } from "src/shared/types";
import { IAppCommon } from "src/shared/types/app.types";

export const getPwaById = createAsyncThunk<UpdatePwaPayload, string>(
  "create/getPwaById",
  async (id) => {
    const response: UpdatePwaPayload = await apiInstance.get(`pwa/${id}`);

    return response;
  }
);
export const finishCreatePWA = createAsyncThunk<
  AppDataProps,
  {
    payload: IAppCommon | Omit<IAppCommon, "appId">;
    descriptionState: Partial<CombinedDescription>;
    commentState: Partial<ICommentsState>;
    collectionState: ICollection | null;
  },
  {
    state: RootState;
  }
>(
  "create/createPWA",
  async (
    { payload, collectionState, commentState, descriptionState },
    { getState }
  ) => {
    const { metrics, pwa_design, settings } = getState();

    const { pwa_title, pwa_tags } = pwa_design;

    const {
      title,
      developer_name,
      checkboxes_state,
      about_description,
      raiting,
      number_of_downloads,
      review_count,
    } = descriptionState;

    const { selected_comment } = commentState;

    const { facebookPixelList } = metrics;

    const currentCollection = collectionState;

    const { domainApp, subdomain, currentCampaign } = settings;

    const {
      android_version,
      description,
      last_update,
      release_date,
      version,
      whats_new,
    } = about_description as IDescriptionAbout;

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
      isContainsAds: checkboxes_state?.[0].value,
      isEditorsChoice: checkboxes_state?.[1].value,
      isInAppPurchases: checkboxes_state?.[2].value,
      version,
      newFeatures: whats_new,
      updatedDate: last_update,
    };

    if ("appId" in payload) {
      return await apiInstance.patch("pwa", fullPayload);
    } else {
      return await apiInstance.post("pwa", fullPayload);
    }
  }
);

export const createRenderService = createAsyncThunk<
  unknown,
  Pick<IAppCommon, "adminId" | "appId"> & { domain?: string }
>("create/createRenderService", async (payload) => {
  const response = await apiInstance.post("render", { ...payload });

  return response;
});
