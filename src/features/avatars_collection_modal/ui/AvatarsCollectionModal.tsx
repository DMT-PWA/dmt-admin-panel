import { FC } from "react";
import close_icon from "src/shared/assets/icons/close_icon.png";
import { ButtonDefault } from "src/shared/ui/button";

interface IAvatarsCollectionProps {
  onPopupHandler: () => void;
}

export const AvatarsCollectionModal: FC<IAvatarsCollectionProps> = ({
  onPopupHandler,
}) => {
  return (
    <div className="relative bg-white pt-[89px] pb-11 px-6.5">
      <button
        className="absolute flex justify-center items-center top-3 right-3.25 w-8.25 h-8.25"
        onClick={onPopupHandler}
      >
        <img src={close_icon} width={16.5} height={16.5} alt="" />
      </button>
      <div className="flex gap-[43px]">
        <ButtonDefault
          btn_text="Выбрать"
          btn_classes="btn__orange btn__orange-view-3"
        />
        <ButtonDefault
          btn_text="Отмена"
          btn_classes="btn__white btn__white-view-3 "
          onClickHandler={onPopupHandler}
        />
      </div>
    </div>
  );
};
