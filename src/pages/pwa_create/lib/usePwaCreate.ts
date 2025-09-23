import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import {
  updateLanguagesList,
  resetPwaDesignState,
  setLanguage,
} from "src/entities/pwa_design";
import { shallowEqual } from "react-redux";
import {
  selectCurrentLanguageValue,
  setLanguageData,
  resetLanguageDataState,
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
import { addLanguageToPwa } from "src/features/languageData/model/languagesDataThunk";
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
    useAppSelector((state) => state.pwa_design, shallowEqual);
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

  const fetchLanguagesData = useCallback(
    async (appId?: string) => {
      setLoading(true);

      await dispatch(fetchCountries());

      const { languagesResponse } = await dispatch(fetchLanguages()).unwrap();

      if (!isEdit) {
        const defaultLang = languagesResponse.find(
          (el) => el.value === "english"
        );

        dispatch(updateLanguagesList([{ ...defaultLang }]));

        await dispatch(fetchPreviewContent("english"));
      }

      if (appId && isEdit) {
        const { currentCountry, currentLanguage } = await dispatch(
          getPwaById(appId)
        ).unwrap();

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
    [dispatch, isEdit]
  );

  const handleTabSwitch = (language: LanguagesListValue, appId?: string) => {
    setLoading(true);
    dispatch(setLanguage(language));

    try {
      if (isEdit) {
        dispatch(
          getPwaByIdAndLanguage({
            appId,
            language: language.en,
            country: currentCountry?.value,
          })
        );
      } else {
        dispatch(fetchPreviewContent(language.value));
      }
    } finally {
      setLoading(false);
    }
  };

  const setInitLanguageData = useCallback(
    (currentLocation: string) => {
      if (languagesList) {
        dispatch(
          setLanguageData(
            languagesList.map((item) => {
              return {
                language: item,
                value: {
                  descriptionState,
                  commentState,
                  collectionState: null,
                },
              };
            })
          )
        );

        if (!currentLocation.endsWith("design") && !loading) {
          handleTabSwitch(languagesList[languagesList.length - 1]);
        }
      }
    },
    [languagesList, commentState, descriptionState, dispatch]
  );

  const updateLanguagesListHandler = (lang: string) => {
    const selectedLang = languages.find((el) => el.value === lang);

    if (Array.isArray(languagesList)) {
      dispatch(updateLanguagesList([...languagesList, { ...selectedLang }]));
    }

    if (isEdit && appId && selectedLang) {
      dispatch(addLanguageToPwa({ appId, selectedLang }));
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
    setInitLanguageData,
    handleTabSwitch,
  };
};
