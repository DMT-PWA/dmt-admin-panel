import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPwaById } from "src/shared/api/create";
import { IMetrics, FacebookPixelField } from "src/shared/types";

const initialState: IMetrics = {
  facebookPixelList: [{ id: 0, pixel: null, token: null }],
};

const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {
    addFacebookPixelField: (
      state,
      action: PayloadAction<FacebookPixelField>
    ) => {
      state.facebookPixelList.push(action.payload);
    },

    removeFacebookPixelField: (state, action: PayloadAction<number>) => {
      state.facebookPixelList = state.facebookPixelList.filter(
        (item, index) => index !== action.payload
      );
    },

    setPixelValue: (
      state,
      action: PayloadAction<{ id: number; value: string | number }>
    ) => {
      state.facebookPixelList[action.payload.id].pixel = action.payload.value;
    },

    setTokenValue: (
      state,
      action: PayloadAction<{ id: number; value: string | number }>
    ) => {
      state.facebookPixelList[action.payload.id].token = action.payload.value;
    },

    setRegistration: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(getPwaById.fulfilled, (state, action) => {
      const { accessToken, pixelId } = action.payload;

      state.facebookPixelList[0].pixel = pixelId;

      state.facebookPixelList[0].token = accessToken;
    });
  },
});

export const {
  addFacebookPixelField,
  removeFacebookPixelField,
  setPixelValue,
  setTokenValue,
} = metricsSlice.actions;

export default metricsSlice.reducer;
