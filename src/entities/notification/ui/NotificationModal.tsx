import { FC } from "react";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";
import close_icon from "src/shared/assets/icons/close_icon.png";

export const NotificationModal: FC = ({ onPopupHandler }) => {
  return (
    <div className="relative bg-white pt-11.25 pb-11 px-5.75">
      <button
        className="absolute flex justify-center items-center top-3 right-3.25 w-8.25 h-8.25"
        onClick={onPopupHandler}
      >
        <img src={close_icon} width={16.5} height={16.5} alt="" />
      </button>
      <Title
        title="Автарки"
        classes="text__default text-view-5"
        withContainer={false}
      ></Title>

      <div className="flex gap-[43px]">
        <ButtonDefault
          btn_text="Сохранить"
          btn_classes="btn__orange btn__orange-view-3 flex-1"
        />
        <ButtonDefault
          btn_text="Вернуться"
          btn_classes="btn__white btn__white-view-3 "
          onClickHandler={onPopupHandler}
        />
      </div>
    </div>
  );
};
