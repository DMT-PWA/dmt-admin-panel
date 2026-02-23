import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { CombinedDescription } from "src/entities/pwa_description";
import { ICommentsState } from "src/entities/comments";
import {
  IDescriptionAbout,
  ICollection,
  AppDataProps,
  LanguagesListValue,
} from "src/shared/types";
import { IAppCommon } from "src/shared/types/app.types";
import { adminId } from "src/shared/lib/data";

export const finishCreatePWA = createAsyncThunk<
  AppDataProps,
  {
    payload: IAppCommon | Omit<IAppCommon, "appId">;
    languagesData: {
      language: LanguagesListValue | null;
      value: {
        descriptionState: Partial<CombinedDescription>;
        commentState: Partial<ICommentsState>;
        collectionState: ICollection | null;
      };
    }[];
  },
  {
    state: RootState;
  }
>(
  "create/createPWA",
  async ({ payload, languagesData }, { getState, rejectWithValue }) => {
    const { metrics, pwa_design, settings } = getState();

    const { pwa_title, pwa_tags } = pwa_design;

    const { facebookPixelList } = metrics;

    const { domainApp, subdomain, currentCampaign } = settings;

    const { title, developer_name } = languagesData[0].value.descriptionState;

    const fullPayload = {
      ...payload,
      isExist: true,
      appTitle: title,
      appSubTitle: developer_name,
      displayName: pwa_title,
      domain: domainApp?.value,
      subDomain: subdomain,
      pixelId: facebookPixelList[0].pixel,
      accessToken: facebookPixelList[0].token,
      domainApp: `https://${subdomain}.${domainApp?.value}`,
      keitaroDomain: currentCampaign?.keitaroDomain,
      keitaroCampaign: currentCampaign?.keitaroCampaign,
      keitaroCampaignId: currentCampaign?.keitaroCampaignId,
      marketerTag: pwa_tags,
      oneSignalApiKey: "",
      oneSignalAppId: "",
      languageList: languagesData.map((el, ind) => {
        const {
          checkboxes_state,
          about_description,
          raiting,
          number_of_downloads,
          review_count,
        } = el.value.descriptionState;

        const {
          android_version,
          description,
          last_update,
          release_date,
          version,
          whats_new,
        } = about_description as IDescriptionAbout;

        const currentCollection = el.value.collectionState;

        const { selected_comment } = el.value.commentState;

        return {
          label: el.language?.en,
          value: el.language?.id,
          isDefault: ind === 0 ? true : false,
          info: {
            updatedDate: last_update,
            isExist: true,
            collectionId: currentCollection?._id,
            commentId: selected_comment,
            about: description,
            isContainsAds: checkboxes_state?.[0].value,
            isEditorsChoice: checkboxes_state?.[1].value,
            isInAppPurchases: checkboxes_state?.[2].value,
            version,
            lastUpdate: last_update,
            releaseDate: release_date,
            downloadsCount: number_of_downloads,
            androidVersion: android_version,
            rating: raiting,
            reviewCount: review_count,
            newFeatures: whats_new,
          },
        };
      }),
    };

    try {
      return await apiInstance.post("pwa", fullPayload);
    } catch (error) {
      alert(`${error.response.data.message}`);
      return rejectWithValue(error);
    }
  }
);

export const fetchPwaUpdate = createAsyncThunk<
  AppDataProps,
  {
    id: string;
    currentState: {
      descriptionState: Partial<CombinedDescription>;
      commentState: Partial<ICommentsState>;
      collectionState: ICollection | null;
    };
  },
  { state: RootState }
>("pwa/updatePwa", async (payload, { getState }) => {
  const { pwa_design, settings, metrics } = getState();

  const { descriptionState, commentState, collectionState } =
    payload.currentState;

  const { domainApp, subdomain, currentCampaign } = settings;

  const { facebookPixelList } = metrics;

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

  if (!collectionState) return;

  const { _id } = collectionState;

  const { currentLanguage, pwa_tags, pwa_title } = pwa_design;
  const modifiedPayload = {
    appId: payload.id,
    adminId,
    appTitle: title,
    appSubTitle: developer_name,
    displayName: pwa_title,
    domain: domainApp?.value,
    subDomain: subdomain,
    language: currentLanguage?.en,
    about: about_description?.description,
    commentId: selected_comment,
    collectionId: _id,
    updatedDate: about_description?.last_update,
    isExist: true,
    isContainsAds: checkboxes_state?.[0].value,
    isEditorsChoice: checkboxes_state?.[1].value,
    isInAppPurchases: checkboxes_state?.[2].value,
    version: about_description?.version,
    lastUpdate: about_description?.last_update,
    releaseDate: about_description?.release_date,
    downloadsCount: number_of_downloads,
    androidVersion: about_description?.android_version,
    rating: raiting,
    reviewCount: review_count,
    newFeatures: about_description?.whats_new,
    pixelId: facebookPixelList[0].pixel,
    accessToken: facebookPixelList[0].token,
    keitaroDomain: currentCampaign?.keitaroDomain,
    keitaroCampaign: currentCampaign?.keitaroCampaign,
    keitaroCampaignId: currentCampaign?.keitaroCampaignId,
    marketerTag: pwa_tags,
    domainApp: `https://${subdomain}.${domainApp?.value}`,
  };

  return await apiInstance.patch("pwa", modifiedPayload);
});

export const createRenderService = createAsyncThunk<
  unknown,
  Pick<IAppCommon, "adminId" | "appId"> & { domain?: string }
>("create/createRenderService", async (payload) => {
  const response = await apiInstance.post("cloudflare", { ...payload });

  return response;
});
