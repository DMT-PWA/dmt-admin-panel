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
  updatePwa,
  updatePwaByCountryAndLanguage,
  updatePwaGeneral,
} from "src/features/appData/appDataAPI";
import { useAppSelector } from "src/shared/lib/store";
import { adminId } from "src/shared/lib/data";
import { setCollectionImage } from "src/entities/collection";
import { useDispatch } from "react-redux";
import {
  setTitle,
  setDeveloperName,
  setNumberOfDownloads,
  setRaiting,
  updateAboutDescription,
} from "src/entities/pwa_description";
type PwaCreateProps = {
  appId: string | undefined;
  isEdit?: boolean;
};

export const PwaCreate: FC<PwaCreateProps> = ({ appId, isEdit = false }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const { currentLanguage, currentCountry, currentCollection } = useAppSelector(
    (state) => state.pwa_design
  );

  const { number_of_downloads, about_description } = useAppSelector(
    (state) => state.pwa_description
  );

  const { collectionImage } = useAppSelector((state) => state.collection);

  const { description } = about_description;

  useEffect(() => {
    setLoading(true);
    fetchAppById();
  }, [appId]);

  useEffect(() => {
    if (currentLanguage && currentCountry) {
      fetchDataByCountry();
    }
    setLoading(false);
  }, [currentLanguage]);

  async function fetchAppById() {
    if (!appId) return;

    const { logo, _id, appTitle, appSubTitle } = await getPwaById(appId);

    if (_id) {
      dispatch(setCollectionImage(logo as string));
      dispatch(setTitle(appTitle));
      dispatch(setDeveloperName(appSubTitle));
    }
  }

  const fetchDataByCountry = async () => {
    const { hundredPlus, fourPointThree, about } = await getPwaByIdAndLanguage(
      appId ?? "",
      currentLanguage?.label ?? "",
      currentCountry?.label ?? ""
    );

    dispatch(setNumberOfDownloads(hundredPlus));
    dispatch(setRaiting(fourPointThree));
    dispatch(updateAboutDescription({ key: "description", value: about }));
  };

  const { title, developer_name } = useAppSelector(
    (state) => state.pwa_description
  );

  const pathname = useLocation().pathname;

  const shouldShowPhonePreview =
    currentLanguage &&
    !loading &&
    !pathname.endsWith("settings") &&
    !pathname.endsWith("metrics");

  const handleSavePwaGeneral = async () => {
    return await updatePwa({
      appId,
      adminId,
      language: currentLanguage?.label,
      country: currentCountry?.label.toLowerCase(),
      appTitle: title,
      logo: collectionImage,
      appSubTitle: developer_name,
      hundredPlus: number_of_downloads,
      about: description,
      collectionId: currentCollection?._id,
    });
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
          <Route path="description" element={<PwaDescriptionForm />} />
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
