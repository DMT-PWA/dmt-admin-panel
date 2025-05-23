import { FC, useCallback, useEffect } from "react";
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
import {
  CombinedDescription,
  updateDescription,
} from "src/entities/pwa_description";
import { setLanguage } from "src/entities/pwa_design";
import { updatePwaByLang, finishCreatePWA } from "src/entities/pwa_create";
import clsx from "clsx";
import { updateSettings } from "src/widgets/PwaSettings";
import { getPwaById } from "src/shared/api/create";
import { usePwaCreate } from "../lib/usePwaCreate";
import { usePwaCreateNavigation } from "../lib/usePwaCreateNavigation";
import { useAppDispatch } from "src/shared/lib/store";
import { ICommentsState } from "src/entities/comments";
import { ICollection } from "src/shared/types";

type PwaCreateProps = {
  appId: string;
  isEdit: boolean;
};

export const PwaCreate: FC<PwaCreateProps> = ({ appId, isEdit }) => {
  const dispatch = useAppDispatch();

  const fetchAppById = useCallback(
    () => dispatch(getPwaById(appId)),
    [appId, dispatch]
  );

  useEffect(() => {
    if (isEdit) fetchAppById();
  }, [fetchAppById, isEdit]);

  const {
    languageDataStates,
    currentDataByLanguage,
    languagesList,
    commentState,
    descriptionState,
    currentLanguage,
    currentCountry,
    pwa_title,
    loading,
    setLoading,
    useAppSelector,
    loadDescriptionData,
    setLanguageDataStates,
  } = usePwaCreate(isEdit);

  const {
    handleNavigateNext,
    handleNavigatePrev,
    goToTable,
    useLocation,
    showBackButton,
    showNextButton,
    showSaveButton,
    showPreview,
    finishCreateButton,
  } = usePwaCreateNavigation(isEdit);

  const { currentCollection } = useAppSelector((state) => state.collections);

  const { selected_comment } = commentState;

  const { facebookPixelList } = useAppSelector((state) => state.metrics);

  const fetchDataByCountry = useCallback(
    (country: string, lang: string) => {
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

  const pathname = useLocation().pathname;

  const handleCreate = () => {
    if (!currentCountry) return;

    languageDataStates.forEach((item) => {
      dispatch(
        finishCreatePWA({
          payload: {
            adminId: adminId,
            country: currentCountry.label.toLowerCase(),
            language: item.language.label,
            defaultCountry: currentCountry?.label.toLowerCase(),
            defaultLanguage: item.language?.label,
            currentCountry: currentCountry?.label,
            currentLanguage: item.language?.label,
            languageList: languagesList,
          },
          collectionState: item.value.collectionState,
          commentState: item.value.commentState,
          descriptionState: item.value.descriptionState,
        })
      );
    });

    goToTable();
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
          updatePwaByLang({ ...basePayload, displayName: pwa_title || "" })
        ),
      description: () => {
        dispatch(
          updateDescription({
            ...basePayload,
            ...currentDataByLanguage?.value.descriptionState,
          })
        );
        dispatch(
          updatePwaByLang({
            ...basePayload,
            collectionId: currentCollection?._id,
            appSubTitle: descriptionState.developer_name,
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

  const handleTabChange = (index: number) => {
    if (!languagesList) return;

    dispatch(setLanguage(languagesList[index]));
  };

  const handleUpdateField = (
    payload:
      | Partial<CombinedDescription>
      | Partial<ICommentsState>
      | Partial<ICollection>
      | null,
    state: "descriptionState" | "commentState" | "collectionState"
  ) => {
    if (!currentDataByLanguage || !currentLanguage) return;

    setLanguageDataStates((prevStates) =>
      prevStates.map((item) => {
        if (item.language.label === currentLanguage.label) {
          return {
            ...item,
            value: {
              ...item.value,
              [state]:
                payload === null ? null : { ...item.value[state], ...payload },
            },
          };
        }
        return item;
      })
    );
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
              element={
                !loading && (
                  <PwaForm appId={isEdit ? appId : null} isEdit={isEdit} />
                )
              }
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
                          {item.language.label}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels>
                      {languageDataStates?.map((item, ind) => {
                        return (
                          <TabPanel key={ind}>
                            {path === "description" ? (
                              <PwaDescriptionForm
                                key={`desc-${item.language.value}`}
                                adminId={adminId}
                                descriptionState={item.value.descriptionState}
                                collectionState={item.value.collectionState}
                                handleUpdateField={(payload) =>
                                  handleUpdateField(payload, "descriptionState")
                                }
                                handleCollectionUpdate={(payload) =>
                                  handleUpdateField(payload, "collectionState")
                                }
                              />
                            ) : (
                              <PwaComments
                                key={`comments-${item.language.value}`}
                                isEdit={isEdit}
                                commentState={item.value.commentState}
                                handleUpdateField={(payload) =>
                                  handleUpdateField(payload, "commentState")
                                }
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
            <Route path="settings" element={<PwaSettings />} />
            <Route path="metrics" element={<PwaMetrics />} />
            <Route path="*" element={<PwaForm appId={appId} />} />
          </Routes>

          {!loading && showPreview && (
            <PhonePreview value={currentDataByLanguage?.value} />
          )}
        </div>
      )}

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
