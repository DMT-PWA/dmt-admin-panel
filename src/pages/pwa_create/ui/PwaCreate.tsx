import { FC, useEffect, useState } from "react";
import { Title } from "src/shared/ui/title";
import { PwaForm } from "src/widgets/PwaForm";
import { PhonePreview } from "src/widgets/PhonePreview";
import { ButtonDefault } from "src/shared/ui/button";
import { Route, Routes } from "react-router-dom";
import { PwaCommentsCreate } from "src/widgets/PwaComments";
import { PwaSettings } from "src/widgets/PwaSettings";
import { PwaMetrics } from "src/widgets/PwaMetrics";
import clsx from "clsx";
import { usePwaCreate } from "../lib/usePwaCreate";
import { usePwaCreateNavigation } from "../lib/usePwaCreateNavigation";
import { LanguagesModal } from "src/widgets/LanguagesModal";
import { PwaTabs } from "./PwaTabs";
import { FormProvider, useForm } from "react-hook-form";

export const PwaCreate: FC = () => {
  const {
    handleNavigateNext,
    handleNavigatePrev,
    goToTable,
    showBackButton,
    showNextButton,
    showSaveButton,
    showPreview,
    finishCreateButton,
    appId,
  } = usePwaCreateNavigation();

  const {
    loading,
    isDisabled,
    saved,
    currentLanguage,
    languagesList,
    activeTabIndex,
    setActiveTabIndex,
    updateLanguagesListHandler,
    handleCreate,
    handleSavePwaGeneral,
    fetchLanguagesData,
    handleTabSwitch,
    removeLanguage,
  } = usePwaCreate(appId);

  const methods = useForm();

  const [isModalOpen, setModal] = useState(false);

  useEffect(() => {
    fetchLanguagesData(appId);
  }, [fetchLanguagesData, appId]);

  useEffect(() => {
    const currentIndex = languagesList?.findIndex(
      (item) => item?.id === currentLanguage?.id
    );

    if (currentIndex !== -1 && typeof currentIndex !== "undefined") {
      setActiveTabIndex(currentIndex);
    }
  }, [currentLanguage, languagesList, setActiveTabIndex]);

  return (
    <div className="container__default">
      <Title
        title={appId ? "Редактирование  PWA" : "Создание PWA"}
        classes="title__default"
        withContainer={!appId}
      />
      {!loading && (
        <FormProvider {...methods}>
          <div className="flex gap-[54px]">
            <Routes>
              <Route
                path="design"
                element={<PwaForm isEdit={appId !== undefined} />}
              />
              {["description", "comments"].map((path) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PwaTabs
                      activeTabIndex={activeTabIndex}
                      appId={appId}
                      handleTabSwitch={handleTabSwitch}
                      languagesList={languagesList}
                      path={path}
                      removeLanguage={removeLanguage}
                      setActiveTabIndex={setActiveTabIndex}
                      setModal={setModal}
                    />
                  }
                />
              ))}
              <Route path="comments_create" element={<PwaCommentsCreate />} />
              <Route
                path="comment_update/:id"
                element={<PwaCommentsCreate />}
              />
              <Route
                path="settings"
                element={<PwaSettings isEdit={appId !== undefined} />}
              />
              <Route path="metrics" element={<PwaMetrics />} />
              <Route path="*" element={<PwaForm />} />
            </Routes>

            {!loading && showPreview && <PhonePreview />}
          </div>
        </FormProvider>
      )}
      {showSaveButton && (
        <ButtonDefault
          btn_text={saved ? "Сохранено" : "Сохранить"}
          btn_classes={clsx(
            "btn__orange btn__orange-view-1 max-w-62.25 mt-5.5",
            (saved || isDisabled) && "pointer-events-none opacity-50"
          )}
          onClickHandler={() => {
            if (saved || isDisabled || !appId) return;
            handleSavePwaGeneral(appId);
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
              onClickHandler={() => handleCreate(goToTable)}
              btn_text="Завершить создание"
              btn_classes="btn__orange btn__orange-view-1 ml-3.25"
            />
          )}
        </div>
      )}
      <LanguagesModal
        isModalOpen={isModalOpen}
        onClose={() => setModal(false)}
        updateLanguagesList={updateLanguagesListHandler}
      />
    </div>
  );
};
