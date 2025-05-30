import { createAsyncThunk } from "@reduxjs/toolkit";

import { getComments, removeComment } from "src/shared/api/comments";
import { ICommentsState } from "./types";
import { apiInstance } from "src/shared/api/base";

export const getAllComments = createAsyncThunk(
  "comments/getAllComments",
  async () => {
    const response = await getComments();

    return response as ICommentsState["all_comments"];
  }
);

export const removeCommentById = createAsyncThunk(
  "comments/removeCommentById",
  async (id: string, { dispatch }) => {
    await removeComment(`comment/${id}`);

    const response = dispatch(getAllComments());

    return response;
  }
);

export const createCommentHandler = createAsyncThunk<
  unknown,
  { adminId: string; language: string }
>("comments/createCommentHandler", async (data, { getState }) => {
  const state = (getState() as RootState).comments;

  const { comment_group_name, comments_list } = state;

  const newCommentsList = comments_list?.map((item) => ({
    date: item.review_date,
    name: item.author_name,
    photo: item.avatar,
    rating: item.raiting,
    helpfulCount: item.likes_count,
    review: item.comments_text,
    isResponse: item.developer_answer,
    response: item.answer_text,
    responseDate: item.answer_date,
  }));

  const fullPayload = {
    ...data,
    name: comment_group_name,
    reviewObject: newCommentsList,
  };

  const response = await apiInstance.post("comment", fullPayload);

  return response;
});
