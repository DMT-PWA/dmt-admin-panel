export {
  commentsReducer,
  removeComment,
  resetState,
  getAllComments,
  removeCommentById,
  createCommentHandler,
  resetCommentsList,
} from "./model";

export { getCommentById, updateCommentById } from "./model/commentsThunk";

export type {
  CommentGroup,
  ReviewObject,
  CommentsList,
  ICommentsState,
} from "./model";

export { handleComments } from "./model/commentsSlice";
