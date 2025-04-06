import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IUserComments,
  removeComment,
  getAllComments,
  removeCommentById,
} from "src/entities/comments";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";

import pencil_icon from "src/shared/assets/icons/pencil.png";
import trash_icon from "src/shared/assets/icons/trash_icon_orange.png";

export const PwaComments: FC = () => {
  const { comments_list } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation().pathname;

  const handleNavigate = () => {
    const toCreate = location.replace("comments", "comments_create");

    navigate(toCreate);
  };

  useEffect(() => {
    dispatch(getAllComments());
  }, []);

  return (
    <div className="flex flex-1 flex-col mt-[78px]">
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
            btn_text="Добавить коментарий"
            btn_classes="btn__orange btn__orange-view-1 mt-2 max-w-48.5"
            onClickHandler={handleNavigate}
          />
        </div>
      </div>
      {comments_list && comments_list.length > 0 && (
        <div className="container__view-1 flex-col min-h-[794px] mt-[26px] px-[27px] pt-7.75">
          <div className="bg-white flex flex-col gap-4.25 rounded-[6px] mt-4 pl-4 pr-[19px] pt-3 pb-[30px]">
            <h1 className="title__view-2">Список коментариев</h1>
            {comments_list.map((item: IUserComments, ind: number) => {
              return (
                <div key={ind} className="py-4 px-6 flex">
                  <h2 className="text-view-4 flex-1">{item.name}</h2>
                  <div className="flex gap-4">
                    <button className="w-5 h-5">
                      <img src={pencil_icon} width={14} height={14} alt="" />
                    </button>
                    <button
                      onClick={() => dispatch(removeCommentById(item._id))}
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
