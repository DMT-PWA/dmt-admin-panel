import { FC, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  handleComments,
  getAllComments,
  removeCommentById,
} from "src/entities/comments";
import type {
  ReviewObject,
  ICommentsState,
  CommentGroup,
} from "src/entities/comments";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";

import pencil_icon from "src/shared/assets/icons/pencil.png";
import trash_icon from "src/shared/assets/icons/trash_icon_orange.png";
import circle_icon from "src/shared/assets/icons/circle_icon.png";
import {
  selectCurrentLanguageValue,
  selectLanguage,
  updateLanguageData,
} from "src/features/languageData";
import { cloneDeep, isEqual } from "lodash";
import { useBeforeUnload, useMount } from "react-use";

export const PwaComments: FC = () => {
  const value = useAppSelector(selectCurrentLanguageValue);

  const language = useAppSelector(selectLanguage);

  const [initStateCopy, setInitStateCopy] = useState({} as typeof value);

  const [all_comments, setAllComments] = useState<Array<CommentGroup>>([]);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation().pathname;

  const fetchAllComments = useCallback(async () => {
    const response = await dispatch(getAllComments());

    if (getAllComments.fulfilled.match(response)) {
      setAllComments(response.payload);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAllComments();
  }, [fetchAllComments]);

  useMount(() => {
    setInitStateCopy(cloneDeep(value) as unknown as typeof value);
  });

  useBeforeUnload(!isEqual(value, initStateCopy));

  if (!value) return <div>Loading...</div>;

  const { commentState } = value;

  const { selected_comment } = commentState;

  const handleNavigate = (isUpdate: boolean = false, commentId?: string) => {
    if (!isUpdate) {
      const toCreate = location.replace("comments", "comments_create");

      return navigate(toCreate);
    }

    const toUpdate = location.replace(
      "comments",
      `comment_update/${commentId}`
    );

    navigate(toUpdate);
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

  const selectCommentHandler = (commentsObject: ReviewObject, id?: string) => {
    handleUpdateField({
      selected_comment: id,
      comments_list: [...handleComments(commentsObject)],
    });
  };

  const handleRemoveComment = async (id: string) => {
    if (!language) return;

    await dispatch(removeCommentById(id));

    await fetchAllComments();
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="container__view-1 flex flex-col pl-[38px] pb-9">
        <Title
          title="Комментарии"
          withContainer={false}
          classes="title__view-2"
        />
        <div className="flex flex-col">
          <p>
            Вы можете добавить коментарии и ответы к ним на страницу установки
            вашего PWA приложения Добавить коментарий
          </p>
          <ButtonDefault
            btn_text="Добавить группу"
            btn_classes="btn__orange btn__orange-view-1 mt-2 max-w-48.5"
            onClickHandler={() => handleNavigate(false)}
          />
        </div>
      </div>
      {all_comments && all_comments.length > 0 && (
        <div className="container__view-1 flex-col min-h-[794px] mt-[26px] px-[27px] pt-7.75">
          <div className="bg-white flex flex-col gap-4.25 rounded-[6px] mt-4 pl-4 pr-[19px] pt-3 pb-[30px]">
            <h1 className="title__view-2">Список коментариев</h1>
            {all_comments.map((item, ind: number) => {
              return (
                <div key={ind} className="py-4 px-6 flex">
                  <div className="flex items-center">
                    {selected_comment === item._id ? (
                      <div className="mr-7.75 w-4 h-4 rounded-full border-1 border-[#21272A] bg-orange"></div>
                    ) : (
                      <img
                        onClick={() =>
                          selectCommentHandler(item.reviewObject, item._id)
                        }
                        src={circle_icon}
                        width={16}
                        style={{ maxHeight: "16px" }}
                        alt=""
                        className="mr-7.75"
                      />
                    )}
                  </div>
                  <h2 className="text-view-4 flex-1">{item.name}</h2>
                  <div className="flex gap-4">
                    <button
                      className="w-5 h-5"
                      onClick={() => handleNavigate(true, item._id)}
                    >
                      <img src={pencil_icon} width={14} height={14} alt="" />
                    </button>
                    <button
                      onClick={() => handleRemoveComment(item?._id)}
                      className="w-5 h-5"
                    >
                      <img src={trash_icon} width={14} height={16} alt="" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
