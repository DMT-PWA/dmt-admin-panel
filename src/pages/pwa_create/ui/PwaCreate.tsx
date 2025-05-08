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
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { adminId } from "src/shared/lib/data";
import {
  batchUpdate,
  updateDescription,
  resetState,
} from "src/entities/pwa_description";
import {
  setPwaTitle,
  setCountry,
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
  UpdatePwaPayload,
} from "src/entities/pwa_create";
import clsx from "clsx";
import { getCollection } from "src/features/collections_list";
import { setComments, setSelectedCommentId } from "src/entities/comments";
import { updateSettings } from "src/widgets/PwaSettings";

type PwaCreateProps = {
  appId: string;
  isEdit?: boolean;
};

export const PwaCreate: FC<PwaCreateProps> = ({ appId, isEdit }) => {
  const dispatch = useAppDispatch();

  const {
    handleNavigateNext,
    handleNavigatePrev,
    goToTable,
    showBackButton,
    showNextButton,
    showSaveButton,
    showPreview,
    currentRoute,
    finishCreateButton,
  } = usePwaCreate(isEdit);

  const [loading, setLoading] = useState<boolean>(false);

  const { currentLanguage, currentCountry, pwa_title, languagesList } =
    useAppSelector((state) => state.pwa_design);

  const { currentCollection, collectionsList } = useAppSelector(
    (state) => state.collections
  );

  const { developer_name } = useAppSelector((state) => state.pwa_description);

  const { selected_comment } = useAppSelector((state) => state.comments);

  const { facebookPixelList } = useAppSelector((state) => state.metrics);

  const fetchAppById = useCallback(async () => {
    const { payload } = (await dispatch(getPwaById(appId))) as {
      payload: UpdatePwaPayload;
    };

    const {
      appTitle,
      currentCountry: country,
      currentLanguage: language,
      languageList: list,
    } = payload;

    dispatch(setCountry({ label: country, value: 0 }));
    dispatch(setLanguage({ label: language, value: 0 }));
    dispatch(updateLanguagesList(list));

    dispatch(setPwaTitle(appTitle));
  }, [appId, dispatch]);

  const fetchDataByCountry = useCallback(
    async (country: string, lang: string) => {
      if (!appId || !country || !lang) return;

      setLoading(true);

      const { payload } = await dispatch(
        getPwaByIdAndLanguage({ appId, language: lang, country })
      );

      dispatch(setPwaTitle(payload.displayName));

      dispatch(batchUpdate({ developer_name: payload.appSubTitle }));

      dispatch(getCollection(payload.collectionId));

      const { reviewObject, _id } = payload.commentId;

      dispatch(setComments([...reviewObject]));

      dispatch(setSelectedCommentId(_id));

      setLoading(false);
    },
    [appId, dispatch]
  );

  useEffect(() => {
    if (isEdit) {
      fetchAppById();

      const lsData = localStorage.getItem(appId);
      if (lsData) {
        const { country, language, languagesList } = JSON.parse(lsData);
        dispatch(setCountry(country));
        dispatch(setLanguage(language));
        dispatch(updateLanguagesList(languagesList));
      }
    }
    if (!isEdit && !currentCountry && !currentLanguage && !languagesList) {
      dispatch(setCountry({ label: "Egypt", value: 0 }));
      dispatch(setLanguage({ label: "Arabic", value: 0 }));
      dispatch(setLanguagesList());
    }
  }, [isEdit, appId, dispatch, fetchAppById]);

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
    if (currentLanguage && currentCountry) {
      dispatch(
        finishCreatePWA({
          adminId: adminId,
          country: currentCountry?.label.toLowerCase(),
          language: currentLanguage?.label,
          defaultCountry: currentCountry?.label.toLowerCase(),
          defaultLanguage: currentLanguage?.label,
          currentCountry: currentCountry?.label,
          currentLanguage: currentLanguage?.label,
          languageList: languagesList,
        })
      );

      goToTable();
    }
  };

  const handleSavePwaGeneral = () => {
    const basePayload = {
      adminId,
      appId,
      isExist: true,
      language: currentLanguage?.label || "",
      country: currentCountry?.label.toLowerCase(),
      currentCountry: currentCountry?.label,
      currentLanguage: currentLanguage?.label,
      languageList: languagesList,
    };

    const pathActions = {
      design: () =>
        dispatch(
          updatePwaByLang({ ...basePayload, appTitle: pwa_title || "" })
        ),
      description: () => {
        dispatch(updateDescription(basePayload));
        dispatch(
          updatePwaByLang({
            ...basePayload,
            collectionId: currentCollection?._id,
            appSubTitle: developer_name,
          })
        );
      },
      comments: () =>
        dispatch(
          updatePwaByLang({ ...basePayload, commentId: selected_comment })
        ),
      settings: () => dispatch(updateSettings(basePayload)),
      metrics: () =>
        dispatch(
          updatePwaByLang({
            ...basePayload,
            pixelId: facebookPixelList[0].pixel,
            accessToken: facebookPixelList[0].token,
          })
        ),
    };

    const pathKey = Object.keys(pathActions).find((key) =>
      pathname.endsWith(key)
    );
    if (pathKey) pathActions[pathKey]();
  };

  const fullDescription = useAppSelector((state) => state.pwa_description);

  const handleTabChange = (index: number) => {
    if (!languagesList) return;

    /* const prev_description = { ...fullDescription };

    dispatch(resetState());

    languagesList.forEach((item) => {
      localStorage.setItem(
        currentRoute,
        JSON.stringify({
          [item.label]: prev_description,
          [currentLanguage?.label]: { ...fullDescription },
        })
      );
    }); */

    dispatch(setLanguage(languagesList[index]));
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
            element={
              !loading && (
                <PwaForm appId={isEdit ? appId : null} isEdit={isEdit} />
              )
            }
          />
          <Route
            path="description"
            element={
              <TabGroup className={"flex-1"} onChange={handleTabChange}>
                <TabList className={"pl-6.5"}>
                  {languagesList?.map((item, ind) => {
                    return (
                      <Tab
                        key={item.value}
                        className={clsx({ "ml-6.25": ind === 1 })}
                      >
                        {item.label}
                      </Tab>
                    );
                  })}
                </TabList>
                <TabPanels>
                  {languagesList?.map((item) => {
                    return (
                      <TabPanel key={item.value}>
                        <PwaDescriptionForm
                          adminId={adminId}
                          language={currentLanguage?.label || "English"}
                        />
                      </TabPanel>
                    );
                  })}
                </TabPanels>
              </TabGroup>
            }
          />
          <Route
            path="comments"
            element={
              <TabGroup
                className={"flex-1 mt-[78px]"}
                onChange={handleTabChange}
              >
                <TabList className={"pl-6.5"}>
                  {languagesList?.map((item, ind) => {
                    return (
                      <Tab
                        key={item.value}
                        className={clsx({ "ml-6.25": ind === 1 })}
                      >
                        {item.label}
                      </Tab>
                    );
                  })}
                </TabList>
                <TabPanels>
                  {languagesList?.map((item) => {
                    return (
                      <TabPanel key={item.value}>
                        <PwaComments isEdit={isEdit} />
                      </TabPanel>
                    );
                  })}
                </TabPanels>
              </TabGroup>
            }
          />
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
              onClick={handleNavigateNext}
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
