import { FC, useEffect, useState } from "react";
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
import clsx from "clsx";
import { usePwaCreate } from "../lib/usePwaCreate";
import { usePwaCreateNavigation } from "../lib/usePwaCreateNavigation";
import { LanguagesModal } from "src/widgets/LanguagesModal";

type PwaCreateProps = {
  appId?: string;
  isEdit: boolean;
};

export const PwaCreate: FC<PwaCreateProps> = ({ appId, isEdit }) => {
  const {
    languageDataStates,
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
  } = usePwaCreate(isEdit, appId);

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
        title={isEdit ? "Редактирование  PWA" : "Создание PWA"}
        classes="title__default"
        withContainer={!isEdit}
      />
      {!loading && (
        <div className="flex gap-[54px]">
          <Routes>
            <Route path="design" element={<PwaForm isEdit={isEdit} />} />
            {["description", "comments"].map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <TabGroup
                    className={
                      path === "comments" ? "flex-1 mt-[78px]" : "flex-1"
                    }
                    selectedIndex={activeTabIndex}
                    onChange={(index) => {
                      setActiveTabIndex(index);

                      const selectedLanguage = languagesList?.[index];
                      if (selectedLanguage) {
                        handleTabSwitch(selectedLanguage, appId);
                      }
                    }}
                  >
                    <TabList className={"pl-6.5 flex"}>
                      {languagesList?.map((item, ind) => (
                        <Tab key={ind} as="div" className={clsx("ml-6.25")}>
                          {item.short}

                          {languagesList && languagesList.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();

                                if (item.value) {
                                  removeLanguage(item.value);
                                }
                              }}
                              className="ml-5 w-2.75 h-2.75"
                            >
                              <img src="/pwa_icons/clear-icon.png" />
                            </button>
                          )}
                        </Tab>
                      ))}
                      {languageDataStates && languageDataStates.length < 5 && (
                        <Tab
                          datatype="tab-plus"
                          as="div"
                          className={clsx("ml-3.5")}
                          onClick={(e) => {
                            e.preventDefault();

                            setModal(true);
                          }}
                        >
                          <img src="/pwa_icons/crosshair-s.png" alt="" />
                        </Tab>
                      )}
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
            <Route path="settings" element={<PwaSettings isEdit={isEdit} />} />
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
