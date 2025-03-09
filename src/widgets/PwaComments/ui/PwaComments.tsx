import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";

export const PwaComments: FC = () => {
  const navigate = useNavigate();

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
            btn_classes="btn__orange btn__orange-view-1 mt-2"
            onClickHandler={() => navigate("/pwa_create/comments_create")}
          />
        </div>
      </div>
      <div className="container__view-1 flex-col min-h-[794px] mt-[26px]"></div>
    </div>
  );
};
