import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  CommentGroup,
  CommentsList,
  CommentUpdatePayload,
  ICommentsState,
} from "./types";
import { apiInstance } from "src/shared/api/base";
import { IUserComment } from "src/shared/types";
import { CommentResponse } from "src/shared/types/commentsTypes";

export const getAllComments = createAsyncThunk<
  ICommentsState["all_comments"],
  string
>("comments/getAllComments", async () => {
  return await apiInstance.get("comment");
});

export const getCommentById = createAsyncThunk<
  CommentGroup,
  { id: string; language: string }
>("comments/getCommentById", async ({ id }) => {
  return await apiInstance.get(`comment/${id}`);
});

export const removeCommentById = createAsyncThunk<unknown, string>(
  "comments/removeCommentById",
  async (id) => {
    return await apiInstance.delete(`comment/${id}`);
  }
);

export const createCommentHandler = createAsyncThunk<
  CommentGroup,
  {
    adminId: string;
    language: string;
    name: string;
    comments_list: CommentsList;
  }
>("comments/createCommentHandler", async (data) => {
  const { comments_list } = data;

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

    reviewObject: newCommentsList,
  };

  return await apiInstance.post("comment", fullPayload);
});

export const updateComment = createAsyncThunk<
  CommentGroup,
  {
    reviewObject: CommentsList;
  } & Partial<CommentUpdatePayload>
>("comments/updateComment", async (data) => {
  const { reviewObject } = data;

  const newCommentsList = reviewObject?.map((item) => ({
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
    reviewObject: newCommentsList,
  };

  return await apiInstance.patch("comment", fullPayload);
});

export const updateCommentById = createAsyncThunk<
  CommentGroup,
  { updatedReview: IUserComment } & Partial<CommentUpdatePayload>
>("comments/updateCommentById", async (data) => {
  const newComment = {
    date: String(data.updatedReview.review_date),
    helpfulCount: data.updatedReview.likes_count,
    rating: String(data.updatedReview.raiting),
    photo: data.updatedReview.avatar,
    review: data.updatedReview.comments_text,
    name: data.updatedReview.author_name,
    responseDate: String(data.updatedReview.answer_date),
    response: data.updatedReview.answer_text,
    isResponse: data.updatedReview.developer_answer,
  } as CommentResponse;

  const fullPayload = { ...data, updatedReview: newComment };

  return await apiInstance.patch("comment/update-review", fullPayload);
});
