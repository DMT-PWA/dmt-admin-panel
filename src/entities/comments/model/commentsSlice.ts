import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommentsState } from "./types";
import {
  removeCommentById,
  createCommentHandler,
  getCommentById,
} from "./commentsThunk";
import { IUserComment } from "src/shared/types";
import { UpdateFieldPayload } from "src/shared/lib/store";

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

export const handleComments = (payload) => {
  const modifiedComments = payload.map((item) => ({
    review_date: item.date,
    author_name: item.name,
    avatar: item.photo,
    raiting: item.rating,
    comments_text: item.review,
    developer_answer: item.isResponse,
    answer_text: item.response,
    answer_date: item.responseDate,
  }));

  return modifiedComments;
};

export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {
    updateCommentInList: (
      state,
      action: PayloadAction<{ index: number; changes: Partial<IUserComment> }>
    ) => {
      if (!state.comments_list) return;

      const { changes, index } = action.payload;

      if (index !== -1) {
        state.comments_list[index] = {
          ...state.comments_list[index],
          ...changes,
        };
      }
    },
    updateCommentField: (
      state,
      action: PayloadAction<UpdateFieldPayload<IUserComment>>
    ) => {
      const { field, value } = action.payload;

      state.comment[field] = value as never;
    },

    setComments: (state, action) => {
      const modifiedComments = handleComments(action.payload);

      state.comments_list = [...modifiedComments];
    },

    setAllComments: (state, action) => {
      state.all_comments = [...action.payload];
    },

    addComment: (state, action) => {
      state.comments_list?.push(action.payload);
    },

    setCommentGroupName: (state, action: PayloadAction<string>) => {
      state.comment_group_name = action.payload;
    },

    setSelectedCommentId: (state, action: PayloadAction<string>) => {
      state.selected_comment = action.payload;
    },

    removeComment: (state, action) => {
      state.comments_list?.splice(action.payload, 1);
    },
    resetState: () => initialState,

    resetComment: (state) => {
      state.comment = initialState.comment;
    },
    resetCommentsList: (state) => {
      state.comments_list = initialState.comments_list;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      removeCommentById.fulfilled,
      (state, action: PayloadAction<ICommentsState["comments_list"]>) => {
        state.comments_list = [...action.payload];
      }
    );

    builder.addCase(createCommentHandler.fulfilled, (state, action) => {
      state.comment.commentId = action.payload._id;
    });

    builder.addCase(getCommentById.fulfilled, (state, action) => {
      state.comment_group_name = action.payload.name;
      state.comments_list = handleComments(action.payload.reviewObject);
    });
  },
});

export const {
  addComment,
  removeComment,
  resetState,
  setComments,
  setAllComments,
  resetComment,
  setSelectedCommentId,
  setCommentGroupName,
  updateCommentInList,
  updateCommentField,
  resetCommentsList,
} = comments.actions;

export default comments.reducer;
