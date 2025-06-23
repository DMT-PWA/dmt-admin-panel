type UserCommentFields =
  | "author_name"
  | "avatar"
  | "likes_count"
  | "comments_text";

interface IUserComment extends Record<UserCommentFields, string | null> {
  review_date: Date | null;
  raiting: number | null;
  answer_text?: string | null;
  answer_date?: Date | null;
  developer_name?: string | null;
  developer_answer: boolean;
}

type CommentStringFields =
  | "name"
  | "date"
  | "review"
  | "helpful"
  | "helpfulCount"
  | "photo"
  | "rating"
  | "response"
  | "responseDate"
  | "_id";

interface CommentResponse extends Record<CommentStringFields, string> {
  isResponse: boolean;
}

export type { IUserComment, CommentResponse };
