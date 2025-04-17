import { FC, useCallback, useEffect, useState } from "react";

import { Title } from "src/shared/ui/title";
import { PwaDescriptionForm } from "src/widgets/PwaDescriptionForm";
import { PwaForm } from "src/widgets/PwaForm";
import { PhonePreview } from "src/widgets/PhonePreview";
import { ButtonDefault } from "src/shared/ui/button";
import { Route, Routes, useLocation } from "react-router-dom";
import { PwaComments, PwaCommentsCreate } from "src/widgets/PwaComments";
import { PwaSettings } from "src/widgets/PwaSettings";
import { PwaMetrics } from "src/widgets/PwaMetrics";
import { getPwaByIdAndLanguage } from "src/features/appData/appDataAPI";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { adminId } from "src/shared/lib/data";
import { setCollectionImage } from "src/entities/collection";
import {
  setDeveloperName,
  setNumberOfDownloads,
  setRaiting,
  createDescriptionById,
  updateDescription,
} from "src/entities/pwa_description";
import {
  setPwaTitle,
  setCountry,
  setCurrentCollection,
  setLanguage,
  setLanguagesList,
} from "src/entities/pwa_design";
import {
  updatePwaByLang,
  getPwaById,
  usePwaCreate,
} from "src/entities/pwa_create";
import { setComments } from "src/entities/comments";
import { Language } from "src/shared/types";

type PwaCreateProps = {
  appId: string;
  isEdit?: boolean;
};

export const PwaCreate: FC<PwaCreateProps> = ({ appId, isEdit }) => {
  const dispatch = useAppDispatch();

  const {
    handleNavigateNext,
    handleNavigatePrev,
    showBackButton,
    showNextButton,
    showSaveButton,
    showPreview,
  } = usePwaCreate(isEdit);

  const [loading] = useState<boolean>(false);

  const { currentLanguage, currentCountry, currentCollection, pwa_title } =
    useAppSelector((state) => state.pwa_design);

  const { comment } = useAppSelector((state) => state.comments);

  const { commentId } = comment;

  const fetchAppById = useCallback(async () => {
    const resp = await dispatch(getPwaById(appId));
    const { appSubTitle, appTitle } = resp.payload;

    dispatch(setPwaTitle(appTitle));
    dispatch(setDeveloperName(appSubTitle));
  }, [appId, dispatch]);

  const fetchDataByCountry = useCallback(
    async (country: string, lang: string) => {
      if (!appId || !country || !lang) return;

      const {
        hundredPlus,
        fourPointThree,
        collectionId,
        appSubTitle,
        appTitle,
      } = await getPwaByIdAndLanguage(appId, lang, country);

      const { name, screenShots, icon, reviewObject } = collectionId;

      dispatch(setComments([{ ...reviewObject }]));

      dispatch(setPwaTitle(appTitle));
      dispatch(setDeveloperName(appSubTitle));

      // dispatch(fetchDescriptionInfoById(descriptionId));

      dispatch(setNumberOfDownloads(hundredPlus));
      dispatch(setRaiting(fourPointThree));
      dispatch(setCollectionImage(icon as string));
      dispatch(
        setCurrentCollection({
          collectionImage: icon,
          collectionName: name,
          images: screenShots,
        })
      );
    },
    [appId, dispatch]
  );

  useEffect(() => {
    if (isEdit) {
      const lsData = localStorage.getItem(appId);
      if (lsData) {
        const { country, language } = JSON.parse(lsData);
        dispatch(setCountry(country));
        dispatch(setLanguage(language));
      }
    } else {
      fetchAppById();
      dispatch(setCountry({ label: "Egypt", value: 0 }));
      dispatch(setLanguage({ label: "English", value: 1 }));
    }

    dispatch(setLanguagesList());
  }, [isEdit, appId, fetchAppById, dispatch]);

  useEffect(() => {
    if (isEdit && currentCountry?.label && currentLanguage?.label) {
      fetchDataByCountry(currentCountry.label, currentLanguage.label);
    }
  }, [
    isEdit,
    currentCountry?.label,
    currentLanguage?.label,
    fetchDataByCountry,
  ]);

  const pathname = useLocation().pathname;

  const handleCreate = () => {
    localStorage.setItem(
      appId,
      JSON.stringify({ country: currentCountry, language: currentLanguage })
    );
  };

  const handleSavePwaGeneral = () => {
    localStorage.setItem(
      appId,
      JSON.stringify({ country: currentCountry, language: currentLanguage })
    );

    const payload = {
      adminId,
      language: currentLanguage?.label || "",
    };

    if (pathname.endsWith("design")) {
      dispatch(
        updatePwaByLang({
          appId,
          ...payload,
          isExist: true,
          country: currentCountry?.label.toLowerCase(),
          collectionId: currentCollection?._id,
          appTitle: pwa_title || "",
        })
      );

      return;
    }

    if (pathname.endsWith("description")) {
      if (isEdit) dispatch(createDescriptionById(payload));

      dispatch(
        updateDescription({
          appId,
          ...payload,
          isExist: true,
          country: currentCountry?.label.toLowerCase(),
        })
      );

      return;
    }

    if (pathname.endsWith("comments")) {
      dispatch(
        updatePwaByLang({
          appId,
          ...payload,
          isExist: true,
          country: currentCountry?.label.toLowerCase(),
          commentId,
        })
      );

      return;
    }
  };

  return (
    <div className="container__default">
      <Title
        title={isEdit ? "Редактирование  PWA" : "Создание PWA"}
        classes="title__default"
        withContainer={!isEdit}
      />

      <div className="flex gap-[54px]">
        <Routes>
          <Route
            path="design"
            element={!loading && <PwaForm appId={appId} isEdit={isEdit} />}
          />
          <Route
            path="description"
            element={
              <PwaDescriptionForm
                adminId={adminId}
                language={currentLanguage?.label || "English"}
              />
            }
          />
          <Route path="comments" element={<PwaComments isEdit={isEdit} />} />
          <Route path="comments_create" element={<PwaCommentsCreate />} />
          <Route path="settings" element={<PwaSettings />} />
          <Route path="metrics" element={<PwaMetrics />} />
          <Route path="*" element={<PwaForm appId={appId} />} />
        </Routes>

        {!loading && showPreview && <PhonePreview />}
      </div>

      {showSaveButton && (
        <ButtonDefault
          btn_text="Сохранить"
          btn_classes="btn__orange btn__orange-view-1 max-w-62.25 mt-5.5"
          onClickHandler={() => handleSavePwaGeneral()}
        />
      )}

      {!showSaveButton && (
        <div className="max-w-66.75 flex justify-between mt-5.5">
          {showBackButton && (
            <button
              onClick={handleNavigatePrev}
              className="btn__default btn__gray flex gap-3.25 py-3 pl-2.25 pr-10.5"
            >
              <div className="flex items-center -rotate-90">
                <img src="/pwa_icons/shevron.png" width={20} height={20} />
              </div>
              Назад
            </button>
          )}
          {showNextButton && (
            <button
              onClick={() =>
                handleNavigateNext(() =>
                  dispatch(
                    updateDescription({
                      appId,
                      adminId,
                      language: currentLanguage?.label,
                      country: currentCountry?.label.toLowerCase(),
                    })
                  )
                )
              }
              className="btn__default btn__orange btn__orange-view-6 flex gap-3.25 py-3 pr-2.25 pl-10.5"
            >
              Далее
              <div className="flex items-center">
                <img
                  src="/pwa_icons/shevron-white.png"
                  width={20}
                  height={20}
                />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
