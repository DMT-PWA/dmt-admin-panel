import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import {
  updateLanguagesList,
  resetPwaDesignState,
  setLanguage,
} from "src/entities/pwa_design";
import {
  selectCurrentLanguageValue,
  setLanguageData,
  resetLanguageDataState,
  removeLanguageData,
} from "src/features/languageData";
import {
  fetchCountries,
  fetchLanguages,
  fetchPreviewContent,
} from "src/entities/pwa_design/model/pwaDesignThunk";
import { adminId } from "src/shared/lib/data";
import { finishCreatePWA } from "src/entities/pwa_create";
import { fetchPwaUpdate } from "src/entities/pwa_create/model/createPwaThunk";
import { getPwaById, getPwaByIdAndLanguage } from "src/shared/api/create";
import { LanguagesListValue } from "src/shared/types";
import {
  addLanguageToPwa,
  deleteLanguageFromPwa,
} from "src/features/languageData/model/languagesDataThunk";
import { resetSettingsState } from "src/widgets/PwaSettings";
import { resetMetricsState } from "src/entities/metrics";
export const usePwaCreate = (isEdit: boolean, appId?: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetPwaDesignState());
      dispatch(resetLanguageDataState());
      dispatch(resetSettingsState());
      dispatch(resetMetricsState());
    };
  }, [dispatch]);

  const { languagesList, currentCountry, languages, currentLanguage } =
    useAppSelector((state) => state.pwa_design);
  const descriptionState = useAppSelector((state) => state.pwa_description);

  const commentState = useAppSelector((state) => state.comments);

  const currentLanguageValue = useAppSelector(selectCurrentLanguageValue);

  const { languagesData: languageDataStates } = useAppSelector(
    (state) => state.language_data
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [isDisabled, setIsDisabled] = useState(false);

  const [saved, setSaved] = useState(false);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const setInitLanguageData = useCallback(
    (payload: Array<LanguagesListValue>) => {
      dispatch(
        setLanguageData(
          payload.map((item) => ({
            language: item,
            value: {
              descriptionState,
              commentState,
              collectionState: null,
            },
          }))
        )
      );
    },
    [dispatch, descriptionState, commentState]
  );

  const fetchLanguagesData = useCallback(
    async (appId?: string) => {
      setLoading(true);

      await dispatch(fetchCountries());

      const { languagesResponse } = await dispatch(fetchLanguages()).unwrap();

      if (!isEdit) {
        const defaultLang = languagesResponse.find(
          (el) => el.value === "english"
        );

        const { payload } = dispatch(updateLanguagesList([{ ...defaultLang }]));

        setInitLanguageData(payload);

        await dispatch(fetchPreviewContent("english"));
      }

      if (appId && isEdit) {
        const { currentCountry, currentLanguage, languageList } =
          await dispatch(getPwaById(appId)).unwrap();

        if (!languageList) return;

        const { payload } = dispatch(
          updateLanguagesList(
            languageList.map((el) => {
              const mapping = languagesResponse.find(
                (item) => item.en.toLowerCase() === el.label.toLowerCase()
              );

              if (mapping) {
                return {
                  ...mapping,
                };
              }
            })
          )
        );

        setInitLanguageData(payload);

        await dispatch(
          getPwaByIdAndLanguage({
            appId,
            language: currentLanguage,
            country: currentCountry,
          })
        );
      }

      setLoading(false);
    },
    [dispatch, isEdit, setInitLanguageData]
  );

  const handleTabSwitch = useCallback(
    async (language: LanguagesListValue, appId?: string) => {
      setLoading(true);
      dispatch(setLanguage(language));

      try {
        if (isEdit) {
          await dispatch(
            getPwaByIdAndLanguage({
              appId,
              language: language.en,
              country: currentCountry?.value,
            })
          );
        } else {
          await dispatch(fetchPreviewContent(language.value));
        }
      } finally {
        setLoading(false);
      }
    },
    [dispatch, isEdit, currentCountry?.value]
  );

  const updateLanguagesListHandler = useCallback(
    async (lang: string) => {
      const selectedLang = languages.find((el) => el.value === lang);

      setLoading(true);

      if (Array.isArray(languagesList)) {
        const { payload } = dispatch(
          updateLanguagesList([...languagesList, { ...selectedLang }])
        );

        setInitLanguageData(payload);
      }

      try {
        if (selectedLang) {
          if (appId && isEdit) {
            await dispatch(addLanguageToPwa({ appId, selectedLang }));
            await handleTabSwitch(selectedLang, appId);
            return;
          }

          handleTabSwitch(selectedLang);
        }
      } finally {
        setLoading(false);
      }
    },
    [
      appId,
      dispatch,
      isEdit,
      handleTabSwitch,
      languages,
      languagesList,
      setInitLanguageData,
    ]
  );

  const removeLanguage = async (lang: string) => {
    if (appId && isEdit) {
      await dispatch(deleteLanguageFromPwa({ appId, language: lang }));
    }

    if (!languagesList) return;

    const newLangList = languagesList.filter(
      (el) => el.value.toLowerCase() !== lang.toLowerCase()
    );

    const { payload } = dispatch(updateLanguagesList(newLangList));

    const updatedLanguagesData = languageDataStates?.filter(
      (el) => el.language?.value.toLowerCase() !== lang.toLowerCase()
    );

    dispatch(removeLanguageData(updatedLanguagesData));

    if (currentLanguage?.value === lang) {
      await handleTabSwitch(
        payload[payload.length - 1],
        isEdit ? appId : undefined
      );
    }
  };

  const handleCreate = async (callback: () => void) => {
    if (!currentCountry || !languageDataStates) return;

    const createPayload = () => {
      const basePayload = {
        adminId,
        country: currentCountry.label.toLowerCase(),
        language: languageDataStates[0].language?.value || "",
        defaultCountry: currentCountry?.label.toLowerCase(),
        defaultLanguage: languageDataStates[0].language?.value || "",
        currentCountry: currentCountry?.label,
        currentLanguage: languageDataStates[0].language?.value || "",
        languageList: languagesList,
      };

      return {
        payload: basePayload,
        languagesData: languageDataStates,
      };
    };

    const resp = await dispatch(finishCreatePWA(createPayload()));

    if (finishCreatePWA.fulfilled.match(resp)) {
      callback();
    }
  };

  const handleSavePwaGeneral = async (appId: string) => {
    if (!currentCountry || !languagesList) return;

    setIsDisabled(true);

    try {
      if (!currentLanguageValue) return;

      await dispatch(
        fetchPwaUpdate({ id: appId, currentState: currentLanguageValue })
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setIsDisabled(false);
    }
  };

  return {
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
    setInitLanguageData,
    handleTabSwitch,
    removeLanguage,
  };
};
