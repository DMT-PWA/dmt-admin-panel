import { FC, useCallback, useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Title } from "src/shared/ui/title";
import { PwaDescriptionForm } from "src/widgets/PwaDescriptionForm";
import { PwaForm } from "src/widgets/PwaForm";
import { PhonePreview } from "src/widgets/PhonePreview";
import { ButtonDefault } from "src/shared/ui/button";
import { Route, Routes, useLocation } from "react-router-dom";
import { PwaComments, PwaCommentsCreate } from "src/widgets/PwaComments";
import { PwaSettings } from "src/widgets/PwaSettings";
import { PwaMetrics } from "src/widgets/PwaMetrics";
import { getDescriptionById } from "src/features/appData/appDataAPI";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { adminId } from "src/shared/lib/data";
import { setCollectionImage } from "src/entities/collection";
import {
  setDeveloperName,
  setTitle,
  updateAboutDescription,
  setNumberOfDownloads,
  setRaiting,
  updateDescription,
} from "src/entities/pwa_description";
import {
  setPwaTitle,
  setCountry,
  setCurrentCollection,
  setLanguage,
  setLanguagesList,
  updateLanguagesList,
} from "src/entities/pwa_design";
import {
  updatePwaByLang,
  getPwaById,
  usePwaCreate,
  finishCreatePWA,
  getPwaByIdAndLanguage,
} from "src/entities/pwa_create";
import { setComments, setSelectedCommentId } from "src/entities/comments";

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
    finishCreateButton,
  } = usePwaCreate(isEdit);

  const [loading] = useState<boolean>(false);

  const {
    currentLanguage,
    currentCountry,
    currentCollection,
    pwa_title,
    languagesList,
  } = useAppSelector((state) => state.pwa_design);

  const { selected_comment } = useAppSelector((state) => state.comments);

  const fetchAppById = useCallback(async () => {
    const { payload } = await dispatch(getPwaById(appId));
    const { appSubTitle, appTitle } = payload;

    dispatch(setPwaTitle(appTitle));
    dispatch(setDeveloperName(appSubTitle));
  }, [appId, dispatch]);

  const fetchDataByCountry = useCallback(
    async (country: string, lang: string) => {
      if (!appId || !country || !lang) return;

      const { payload } = await dispatch(
        getPwaByIdAndLanguage({ appId, language: lang, country })
      );

      const { collectionId, commentId, about, appTitle, appSubTitle } = payload;

      const {
        downloads,
        rating,
        about: descriptionAbout,
      } = await getDescriptionById(about);

      const { name, screenShots, icon } = collectionId;

      const { reviewObject, _id } = commentId;

      dispatch(setComments([...reviewObject]));
      dispatch(setSelectedCommentId(_id));
      dispatch(setTitle(appTitle));
      dispatch(setDeveloperName(appSubTitle));

      // dispatch(fetchDescriptionInfoById(descriptionId));
      dispatch(
        updateAboutDescription({ key: "description", value: descriptionAbout })
      );
      dispatch(setNumberOfDownloads(downloads));
      dispatch(setRaiting(rating));
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
        const { country, language, languagesList } = JSON.parse(lsData);
        dispatch(setCountry(country));
        dispatch(setLanguage(language));
        dispatch(updateLanguagesList(languagesList));
      }
    } else {
      fetchAppById();
      dispatch(setCountry({ label: "Egypt", value: 0 }));
      dispatch(setLanguage({ label: "Arabic", value: 0 }));
      dispatch(setLanguagesList());
    }
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
    if (currentCountry && currentLanguage) {
      localStorage.setItem(
        appId,
        JSON.stringify({
          country: currentCountry,
          language: currentLanguage,
          languagesList,
        })
      );

      dispatch(
        finishCreatePWA({
          adminId: adminId,
          appId: appId,
          country: currentCountry?.label,
          language: currentLanguage?.label,
        })
      );
    }
  };

  const handleSavePwaGeneral = async () => {
    localStorage.setItem(
      appId,
      JSON.stringify({
        country: currentCountry,
        language: currentLanguage,
        languagesList,
      })
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
          appTitle: pwa_title || "",
        })
      );

      return;
    }

    if (pathname.endsWith("description")) {
      const {
        payload: { _id },
      } = await dispatch(
        updateDescription({
          appId,
          ...payload,
          isExist: true,
          country: currentCountry?.label.toLowerCase(),
        })
      );

      dispatch(
        updatePwaByLang({
          appId,
          ...payload,
          isExist: true,
          country: currentCountry?.label.toLowerCase(),
          collectionId: currentCollection?._id,
          about: _id,
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
          commentId: selected_comment,
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
              <TabGroup
                className={"flex-1"}
                onChange={(index) =>
                  dispatch(setLanguage(languagesList[index]))
                }
              >
                <TabList className={"pl-6.5"}>
                  <Tab>{languagesList?.[0].label}</Tab>
                  {languagesList?.[1] && (
                    <Tab className={"ml-6.25"}>{languagesList?.[1]?.label}</Tab>
                  )}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <PwaDescriptionForm
                      adminId={adminId}
                      language={currentLanguage?.label || "English"}
                    />
                  </TabPanel>
                  <TabPanel>
                    <PwaDescriptionForm
                      adminId={adminId}
                      language={currentLanguage?.label || "English"}
                    />
                  </TabPanel>
                </TabPanels>
              </TabGroup>
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
          onClickHandler={handleSavePwaGeneral}
        />
      )}

      {!showSaveButton && (
        <div className="max-w-87.25 flex mt-5.5">
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
              className="btn__default btn__orange btn__orange-view-6 flex gap-3.25 ml-3.25 py-3 pr-2.25 pl-10.5"
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
          {finishCreateButton && (
            <ButtonDefault
              onClickHandler={handleCreate}
              btn_text="Завершить создание"
              btn_classes="btn__orange btn__orange-view-1 ml-3.25"
            />
          )}
        </div>
      )}
    </div>
  );
};
