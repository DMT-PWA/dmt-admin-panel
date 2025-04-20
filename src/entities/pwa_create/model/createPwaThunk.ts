import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { updatePwa, getPwa } from "src/shared/api/create";

import {
  CreateInitPayload,
  UpdatePwaPayload,
  UpdatePwaResponse,
} from "./types";

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

export const finishCreatePWA = createAsyncThunk<any, CreateInitPayload>(
  "create/createPWA",
  async (payload, { getState }) => {
    const { comments, metrics, pwa_description, pwa_design, collections } =
      getState() as RootState;

    const { pwa_title } = pwa_design;

    const { descriptionId, title, developer_name } = pwa_description;

    const { selected_comment } = comments;

    const { facebookPixelList } = metrics;

    const { currentCollection } = collections;

    const fullPayload = {
      ...payload,
      isExist: true,
      appTitle: title,
      appSubTitle: developer_name,
      displayName: pwa_title,
      collectionId: currentCollection?._id,
      about: descriptionId,
      commentId: selected_comment,
      domain: "",
      subDomain: "",
      pixelId: facebookPixelList[0].pixel,
      accessToken: facebookPixelList[0].token,
      domainApp: "",
      domainLanding: "",
      keitaroDomain: "",
      keitaroCampaign: "",
      marketerTag: "",
      oneSignalApiKey: "",
      oneSignalAppId: "",
      casino: "",
      headerReviews: "",
      hundredPlus: "",
      aboutThisGame: "",
      updatedDate: "",
    };

    const response = await updatePwa("pwa", fullPayload);

    return response;
  }
);

export const getPwaByIdAndLanguage = createAsyncThunk(
  "create/getPwaByIdAndLanguage",
  async (payload: Partial<UpdatePwaPayload>) => {
    const response = await getPwa(
      `pwa/${payload.appId}/${payload.language}/${payload.country}`
    );

    return response;
  }
);
