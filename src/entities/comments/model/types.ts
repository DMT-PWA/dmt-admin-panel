import { IUserComment } from "src/shared/types";

export type CommentsList = Array<IUserComment> | null;

export type ReviewObject = Array<{
  date: string;
  helpful: string;
  helpfulCount: string;
  isResponse: boolean;
  name: string;
  photo: string;
  rating: string;
  response: string;
  responseDate: string;
  review: string;
  _id: string;
}>;

export type AllComments = Array<{
  adminId: string;
  createdAt: string;
  name: string;
  reviewObject: ReviewObject;
  updatedAt: string;
  __v: string;
  _id: string;
}>;
export interface ICommentsState {
  comment: IUserComment & { commentId: string | null };
  comments_list: CommentsList;
  comment_group_name: string | null;
  all_comments: AllComments
}
