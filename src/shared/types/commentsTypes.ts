interface IUserComment {
  author_name: string | null;
  avatar: string | null;
  review_date: Date | null;
  raiting: number | null;
  likes_count: number | null;
  comments_text: string | null;
  developer_name?: string | null;
  answer_text?: string | null;
  answer_date?: Date | null;
  developer_answer: boolean;
}

type CommentResponse = {
  name?: string;
  date?: string;
  review?: string;
  helpful?: string;
  helpfulCount?: string;
  photo?: string;
  rating?: string;
  isResponse?: boolean;
  response?: string;
  responseDate?: string;
  _id: { $oid: string };
};

export type { IUserComment, CommentResponse };
