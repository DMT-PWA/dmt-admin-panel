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
  setComments,
  setAllComments,
  resetComment,
  setSelectedCommentId,
  setCommentGroupName
} from "./commentsSlice";

export type { CommentsList, ReviewObject, AllComments } from "./types";

export { getAllComments, removeCommentById, createCommentHandler } from "./commentsThunk"