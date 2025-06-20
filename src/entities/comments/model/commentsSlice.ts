import { createSlice } from "@reduxjs/toolkit";
import { ICommentsState, ReviewObject } from "./types";

const initialState: ICommentsState = {
  comment: {
    developer_answer: false,
    commentId: null,
    author_name: "",
    comments_text: "",
    likes_count: null,
    raiting: null,
    review_date: null,
    avatar: null,
    developer_name: null,
    answer_text: null,
    answer_date: null,
  },
  comment_group_name: null,
  selected_comment: null,
  comments_list: [],
  all_comments: [],
};

export const handleComments = (payload: ReviewObject) => {
  const modifiedComments = payload.map((item) => ({
    review_date: new Date(item.date),
    author_name: item.name,
    avatar: item.photo,
    raiting: Number(item.rating),
    comments_text: item.review,
    developer_answer: item.isResponse,
    answer_text: item.response,
    answer_date: new Date(item.responseDate),
    likes_count: item.helpfulCount,
    commentId: item._id,
  }));

  return modifiedComments;
};

export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {
    removeComment: (state, action) => {
      state.comments_list?.splice(action.payload, 1);
    },
    resetState: () => initialState,

    resetCommentsList: (state) => {
      state.comments_list = initialState.comments_list;
    },
  },

  extraReducers: () => {
    /* builder.addCase(
      removeCommentById.fulfilled,
      (state, action: PayloadAction<ICommentsState["comments_list"]>) => {
        state.comments_list = [...action.payload];
      }
    ); */
    /* builder.addCase(createCommentHandler.fulfilled, (state, action) => {
      state.comment.commentId = action.payload._id;
    }); */
    /*  builder.addCase(getCommentById.fulfilled, (state, action) => {
      state.comment_group_name = action.payload.name;
      state.comments_list = handleComments(action.payload.reviewObject);
    }); */
  },
});

export const { removeComment, resetState, resetCommentsList } =
  comments.actions;

export default comments.reducer;
