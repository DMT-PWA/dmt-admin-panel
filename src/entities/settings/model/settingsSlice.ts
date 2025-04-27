import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Settings } from "./types";
import { SelectValueProp } from "src/shared/types";
import { UpdateFieldPayload } from "src/shared/lib/store";

const initialState: Settings = {
  domainApp: null,
  domainLanding: null,
  marketerTag: null,
  whitePage: null,
  naming: null,
  subdomain: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettingField: (
      state,
      action: PayloadAction<UpdateFieldPayload<Settings> | string>
    ) => {
      if (typeof action.payload !== "string") {
        const { field, value } = action.payload;

        state[field] = value as never;

        return;
      }

      state["subdomain"] = action.payload;
    },
    setDomainApp: (state, action: PayloadAction<SelectValueProp>) => {
      state.domainApp = action.payload;
    },

    setDomainLanding: (state, action: PayloadAction<SelectValueProp>) => {
      state.domainLanding = action.payload;
    },

    setMartketerTag: (state, action: PayloadAction<SelectValueProp>) => {
      state.marketerTag = action.payload;
    },
  },
});

export const {
  setDomainApp,
  setDomainLanding,
  setMartketerTag,
  updateSettingField,
} = settingsSlice.actions;

export default settingsSlice.reducer;
