export {
  default as commentsReducer,
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
} from "./commentsSlice";

export type {
  CommentsList,
  ReviewObject,
  AllComments,
  ICommentsState,
} from "./types";

export {
  getAllComments,
  removeCommentById,
  createCommentHandler,
} from "./commentsThunk";
