import { Dialog, DialogBackdrop, Switch } from "@headlessui/react";
import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { AvatarsCollectionModal } from "src/features/avatars_collection_modal";
import {
  addComment,
  setDeveloperAnswer,
  createCommentHandler,
  resetComment,
  setCommentGroupName,
} from "src/entities/comments";
import { CommentCreate } from "src/features/comment_create";
import { adminId } from "src/shared/lib/data";
import { InputDefault } from "src/shared/ui/input";

export const PwaCommentsCreate: FC = () => {
  const { comment, comments_list } = useAppSelector((state) => state.comments);
  const {
    author_answer,
    author_name,
    developer_answer,
    avatar,
    comments_text,
    likes_count,
    raiting,
    review_date,
  } = comment;

  const { currentLanguage } = useAppSelector((state) => state.pwa_design);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation().pathname;

  const handleNavigate = () => {
    const toComments = location.replace("comments_create", "comments");

    navigate(toComments);
  };

  const onSaveHandler = () => {
    dispatch(
      createCommentHandler({ adminId, language: currentLanguage?.label })
    );
  };

  const onAddNewComment = () => {
    dispatch(addComment(comment));
    dispatch(resetComment());
  };

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px]">
      <div className="flex justify-between">
        <Title
          title="Группа коментариев"
          withContainer={false}
          classes="title__view-2"
        />
        <ButtonDefault
          btn_text="Вернуться назад"
          btn_classes="btn__white btn__white-view-1"
          onClickHandler={handleNavigate}
          withArrow
        />
      </div>
      <InputDefault
        label="Название группы"
        input_classes=""
        onUpdateValue={(e) => dispatch(setCommentGroupName(e.target.value))}
        container_classes="max-w-128.25"
        placeholder="Введите название группы"
      />
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex">
            <h2 className="text__default flex-[0.5]">
              Коментарий пользователя
            </h2>
            <div className="flex flex-[0.5] justify-between">
              <h2 className="text__default">Ответ разработчика</h2>
              <Switch
                checked={developer_answer}
                onChange={(value) => dispatch(setDeveloperAnswer(value))}
                className="group inline-flex h-[16px] w-8 items-center rounded-full bg-[#697077] transition data-[checked]:bg-orange"
              >
                <span className="size-3 translate-x-0.5 rounded-full bg-white transition group-data-[checked]:translate-x-4.5" />
              </Switch>
            </div>
          </div>
          {comments_list &&
            comments_list.map((item) => {
              return (
                <CommentCreate
                  setModalOpen={setModalOpen}
                  author_answer={item.author_answer}
                  author_name={item.author_name}
                  avatar={item.avatar}
                  comments_text={item.comments_text}
                  developer_answer={item.developer_answer}
                  likes_count={item.likes_count}
                  raiting={item.raiting}
                  review_date={item.review_date}
                />
              );
            })}
          <CommentCreate
            setModalOpen={setModalOpen}
            author_answer={author_answer}
            author_name={author_name}
            avatar={avatar}
            comments_text={comments_text}
            developer_answer={developer_answer}
            likes_count={likes_count}
            raiting={raiting}
            review_date={review_date}
          />
          {/* 
          <ButtonDefault
            btn_text="Добавить новый коментарий"
            btn_classes="btn__white btn__white-view-5 text-view-4 mt-5.5 ml-5.5"
            onClickHandler={onAddNewComment}
          /> */}
          <button
            onClick={onAddNewComment}
            className="flex items-center gap-6.75 text-view-4 text-gray-6 bg-white py-[13.5px] px-[16.5px] rounded-[8px] mt-5.5"
          >
            <img src="/pwa_icons/crosshair.png" width={14} height={14} alt="" />
            Добавить новый комментарий
          </button>
          {comments_list && comments_list.length > 0 && (
            <ButtonDefault
              onClickHandler={onSaveHandler}
              btn_text="Сохранить"
              btn_classes="btn__orange btn__orange-view-1 w-62.25 mt-5.5"
            />
          )}
        </div>
      </div>
      <Dialog
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <AvatarsCollectionModal onPopupHandler={() => setModalOpen(false)} />
        </div>
      </Dialog>
    </div>
  );
};
