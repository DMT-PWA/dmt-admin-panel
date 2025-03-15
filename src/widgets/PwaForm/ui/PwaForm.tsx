import { Dialog, DialogBackdrop } from "@headlessui/react";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";

import { setPwaTitle } from "src/entities/pwa_design";
import { CollectionCreate } from "src/features/collection_create";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";
import {
  removeCollection,
  fetchDesignInfo,
  setChanged,
} from "src/entities/pwa_design";
import { CollectionsList } from "src/features/collections_list";

export const PwaForm: FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isCollectionsOpen, setCollectionsOpen] = useState<boolean>(false);

  const { pwa_title, collections, languages } = useAppSelector(
    (state) => state.pwa_design
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDesignInfo());
  }, []);

  useMemo(() => {
    dispatch(setChanged(true));
  }, [pwa_title]);
  const onSetPwaTitle = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setPwaTitle(e.target.value));

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-17.5 h-max">
      <Title title="Дизайн" withContainer={false} classes="title__view-2" />
      <div className="flex flex-col gap-6">
        <InputDefault
          value={pwa_title}
          label="Название PWA"
          input_classes="!border-0"
          placeholder="..."
          onUpdateValue={onSetPwaTitle}
        />
        <label className="title__view-1">Язык интерфейса PWA</label>

        <CustomSelect options={languages} placeholder="Английский" />
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
          btn_classes="btn__white btn__white-view-4 text-view-3"
          onClickHandler={() => setCollectionsOpen(true)}
        />
      </div>
      {collections.length > 0
        ? collections.map(
            (
              {
                collectionImage,
                images,
              }: {
                collectionImage: string;
                images: (string | null)[];
              },
              index: number
            ) => {
              return (
                <div className="bg-white rounded-2 mt-2 pl-4 pr-[19px] pt-3 pb-[30px]">
                  <div key={index} className="flex gap-9.75">
                    <div className="flex flex-col justify-between">
                      <img
                        src={collectionImage}
                        style={{ maxHeight: "92px", borderRadius: "10px" }}
                        width={92}
                        height={92}
                      />
                      <ButtonDefault
                        btn_text="Удалить"
                        btn_classes="btn__orange btn__orange-view-4"
                        onClickHandler={() => dispatch(removeCollection(index))}
                      />
                    </div>
                    {images.map((el: string | null, index) => {
                      return el ? (
                        <div key={index} className="flex w-full h-full">
                          <img
                            src={el}
                            alt="Uploaded"
                            className="max-w-28.75 min-h-57 rounded-[11px]"
                          />
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              );
            }
          )
        : null}
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
      <Dialog
        open={isCollectionsOpen}
        onClose={() => setCollectionsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <CollectionsList onPopupHandler={() => setCollectionsOpen(false)} />
        </div>
      </Dialog>
    </div>
  );
};
