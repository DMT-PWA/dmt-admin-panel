import { IUserComment } from "src/shared/types"

type comments_list = Array<IUserComment> | null;

export interface ICommentsState {
  developer_answer: boolean;
  comment: IUserComment & { commentId: string | null },
  comments_list: comments_list;
}
