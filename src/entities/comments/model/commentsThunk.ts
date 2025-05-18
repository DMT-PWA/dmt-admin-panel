import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getComments,
  removeComment,
  createComment,
} from "src/shared/api/comments";

export const getAllComments = createAsyncThunk(
  "comments/getAllComments",
  async () => {
    const response = await getComments();

    return response;
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
  { appId: string; language: string }
>("comments/createCommentHandler", async (data, { getState }) => {
  const state = (getState() as RootState).comments;

  const { comment_group_name, comments_list } = state;

  const newCommentsList = comments_list?.map((item) => ({
    date: item.review_date,
    name: item.author_name,
    photo: item.avatar,
    rating: item.raiting,
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

  const response = await createComment("comment", fullPayload);

  return response;
});
