import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommentsState } from "./types";
import { getAllComments, removeCommentById, createCommentHandler } from "./commentsThunk";

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
    author_answer: null
  },
  comment_group_name: null,
  comments_list: [],
  all_comments: [],
};

export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setDeveloperAnswer: (state, action) => {
      state.comment.developer_answer = action.payload;

      state.comment.author_answer = action.payload === true ? {} : null;
    },
    setAnswerDate: (state, action: PayloadAction<Date | null>) => {
      if (state.comment.author_answer) {
        state.comment.author_answer.answer_date = action.payload
      }
    },
    setAnswerText: (state, action) => {
      if (state.comment.author_answer) {

        state.comment.author_answer.answer_text = action.payload;
      }
    },
    setAuthorName: (state, action) => {
      state.comment.author_name = action.payload;
    },
    setCommentsText: (state, action) => {
      state.comment.comments_text = action.payload;
    },
    setDeveloperName: (state, action) => {
      if (state.comment.author_answer) {
        state.comment.author_answer.developer_name = action.payload;
        return
      }
    },
    setLikes: (state, action) => {
      state.comment.likes_count = action.payload;
    },
    setRaiting: (state, action: PayloadAction<number>) => {
      state.comment.raiting = action.payload;
    },
    setReviewDate: (state, action: PayloadAction<Date | null>) => {
      state.comment.review_date = action.payload;
    },
    setAvatar: (state, action) => {
      state.comment.avatar = action.payload;
    },

    setComments: (state, action) => { state.comments_list = action.payload },

    setAllComments: (state, action) => {
      state.all_comments = [...action.payload]
    },

    addComment: (state, action) => {
      state.comments_list?.push(action.payload);
    },

    setCommentGroupName: (state, action: PayloadAction<string>) => {
      state.comment_group_name = action.payload;
    },

    removeComment: (state, action) => {
      state.comments_list?.splice(action.payload, 1);
    },
    resetState: () => initialState,

    resetComment: (state) => { state.comment = initialState.comment }
  },

  extraReducers: (builder) => {
    builder.addCase(getAllComments.fulfilled, (state, action) => {
      state.all_comments = [...action.payload]
    })

    builder.addCase(removeCommentById.fulfilled, (state, action) => {
      state.comments_list = [...action.payload]
    })

    builder.addCase(createCommentHandler.fulfilled, (state, action) => {
      state.comment.commentId = action.payload._id;
    })
  }
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
  setComments,
  setAllComments,
  resetComment,
  setCommentGroupName
} = comments.actions;

export default comments.reducer;
