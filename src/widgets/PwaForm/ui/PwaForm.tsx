import { Dialog, DialogBackdrop } from "@headlessui/react";
import { ChangeEvent, FC, useEffect, useState } from "react";

import { setCurrentCollection, setPwaTitle } from "src/entities/pwa_design";
import { CollectionCreate } from "src/features/collection_create";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";
import {
  removeCollection,
  setLanguage,
  setLanguagesList,
  setCountry,
} from "src/entities/pwa_design";
import { CollectionsList } from "src/features/collections_list";
import { useNavigate } from "react-router-dom";
import { modifiedCountryList, addCollection } from "src/entities/pwa_design";
import { Country, ICollection } from "src/shared/types";
import {
  createCollection,
  getAllCollections,
} from "src/features/appData/appDataAPI";
import { adminId } from "src/shared/lib/data";
type PwaFormProps = {
  appId: string;
  isEdit?: boolean;
};

export const PwaForm: FC<PwaFormProps> = ({ appId, isEdit = false }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isCollectionsOpen, setCollectionsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    pwa_title,
    collections,
    languages,
    currentLanguage,
    languagesList,
    currentCountry,
    currentCollection,
  } = useAppSelector((state) => state.pwa_design);
  const dispatch = useAppDispatch();

  const handleLanguageChange = (selectedOption) => {
    dispatch(setLanguage(selectedOption));
  };

  const handleCountryChange = (option: Country) => {
    dispatch(setCountry(option));
  };

  const handleNavigate = () => {
    return navigate("/pwa");
  };
  const lsData = localStorage.getItem(appId);

  useEffect(() => {
    const initCountry = modifiedCountryList.find(
      (item) => item.label === "Egypt"
    ) || { label: "Egypt", value: 0 };

    if (lsData) {
      const { country, language } = JSON.parse(lsData);
      dispatch(setCountry(country));
      if (language) dispatch(setLanguage(language));

      return;
    }
    const initialData = {
      country: initCountry,
      language: null,
    };
    localStorage.setItem(appId, JSON.stringify(initialData));
    dispatch(setCountry(initCountry));
  }, []);

  useEffect(() => {
    dispatch(setLanguagesList());
  }, []);

  useEffect(() => {
    if (languagesList && currentCountry && languagesList?.length > 0) {
      const englishLang = languagesList.find(
        (item) => item.label === "English"
      );
      const currentLang = englishLang;

      const updatedData = {
        country: currentCountry,
        language: currentLang,
      };

      localStorage.setItem(appId, JSON.stringify(updatedData));
      dispatch(setLanguage(currentLang));
    }
  }, [currentCountry, dispatch]);

  useEffect(() => {
    getAllCollections().then((collections) => {
      if (collections && collections.length > 0) {
        collections.forEach(({ icon, screenShots, name, _id }) => {
          return dispatch(
            addCollection({
              _id,
              collectionImage: icon,
              images: screenShots,
              collectionName: name,
            })
          );
        });
      }
    });
  }, []);

  const onSetPwaTitle = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setPwaTitle(e.target.value));

  const collectionCreateHandler = async ({
    collectionImage,
    collectionName,
    images,
  }: ICollection) => {
    await createCollection({
      adminId,
      name: collectionName,
      icon: collectionImage,
      screenShots: images,
    });
  };

  return (
    <div className="flex flex-col flex-1">
      {isEdit && (
        <div className="container__view-1 justify-between mt-5.5 mb-6.5 !py-3 px-9.5">
          <div className="flex gap-37.5">
            <div>
              <strong className="text-view-12">iD:</strong>
              <span className="text-view-12 text-orange"> {appId}</span>
            </div>
            <div>
              <strong className="text-view-12">Название:</strong>
              <span className="text-view-12 text-orange"> Plinko OLZ NL</span>
            </div>
          </div>
          <ButtonDefault
            btn_text="Вернуться назад"
            btn_classes="btn__default btn-view-2"
            onClickHandler={handleNavigate}
            withArrow
          />
        </div>
      )}
      <div className="container__view-2 flex-col px-7 pb-17.5 h-max">
        <Title title="Дизайн" withContainer={false} classes="title__view-2" />
        <div className="flex flex-col gap-6">
          <InputDefault
            value={pwa_title ?? ""}
            label="Название PWA"
            input_classes="!border-0"
            placeholder="..."
            onUpdateValue={onSetPwaTitle}
          />
          <label className="title__view-1">Страна PWA</label>

          <CustomSelect
            options={modifiedCountryList}
            value={currentCountry}
            onChange={handleCountryChange}
            placeholder="Английский"
          />
          <label className="title__view-1">Язык интерфейса PWA</label>

          <CustomSelect
            options={languagesList}
            value={currentLanguage}
            onChange={handleLanguageChange}
            placeholder="Английский"
          />
          <label className="title__view-1">Теги PWA</label>
          <CustomSelect placeholder="Выберите теги" />
        </div>
        <div className="flex gap-[22px]">
          <ButtonDefault
            onClickHandler={() => setModalOpen(true)}
            btn_text="Загрузить дизайн"
            btn_classes="btn__orange btn__orange-view-1"
          />
          {collections.length > 0 && (
            <ButtonDefault
              btn_text="Открыть коллекцию"
              btn_classes="btn__white btn__white-view-4 text-view-3"
              onClickHandler={() => setCollectionsOpen(true)}
            />
          )}
        </div>
        {currentCollection && (
          <div className="bg-white rounded-2 mt-2 pl-4 pr-[19px] pt-3 pb-[30px]">
            <div className="flex gap-9.75">
              <div className="flex flex-col justify-between">
                <img
                  src={currentCollection.collectionImage}
                  style={{ maxHeight: "92px", borderRadius: "10px" }}
                  width={92}
                  height={92}
                />
                <ButtonDefault
                  btn_text="Удалить"
                  btn_classes="btn__orange btn__orange-view-4"
                  onClickHandler={() => dispatch(setCurrentCollection(null))}
                />
              </div>
              {currentCollection.images.map((el: string | null, index) => {
                return el ? (
                  <div key={index} className="flex  h-full">
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
        )}
        <Dialog
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          className="relative z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <CollectionCreate
              onPopupHandler={() => setModalOpen(false)}
              collectionCreateHandler={(val) => collectionCreateHandler(val)}
            />
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
    </div>
  );
};
