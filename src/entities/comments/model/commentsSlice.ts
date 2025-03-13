import { createSlice } from "@reduxjs/toolkit";
import { ICommentsState } from "./types";

const initialState: ICommentsState = {
  developer_answer: false,
  answer_date: null,
  answer_text: "",
  author_name: "",
  comments_text: "",
  developer_name: "",
  likes_count: null,
  raiting: null,
  review_date: null,
  avatar: null,
  comments_list: [],
};

export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setDeveloperAnswer: (state, action) => {
      state.developer_answer = action.payload;
    },
    setAnswerDate: (state, action) => {
      state.answer_date = action.payload;
    },
    setAnswerText: (state, action) => {
      state.answer_text = action.payload;
    },
    setAuthorName: (state, action) => {
      state.author_name = action.payload;
    },
    setCommentsText: (state, action) => {
      state.comments_text = action.payload;
    },
    setDeveloperName: (state, action) => {
      state.developer_name = action.payload;
    },
    setLikes: (state, action) => {
      state.likes_count = action.payload;
    },
    setRaiting: (state, action) => {
      state.raiting = action.payload;
    },
    setReviewDate: (state, action) => {
      state.review_date = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    addComment: (state, action) => {
      state.comments_list?.push(action.payload);

      localStorage.setItem(
        "comments_list",
        JSON.stringify(state.comments_list)
      );
    },
    removeComment: (state, action) => {
      state.comments_list?.splice(action.payload, 1);
      localStorage.removeItem("comments_list");
    },
    resetState: () => initialState,
  },
});

export const {
  setDeveloperAnswer,
  addComment,
  setAnswerDate,
  setAnswerText,
  setAuthorName,
  setAvatar,
  setCommentsText,
  setDeveloperName,
  setLikes,
  setRaiting,
  setReviewDate,
  removeComment,
  resetState,
} = comments.actions;

export default comments.reducer;
