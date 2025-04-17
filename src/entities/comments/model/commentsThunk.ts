import { createAsyncThunk } from "@reduxjs/toolkit";

import { getComments, removeComment, createComment } from "src/shared/api/comments"

import { ICommentsState } from "./types"

export const getAllComments = createAsyncThunk("comments/getAllComments", async () => {
    const response = await getComments();

    return response
})

export const removeCommentById = createAsyncThunk("comments/removeCommentById", async (id: string, { dispatch }) => {
    await removeComment(`comment/${id}`);

    const response = dispatch(getAllComments());

    return response
})

export const createCommentHandler = createAsyncThunk("comments/createCommentHandler", async (data: { appId: string, language: string }, { getState }) => {

    const state = getState().comments as ICommentsState;

    const { comment_group_name, comments_list } = state;


    const newCommentsList = comments_list?.map((item) => ({
        date: item.review_date,
        name: item.author_name,
        photo: item.avatar,
        rating: item.raiting,
        review: item.comments_text
    }))

    const fullPayload = {
        ...data,
        name: comment_group_name,
        reviewObject: newCommentsList
    }


    const response = await createComment('comment', fullPayload);

    return response;
})

