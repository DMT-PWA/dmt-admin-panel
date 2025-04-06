import { createAsyncThunk } from "@reduxjs/toolkit";

import { getComments, removeComment, createComment } from "src/shared/api/comments"

import { ICommentsState } from "./types"

export const getAllComments = createAsyncThunk("comments/getAllComments", async () => {
    const response = await getComments();

    return response
})

export const removeCommentById = createAsyncThunk("comments/removeCommentById", async (id, { dispatch }) => {
    await removeComment(`comment/${id}`);

    const response = dispatch(getAllComments());

    return response
})

export const createCommentHandler = createAsyncThunk("comments/createCommentHandler", async (data: { appId: string, language: string }, { getState }) => {

    const state = getState().comments as ICommentsState;

    const { comment, comments_list } = state;

    const { author_name, comments_text, likes_count,
        raiting,
        review_date,
        avatar } = comment

    const fullPayload = {
        ...data,
        name: author_name,
        reviewObject: [...comments_list, {
            name: author_name,
            date: review_date,
            rating: raiting,
            photo: avatar,
            review: comments_text,
            helpfulCount: likes_count
        }]
    }


    const response = await createComment('comment', fullPayload);

    return response;
})

