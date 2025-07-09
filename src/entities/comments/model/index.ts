export {
  default as commentsReducer,
  removeComment,
  resetState,
  resetCommentsList,
} from "./commentsSlice";

export type {
  CommentsList,
  ReviewObject,
  CommentGroup,
  ICommentsState,
} from "./types";

export {
  getAllComments,
  removeCommentById,
  createCommentHandler,
} from "./commentsThunk";
