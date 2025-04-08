import { FC, useEffect, useState } from "react";

import { Title } from "src/shared/ui/title";
import { PwaDescriptionForm } from "src/widgets/PwaDescriptionForm";
import { PwaForm } from "src/widgets/PwaForm";
import { PhonePreview } from "src/widgets/PhonePreview";
import { ButtonDefault } from "src/shared/ui/button";
import { Route, Routes, useLocation } from "react-router-dom";
import { PwaComments, PwaCommentsCreate } from "src/widgets/PwaComments";
import { PwaSettings } from "src/widgets/PwaSettings";
import { PwaMetrics } from "src/widgets/PwaMetrics";
import {
  getPwaById,
  getPwaByIdAndLanguage,
} from "src/features/appData/appDataAPI";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { adminId } from "src/shared/lib/data";
import { setCollectionImage } from "src/entities/collection";
import {
  setTitle,
  setDeveloperName,
  setNumberOfDownloads,
  setRaiting,
  fetchDescriptionInfoById,
  createDescriptionById,
  updateDescription,
} from "src/entities/pwa_description";
import {
  modifiedCountryList,
  setCountry,
  setCurrentCollection,
  setLanguage,
  setLanguagesList,
} from "src/entities/pwa_design";
import { updatePwaByLang } from "src/entities/pwa_create";

type PwaCreateProps = {
  appId: string;
  isEdit?: boolean;
};

export const PwaCreate: FC<PwaCreateProps> = ({ appId, isEdit }) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const { currentLanguage, currentCountry, currentCollection, languagesList } =
    useAppSelector((state) => state.pwa_design);

  const { comment } = useAppSelector((state) => state.comments);

  const { commentId } = comment;

  useEffect(() => {
    setLoading(true);

    fetchAppById();

    setLoading(false);
  }, []);

  useEffect(() => {
    const initData = () => {
      const lsData = localStorage.getItem(appId);
      const defaultCountry = modifiedCountryList.find(
        (item) => item.label === "Egypt"
      ) || { label: "Egypt", value: 0 };

      if (lsData) {
        const { country, language } = JSON.parse(lsData);
        dispatch(setCountry(country));
        if (language) dispatch(setLanguage(language));
        return;
      }

      const initialData = { country: defaultCountry, language: null };
      localStorage.setItem(appId, JSON.stringify(initialData));
      dispatch(setCountry(defaultCountry));
    };

    initData();
    dispatch(setLanguagesList());
  }, [dispatch]);

  useEffect(() => {
    if (languagesList?.length && currentCountry) {
      const englishLang = languagesList.find(
        (item) => item.label === "English"
      );
      const updatedData = { country: currentCountry, language: englishLang };

      localStorage.setItem(appId, JSON.stringify(updatedData));
      dispatch(setLanguage(englishLang));
    }
  }, [currentCountry, languagesList, dispatch]);

  useEffect(() => {
    if (isEdit && currentLanguage && currentCountry) fetchDataByCountry();

    setLoading(false);
  }, [currentLanguage]);

  async function fetchAppById() {
    if (!appId) return;

    const { _id, appTitle, appSubTitle } = await getPwaById(appId);

    if (!_id) return;

    dispatch(setTitle(appTitle));
    dispatch(setDeveloperName(appSubTitle));
  }

  async function fetchDataByCountry() {
    const {
      hundredPlus,
      fourPointThree,
      collectionId,
      descriptionId,
      commentId,
    } = await getPwaByIdAndLanguage(
      appId ?? "",
      currentLanguage?.label ?? "",
      currentCountry?.label ?? ""
    );

    const { name, screenShots, icon } = collectionId;

    dispatch(fetchDescriptionInfoById(descriptionId));

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
  }

  const pathname = useLocation().pathname;

  const shouldShowPhonePreview =
    !loading && !pathname.endsWith("settings") && !pathname.endsWith("metrics");

  const handleSavePwaGeneral = () => {
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
          collectionId: currentCollection._id,
        })
      );

      return;
    }

    if (pathname.endsWith("description")) {
      if (isEdit) {
        dispatch(createDescriptionById(payload));
      }
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

  const isSaveBtnShown = !pathname.endsWith("comments_create");

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
            element={<PwaForm appId={appId} isEdit={isEdit} />}
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
          <Route path="comments" element={<PwaComments />} />
          <Route path="comments_create" element={<PwaCommentsCreate />} />
          <Route path="settings" element={<PwaSettings />} />
          <Route path="metrics" element={<PwaMetrics />} />
          <Route path="*" element={<PwaForm appId={appId} />} />
        </Routes>

        {shouldShowPhonePreview && <PhonePreview />}
      </div>

      {isSaveBtnShown && (
        <ButtonDefault
          btn_text="Сохранить"
          btn_classes="btn__orange btn__orange-view-1 max-w-62.25 mt-5.5"
          onClickHandler={() => handleSavePwaGeneral()}
        />
      )}
    </div>
  );
};
