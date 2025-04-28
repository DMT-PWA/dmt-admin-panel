import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDesignInfo, getPwaInfo, IDesign, IPwaInfo } from "src/shared/api/design";

export const fetchDesignInfo = createAsyncThunk<IDesign[]>(
  "posts",
  async () => {
    const response = await getDesignInfo("posts");

    return response;
  }
);

export const fetchPwaInfo = createAsyncThunk<IPwaInfo[]>("design/fetchPwaInfo", async () => {
  const response = await getPwaInfo("678fc03a2fc8dd36b0598db8", "English", "Malaysia")

  return response
})
