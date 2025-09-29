import { Dialog, DialogBackdrop } from "@headlessui/react";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { AvatarsCollectionModal } from "src/features/avatars_collection_modal";
import {
  createCommentHandler,
  getCommentById,
  ICommentsState,
} from "src/entities/comments";
import { CommentCreate } from "src/features/comment_create";
import { adminId } from "src/shared/lib/data";
import { InputDefault } from "src/shared/ui/input";
import { IUserComment } from "src/shared/types";
import {
  selectCurrentLanguageValue,
  selectLanguage,
  updateLanguageData,
} from "src/features/languageData";
import {
  updateComment,
  updateCommentById,
} from "src/entities/comments/model/commentsThunk";
import { debounce } from "src/shared/lib/helpers";
import { cloneDeep, isEqual } from "lodash";
import { useBeforeUnload, useMount } from "react-use";
import { useForm, Controller, FormProvider } from "react-hook-form";
import clsx from "clsx";

export const PwaCommentsCreate: FC = () => {
  const value = useAppSelector(selectCurrentLanguageValue);

  const commentsInitState = useAppSelector((state) => state.comments);

  const language = useAppSelector(selectLanguage);

  const reset = useAppSelector((state) => state.comments.comment);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [initStateCopy, setInitStateCopy] = useState({} as typeof value);

  const [currentModalIndex, setCurrentModalIndex] = useState<number | null>(
    null
  );

  const [saved, setSaved] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const getPathSegments = pathname.split("/");

  const isCommentUpdate = () => getPathSegments.includes("comment_update");
  const getLastSegment = () => getPathSegments.pop() as string;
  useEffect(() => {
    if (
      !isCommentUpdate() &&
      value?.commentState.selected_comment &&
      language
    ) {
      dispatch(
        updateLanguageData({
          state: "commentState",
          payload: commentsInitState,
          currentLanguage: language,
        })
      );
    }

    if (isCommentUpdate() && language) {
      dispatch(getCommentById({ id: getLastSegment(), language }));
    }

    return () => {
      if (language && !isCommentUpdate()) {
        dispatch(
          updateLanguageData({
            state: "commentState",
            payload: commentsInitState,
            currentLanguage: language,
          })
        );
      }
    };
  }, [pathname, dispatch]);

  useMount(() => {
    setInitStateCopy(cloneDeep(value) as unknown as typeof value);
  });

  useBeforeUnload(!isEqual(value, initStateCopy));

  const methods = useForm({
    defaultValues: {
      groupName: "",
      authorName: "",
    },
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
  } = methods;

  if (!value || !language) return <div>Loading...</div>;

  const { commentState } = value;

  const { comment, comments_list, comment_group_name } = commentState;

  const handleNavigate = () => {
    const targetPath = isCommentUpdate()
      ? pathname.replace(`comment_update/${getLastSegment()}`, "comments")
      : pathname.replace("comments_create", "comments");

    navigate(targetPath);
  };

  const onSaveHandler = () => {
    if (!comment_group_name) return;

    if (!isCommentUpdate()) {
      dispatch(
        createCommentHandler({
          adminId,
          language,
          name: comment_group_name,
          comments_list,
        })
      );
    } else {
      dispatch(
        updateComment({
          adminId,
          commentId: getLastSegment(),
          name: comment_group_name,
          reviewObject: comments_list,
        })
      );
    }

    if (!saved) {
      setSaved(true);

      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleUpdateField = (payload: Partial<ICommentsState>) => {
    if (!language) return;

    dispatch(
      updateLanguageData({
        state: "commentState",
        payload,
        currentLanguage: language,
      })
    );
  };

  const onUpdateCommentInList = (
    key: keyof IUserComment,
    ind: number,
    value: IUserComment[keyof IUserComment]
  ) => {
    if (!comments_list) return;

    const newList = comments_list.map((comment, i) =>
      i === ind ? { ...comment, [key]: value } : comment
    );

    handleUpdateField({
      comments_list: newList,
    });

    if (isCommentUpdate()) {
      const updatedComment = newList[ind];
      debounce(
        () =>
          dispatch(
            updateCommentById({
              adminId,
              commentId: getLastSegment(),
              reviewId: updatedComment.commentId || "",
              updatedReview: updatedComment,
            })
          ),
        500
      );
    }
  };

  const updateNewComment = (
    field: keyof IUserComment,
    value: IUserComment[keyof IUserComment]
  ) => {
    if (!comment) return;

    handleUpdateField({ comment: { ...comment, [field]: value } });
  };

  const onAddNewComment = () => {
    if (!comments_list || !comment) return;
    handleUpdateField({
      comments_list: [...comments_list, comment],
      comment: reset,
    });
  };

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
      <Controller
        name="groupName"
        control={control}
        rules={{
          required: "Название группы обязательно",
        }}
        render={({ field, fieldState: { error, invalid } }) => (
          <InputDefault
            label="Название группы"
            onUpdateValue={(e) => {
              field.onChange(e.target.value);
              handleUpdateField({ comment_group_name: e.target.value });
            }}
            value={field.value}
            container_classes="max-w-128.25"
            placeholder="Введите название группы"
            error_message={error?.message}
            valid={!invalid}
          />
        )}
      />
      <div className="flex flex-col gap-6">
        <div>
          <FormProvider {...methods}>
            {comments_list &&
              comments_list.map((item, ind) => {
                return (
                  <CommentCreate
                    key={ind}
                    index={ind}
                    setModalOpen={() => {
                      setModalOpen(true);
                      setCurrentModalIndex(ind);
                    }}
                    onFiledUpdate={(field, value) =>
                      onUpdateCommentInList(field, ind, value)
                    }
                    {...item}
                  />
                );
              })}
            {comment && (
              <CommentCreate
                setModalOpen={() => {
                  setModalOpen(true);
                  setCurrentModalIndex(null);
                }}
                onFiledUpdate={(field, value) => updateNewComment(field, value)}
                {...comment}
              />
            )}
            <button
              disabled={Object.keys(errors).length > 0}
              onClick={onAddNewComment}
              className={clsx(
                "flex items-center gap-6.75 text-view-4 text-gray-6 bg-white py-[13.5px] px-[16.5px] rounded-[8px] mt-5.5",
                { "opacity-50": Object.keys(errors).length > 0 }
              )}
            >
              <img
                src="/pwa_icons/crosshair.png"
                width={14}
                height={14}
                alt=""
              />
              Добавить новый комментарий
            </button>
            {comments_list && comments_list.length > 0 && (
              <ButtonDefault
                onClickHandler={onSaveHandler}
                btn_text={saved ? "Сохранено" : "Сохранить"}
                btn_classes={clsx(
                  "btn__orange btn__orange-view-1 w-62.25 mt-5.5",
                  { "opacity-50": saved }
                )}
                disabled={saved}
              />
            )}
          </FormProvider>
        </div>
      </div>
      <Dialog
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <AvatarsCollectionModal
            handleUpdateField={handleUpdateField}
            comment={comment}
            comments_list={comments_list}
            onPopupHandler={() => setModalOpen(false)}
            index={currentModalIndex}
          />
        </div>
      </Dialog>
    </div>
  );
};
