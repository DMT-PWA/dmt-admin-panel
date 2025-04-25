import { Dialog, DialogBackdrop, Switch } from "@headlessui/react";
import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { AvatarsCollectionModal } from "src/features/avatars_collection_modal";
import {
  addComment,
  createCommentHandler,
  resetComment,
  setCommentGroupName,
  updateCommentInList,
  updateCommentField,
} from "src/entities/comments";
import { CommentCreate } from "src/features/comment_create";
import { adminId } from "src/shared/lib/data";
import { InputDefault } from "src/shared/ui/input";
import { IUserComment } from "src/shared/types";

// Screen:Create Comments
export const PwaCommentsCreate: FC = () => {
  const { comment, comments_list } = useAppSelector((state) => state.comments);

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

  const onUpdateCommentInList = (
    key: string,
    ind: number,
    val: IUserComment[keyof IUserComment]
  ) => {
    dispatch(
      updateCommentInList({
        index: ind,
        changes: { [key]: val },
      })
    );
  };

  const handleFieldUpdate = (
    field: keyof IUserComment,
    value: IUserComment[keyof IUserComment]
  ) => {
    dispatch(updateCommentField({ field, value }));
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
          {comments_list &&
            comments_list.map((item, ind) => {
              return (
                <CommentCreate
                  key={ind}
                  setModalOpen={setModalOpen}
                  onFiledUpdate={(field, value) =>
                    onUpdateCommentInList(field, ind, value)
                  }
                  {...item}
                />
              );
            })}
          <CommentCreate
            setModalOpen={setModalOpen}
            onFiledUpdate={(field, value) => handleFieldUpdate(field, value)}
            {...comment}
          />
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
