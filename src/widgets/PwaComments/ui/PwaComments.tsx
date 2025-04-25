import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setComments,
  getAllComments,
  removeCommentById,
  setSelectedCommentId,
} from "src/entities/comments";
import type { ReviewObject } from "src/entities/comments";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";
import {
  updatePwa,
  getPwaByIdAndLanguage,
} from "src/features/appData/appDataAPI";
import { getApp } from "src/features/appData/appDataSlice";

import pencil_icon from "src/shared/assets/icons/pencil.png";
import trash_icon from "src/shared/assets/icons/trash_icon_orange.png";
import circle_icon from "src/shared/assets/icons/circle_icon.png";

type PwaCommentsProps = {
  appId: string;
  adminId: string;
  language: string;
  country: string;
  isEdit?: boolean;
};

// Screen:Comments
export const PwaComments: FC<PwaCommentsProps> = ({
  appId,
  adminId,
  language,
  country,
  isEdit,
}) => {
  const { all_comments, selected_comment } = useAppSelector(
    (state) => state.comments
  );

  console.log({ selected_comment });
  const { appData } = useAppSelector((state) => state.appData);

  console.log({ appData });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const location = useLocation().pathname;

  const handleNavigate = () => {
    const toCreate = location.replace("comments", "comments_create");

    navigate(toCreate);
  };

  const selectCommentHandler = (commentsObject: ReviewObject, id: string) => {
    dispatch(setSelectedCommentId(id));

    dispatch(setComments(commentsObject));
  };

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  //fetch app on component mount
  useEffect(() => {
    fetchPWA();
  }, []);

  const fetchPWA = async () => {
    if (!appId) {
      console.log("appId required");
      return;
    }
    if (!language) {
      console.log("language required");
      return;
    }
    if (!country) {
      console.log("country required");
      return;
    }
    const response = await getPwaByIdAndLanguage(appId, language, country);

    if (response?._id) {
      dispatch(getApp(response));
    }
  };

  useEffect(() => {
    updatePWA();
  }, [selected_comment]);

  const updatePWA = async () => {
    if (!appId) {
      alert("appId is required");
      return;
    }

    if (!adminId) {
      // alert("adminId is required");
      return;
    }

    if (!country) {
      // alert("country is required");
      return;
    }

    if (!language) {
      alert("language is required");
      return;
    }

    let newCommentId = selected_comment || appData?.commentId?._id;

    if (!newCommentId) {
      console.log("commentId is required");
      return;
    }

    const userData = {
      appId,
      adminId,
      commentId: newCommentId,
      country,
      language,
    };

    const response = await updatePwa(userData);

    if (response?._id) {
      await fetchPWA();
    }
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
            btn_text="Добавить коментарий"
            btn_classes="btn__orange btn__orange-view-1 mt-2 max-w-48.5"
            onClickHandler={handleNavigate}
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
                    <button className="w-5 h-5">
                      <img src={pencil_icon} width={14} height={14} alt="" />
                    </button>
                    <button
                      onClick={() => dispatch(removeCommentById(item?._id))}
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
