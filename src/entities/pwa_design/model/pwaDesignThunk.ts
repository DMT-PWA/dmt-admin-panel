import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import {
  getDesignInfo,
  getPwaInfo,
  IDesign,
  IPwaInfo,
} from "src/shared/api/design";
import {
  AppDataProps,
  ErrorType,
  LanguagesListValue,
  RejectedDataType,
  ValidationResponse,
} from "src/shared/types";

export const fetchDesignInfo = createAsyncThunk<IDesign[]>(
  "posts",
  async () => {
    const response = await getDesignInfo("posts");

    return response;
  }
);

export const fetchPwaInfo = createAsyncThunk<IPwaInfo[]>(
  "design/fetchPwaInfo",
  async () => {
    const response = await getPwaInfo(
      "678fc03a2fc8dd36b0598db8",
      "English",
      "Malaysia"
    );

    return response;
  }
);
export const validatePwaDisplayName = createAsyncThunk<
  ValidationResponse,
  string,
  { readonly rejectValue: RejectedDataType }
>("design/validatePwaDisplayName", async (name, { rejectWithValue }) => {
  try {
    return await apiInstance.post("pwa/validatePwaDisplayName", {
      displayName: name,
    });
  } catch (e: unknown) {
    const knownErr = e as ErrorType;

    return rejectWithValue({
      messageError: knownErr.message,
    });
  }
});

export const validateCollectionName = createAsyncThunk<
  ValidationResponse,
  string
>(
  "collection/validateCollectionName",
  async (name) => await apiInstance.post("collection/validate-name", { name })
);

export const fetchCountries = createAsyncThunk<
  Array<Omit<LanguagesListValue, "short">>
>("design/allCountries", async () => await apiInstance.get("pwa/allCountries"));

export const fetchLanguages = createAsyncThunk("pwa/allLanguages", async () => {
  const languagesResponse: Array<LanguagesListValue> = await apiInstance.get(
    "pwa/allLanguages"
  );

  /* if (!isEdit) {
      const data: AppDataProps = await apiInstance.get(
        "pwa/fetchPWAContent/:language".replace(":language", "english")
      );
      return { languagesResponse, data };
    } */

  return { languagesResponse };
});

export const fetchPreviewContent = createAsyncThunk<AppDataProps, string>(
  "pwa/previewContent",
  async (lang) =>
    await apiInstance.get(
      "pwa/fetchPWAContent/:language".replace(":language", lang)
    )
);
