import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDesignInfo, IDesign } from "src/shared/api/design";

export const fetchDesignInfo = createAsyncThunk<IDesign[], string>(
  "posts",
  async () => {
    const response = await getDesignInfo("posts");

    return response;
  }
);
