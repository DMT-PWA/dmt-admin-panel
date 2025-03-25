import { Dialog, DialogBackdrop } from "@headlessui/react";
import { ChangeEvent, FC, useEffect, useState } from "react";

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
  fetchPwaInfo,
  selectPwaDesignLanguages,
  setLanguage,
} from "src/entities/pwa_design";
import { CollectionsList } from "src/features/collections_list";
import { appData } from "src/shared/lib/data";
import {
  updatePwaByCountryAndLanguage,
  updatePwaGeneral,
} from "src/features/appData/appDataAPI";

export const PwaForm: FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isCollectionsOpen, setCollectionsOpen] = useState<boolean>(false);

  // const { languages } = appData;

  const { pwa_title, collections, languages, currentLanguage } = useAppSelector(
    (state) => state.pwa_design
  );
  const dispatch = useAppDispatch();

  const handleLanguageChange = (selectedOption) => {
    dispatch(setLanguage(selectedOption));
  };

  /* useEffect(() => {
    dispatch(fetchDesignInfo());
  }, []); */

  async function updateDataGeneral() {
    // create end

    console.log("updating app");

    if (!adminId) {
      setErrorMessage("admin Id required");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    if (!appId) {
      setErrorMessage("app Id required");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    const userData = {
      appId,
      adminId,
      icon,
      logo,
      appTitle: pwa_title,
      appSubTitle,
      domain,
      subDomain,
      domainApp,
      domainLanding,
      keitaroDomain,
      keitaroFirstCampaign,
      keitaroSecondCampaign,
      oneSignalApiKey,
      oneSignalAppId,
      pixelId,
      accessToken,
      marketerTag,
      backgroundPhotoMobile,
      backgroundPhotoDesktop,
      //==============={new update}===================================
    };

    if (!adminId) {
      console.log("adminId required");
      return;
    }
    const response = await updatePwaGeneral(userData);

    if (response?._id) {
      await clearDataGeneral(); // clean up all data before setting
      // await fetchAllApps(); //update all pwa list
      setAppData(response);
    }
  }

  async function updateDataByCountryAndLanguage() {
    // create end

    console.log("updating app");

    if (!adminId) {
      setErrorMessage("admin Id required");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    if (!appId) {
      setErrorMessage("app Id required");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    if (!country) {
      setErrorMessage("country required");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    if (!language) {
      setErrorMessage("language required");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    let userData = {
      appId,
      adminId,
      language,
      headerReviews,
      hundredPlus,
      about,
      updatedDate,
      country: country.toLowerCase(),
    };

    if (reviewObject?.length > 0) {
      userData = { ...userData, reviewObject };
    }

    if (screenShots?.length > 0) {
      userData = { ...userData, screenShots };
    }

    if (!adminId) {
      console.log("adminId required");
      return;
    }
    const response = await updatePwaByCountryAndLanguage(userData);

    if (response?._id) {
      await clearDataByCountryAndLanguage(); // clean up all data before setting
      // await fetchAllApps(); //update all pwa list
      setAppData(response);
    }
  }

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

        <CustomSelect
          options={languages}
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
                <div
                  key={index}
                  className="bg-white rounded-2 mt-2 pl-4 pr-[19px] pt-3 pb-[30px]"
                >
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
