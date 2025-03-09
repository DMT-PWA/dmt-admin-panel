import { FC } from "react";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";

type CollectionCreate = {
  onPopupHandler: () => void;
};

export const CollectionCreate: FC<CollectionCreate> = ({ onPopupHandler }) => {
  return (
    <div className="bg-white pt-[89px] pb-11 px-6.5">
      <div className="flex gap-6.25">
        <div></div>
        <InputDefault
          label="Название коллекции"
          placeholder="Добавьте название коллекции"
          container_classes="flex flex-col gap-4.5 flex-auto"
        />
      </div>
      <div className="flex gap-[43px]">
        <ButtonDefault
          btn_text="Сохранить коллекцию"
          btn_classes="btn__orange btn__orange-view-3"
          onClickHandler={onPopupHandler}
        />
        <ButtonDefault
          btn_text="Отмена"
          btn_classes="btn__white"
          onClickHandler={onPopupHandler}
        />
      </div>
    </div>
  );
};
