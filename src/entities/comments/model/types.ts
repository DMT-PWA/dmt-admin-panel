type comments_list = object[] | null;

export interface IUserComments {
  author_name: string | null;
  avatar: string | null;
  review_date: Date | null;
  raiting: number | null;
  likes_count: number | null;
  comments_text: string | null;
}

export interface IDeveloperAnswer {
  developer_name: string | null;
  answer_text: string | null;
  answer_date: Date | null;
}
export interface ICommentsState extends IDeveloperAnswer, IUserComments {
  developer_answer: boolean;
  comments_list: comments_list;
}
