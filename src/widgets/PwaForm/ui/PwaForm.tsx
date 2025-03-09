import { Dialog, DialogBackdrop } from "@headlessui/react";
import { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { setPwaTitle } from "src/entities/pwa_design";
import { CollectionCreate } from "src/features/collection_create";
import { useAppSelector } from "src/shared/lib/store";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";

export const PwaForm: FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const title = useAppSelector((state) => state.pwa_design.pwa_title);
  const dispatch = useDispatch();

  const onSetPwaTitle = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setPwaTitle(e.target.value));

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[202px]">
      <Title title="Дизайн" withContainer={false} classes="title__view-2" />
      <div className="flex flex-col gap-6">
        <InputDefault
          value={title}
          label="Название PWA"
          input_classes="!border-0"
          placeholder="..."
          onUpdateValue={onSetPwaTitle}
        />
        <label className="title__view-1">Язык интерфейса PWA</label>
        <CustomSelect placeholder="Английский" />
        <label className="title__view-1">Теги PWA</label>
        <CustomSelect placeholder="Выберите теги" />
      </div>
      <div className="flex gap-[22px]">
        <ButtonDefault
          onClickHandler={() => setModalOpen(true)}
          btn_text="Загрузить дизайн"
          btn_classes="btn__orange btn__orange-view-1"
        />
        <ButtonDefault
          btn_text="Открыть коллекцию"
          btn_classes="btn__white btn__orange-view-1"
        />
      </div>
      <div className="bg-white rounded-2 mt-2 pl-4 pr-[19px] pt-3 pb-[30px]"></div>
      <Dialog
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <CollectionCreate onPopupHandler={() => setModalOpen(false)} />
        </div>
      </Dialog>
    </div>
  );
};
