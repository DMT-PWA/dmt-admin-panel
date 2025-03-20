import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDesignInfo, getKek, IDesign, IKek } from "src/shared/api/design";

export const fetchDesignInfo = createAsyncThunk<IDesign[]>(
  "posts",
  async () => {
    const response = await getDesignInfo("posts");

    return response;
  }
);

export const fetchKek = createAsyncThunk<IKek[]>("design/fetchKek", async () => {
  const response = await getKek("678fc03a2fc8dd36b0598db8", "English", "Malaysia")

  return response
})
