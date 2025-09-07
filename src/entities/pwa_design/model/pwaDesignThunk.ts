import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import {
  getDesignInfo,
  getPwaInfo,
  IDesign,
  IPwaInfo,
} from "src/shared/api/design";
import {
  ErrorType,
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
