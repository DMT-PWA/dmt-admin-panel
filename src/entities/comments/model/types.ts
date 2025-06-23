import { IUserComment } from "src/shared/types";
import { CommentResponse } from "src/shared/types/commentsTypes";

export type CommentsList = Array<
  IUserComment & { commentId: string | null }
> | null;

export type ReviewObject = Array<CommentResponse>;

export type CommentGroup = {
  adminId: string;
  createdAt: string;
  name: string;
  reviewObject: ReviewObject;
  updatedAt: string;
  __v: string;
  _id: string;
};
export interface ICommentsState {
  comment: (IUserComment & { commentId: string | null }) | null;
  comments_list: CommentsList;
  comment_group_name?: string | null;
  selected_comment: string | null;
  all_comments: Array<CommentGroup> | null;
}

export type CommentUpdatePayload = Record<
  "commentId" | "adminId" | "reviewId" | "name",
  string
>;
