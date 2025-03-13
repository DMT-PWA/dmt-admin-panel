import { ChangeEvent, FC } from "react";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import trash_icon from "src/shared/assets/icons/trash_icon.png";
import close_icon from "src/shared/assets/icons/close_icon.png";
import cloud_icon from "src/shared/assets/icons/cloud_icon.png";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";

type CollectionCreate = {
  onPopupHandler: () => void;
};

export const CollectionsList: FC<CollectionCreate> = ({ onPopupHandler }) => {
  const { collectionImage, images, collectionName } = useAppSelector(
    (state) => state.collection
  );

  const dispatch = useAppDispatch();

  const onChoseBtnHandler = () => {
    if (collectionName.length > 0 && collectionImage !== null) {
      onPopupHandler();

      return;
    }
  };

  return (
    <div className="relative bg-white pt-[89px] pb-11 px-6.5">
      <button
        className="absolute flex justify-center items-center top-3 right-3.25 w-8.25 h-8.25"
        onClick={onPopupHandler}
      >
        <img src={close_icon} width={16.5} height={16.5} alt="" />
      </button>

      <InputDefault
        label="Список коллекций"
        container_classes="max-w-79.25"
        label_classes="text__default"
        placeholder="Поиск коллекции"
      />

      <div className="flex gap-[43px]">
        <ButtonDefault
          btn_text="Выбрать"
          btn_classes="btn__orange btn__orange-view-3"
          onClickHandler={onChoseBtnHandler}
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
