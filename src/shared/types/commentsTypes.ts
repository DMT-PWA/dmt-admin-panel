export interface IUserComment {
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
