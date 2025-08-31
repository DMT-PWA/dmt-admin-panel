import { FC, useCallback, useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Title } from "src/shared/ui/title";
import { PwaDescriptionForm } from "src/widgets/PwaDescriptionForm";
import { PwaForm } from "src/widgets/PwaForm";
import { PhonePreview } from "src/widgets/PhonePreview";
import { ButtonDefault } from "src/shared/ui/button";
import { Route, Routes } from "react-router-dom";
import { PwaComments, PwaCommentsCreate } from "src/widgets/PwaComments";
import { PwaSettings } from "src/widgets/PwaSettings";
import { PwaMetrics } from "src/widgets/PwaMetrics";
import { adminId } from "src/shared/lib/data";
import { setLanguage } from "src/entities/pwa_design";
import { finishCreatePWA } from "src/entities/pwa_create";
import clsx from "clsx";
import { getPwaById } from "src/shared/api/create";
import { usePwaCreate } from "../lib/usePwaCreate";
import { usePwaCreateNavigation } from "../lib/usePwaCreateNavigation";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { selectLanguage } from "src/features/languageData";

type PwaCreateProps = {
  appId?: string;
  isEdit: boolean;
};

export const PwaCreate: FC<PwaCreateProps> = ({ appId, isEdit }) => {
  const dispatch = useAppDispatch();

  const language = useAppSelector(selectLanguage);

  const fetchAppById = useCallback(() => {
    if (appId) dispatch(getPwaById(appId));
  }, [appId, dispatch]);

  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isEdit) fetchAppById();
  }, [fetchAppById, isEdit]);

  const {
    languageDataStates,
    currentDataByLanguage,
    languagesList,
    currentLanguage,
    currentCountry,
    loading,
    setLoading,
    loadDescriptionData,
  } = usePwaCreate(isEdit);

  const {
    handleNavigateNext,
    handleNavigatePrev,
    goToTable,
    showBackButton,
    showNextButton,
    showSaveButton,
    showPreview,
    finishCreateButton,
  } = usePwaCreateNavigation(isEdit);

  const fetchDataByCountry = useCallback(
    (country: string, lang: string) => {
      if (!appId) return;

      setLoading(true);

      loadDescriptionData(appId, lang, country);

      setLoading(false);
    },
    [appId, dispatch, setLoading]
  );

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

  const handleCreate = async () => {
    if (!currentCountry || !languageDataStates) return;

    const createPayload = (index: number, appId?: string) => {
      const basePayload = {
        adminId,
        country: currentCountry.label.toLowerCase(),
        language: languageDataStates[index].language?.label as string,
        defaultCountry: currentCountry?.label.toLowerCase(),
        defaultLanguage: languageDataStates[index].language?.label as string,
        currentCountry: currentCountry?.label,
        currentLanguage: languageDataStates[index].language?.label as string,
        languageList: languagesList,
      };

      return {
        payload: appId !== undefined ? { ...basePayload, appId } : basePayload,
        collectionState: languageDataStates[index].value.collectionState,
        commentState: languageDataStates[index].value.commentState,
        descriptionState: languageDataStates[index].value.descriptionState,
      };
    };

    const result = await dispatch(finishCreatePWA(createPayload(0)));

    if (
      finishCreatePWA.fulfilled.match(result) &&
      languageDataStates.length === 2
    ) {
      dispatch(finishCreatePWA(createPayload(1, result.payload._id)));
    }

    goToTable();
  };

  const handleSavePwaGeneral = async () => {
    if (!currentCountry || !currentDataByLanguage || !language) return;

    const createPayload = {
      payload: {
        adminId,
        country: currentCountry.label.toLowerCase(),
        language,
        defaultCountry: currentCountry?.label.toLowerCase(),
        defaultLanguage: language,
        currentCountry: currentCountry?.label,
        currentLanguage: language,
        languageList: languagesList,
        appId,
      },
      collectionState: currentDataByLanguage.value.collectionState,
      commentState: currentDataByLanguage.value.commentState,
      descriptionState: currentDataByLanguage.value.descriptionState,
    };

    const response = await dispatch(finishCreatePWA(createPayload));

    if (finishCreatePWA.fulfilled.match(response)) {
      setSaved(true);

      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleTabChange = (index: number) => {
    if (!languagesList) return;

    dispatch(setLanguage(languagesList[index]));
  };

  return (
    <div className="container__default">
      <Title
        title={isEdit ? "Редактирование  PWA" : "Создание PWA"}
        classes="title__default"
        withContainer={!isEdit}
      />

      {currentDataByLanguage && (
        <div className="flex gap-[54px]">
          <Routes>
            <Route
              path="design"
              element={!loading && <PwaForm isEdit={isEdit} />}
            />
            {["description", "comments"].map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <TabGroup
                    className={
                      path === "comments" ? "flex-1 mt-[78px]" : "flex-1"
                    }
                    onChange={handleTabChange}
                  >
                    <TabList className={"pl-6.5"}>
                      {languageDataStates?.map((item, ind) => (
                        <Tab
                          key={ind}
                          className={clsx({ "ml-6.25": ind === 1 })}
                        >
                          {item.language?.label}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels>
                      {languageDataStates?.map((item, ind) => {
                        return (
                          <TabPanel key={ind}>
                            {path === "description" ? (
                              <PwaDescriptionForm
                                key={`desc-${item.language?.value}`}
                                adminId={adminId}
                              />
                            ) : (
                              <PwaComments
                                key={`comments-${item.language?.value}`}
                              />
                            )}
                          </TabPanel>
                        );
                      })}
                    </TabPanels>
                  </TabGroup>
                }
              />
            ))}
            <Route path="comments_create" element={<PwaCommentsCreate />} />
            <Route path="comment_update/:id" element={<PwaCommentsCreate />} />
            <Route path="settings" element={<PwaSettings />} />
            <Route path="metrics" element={<PwaMetrics />} />
            <Route path="*" element={<PwaForm />} />
          </Routes>

          {!loading && showPreview && <PhonePreview />}
        </div>
      )}

      {showSaveButton && (
        <ButtonDefault
          btn_text={saved ? "Сохранено" : "Сохранить"}
          btn_classes={clsx(
            "btn__orange btn__orange-view-1 max-w-62.25 mt-5.5",
            saved && "pointer-events-none"
          )}
          onClickHandler={() => {
            if (saved) return;
            handleSavePwaGeneral();
          }}
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
