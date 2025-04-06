export {
  default as commentsReducer,
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

} from "./commentsSlice";

export type { IUserComments } from "./types";

export { getAllComments, removeCommentById, createCommentHandler } from "./commentsThunk"