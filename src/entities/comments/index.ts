export {
  commentsReducer,
  addComment,
  removeComment,
  resetState,
  getAllComments,
  removeCommentById,
  createCommentHandler,
  setComments,
  setAllComments,
  resetComment,
  setCommentGroupName,
  setSelectedCommentId,
  updateCommentInList,
  updateCommentField
} from "./model";

export type { AllComments, ReviewObject, CommentsList, ICommentsState } from "./model"