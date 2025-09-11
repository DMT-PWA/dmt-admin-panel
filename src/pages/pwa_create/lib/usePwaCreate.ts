import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import {
  setLanguage,
  setCountry,
  updateLanguagesList,
  resetState,
} from "src/entities/pwa_design";
import { getPwaByIdAndLanguage } from "src/shared/api/create";
import { shallowEqual } from "react-redux";
import {
  setLanguageData,
  updateCurrentLanguageData,
} from "src/features/languageData";

export const usePwaCreate = (isEdit: boolean) => {
  const dispatch = useAppDispatch();

  const { languagesList, currentLanguage, currentCountry, pwa_title } =
    useAppSelector((state) => state.pwa_design, shallowEqual);
  const descriptionState = useAppSelector((state) => state.pwa_description);

  const commentState = useAppSelector((state) => state.comments);

  const {
    currentLanguageData: currentDataByLanguage,
    languagesData: languageDataStates,
  } = useAppSelector((state) => state.language_data);

  const collectionState = useAppSelector((state) => state.collection);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isEdit) {
      dispatch(resetState());
      dispatch(setCountry({ label: "Egypt", value: "egypt" }));
      dispatch(setLanguage({ label: "Arabic", value: 0 }));
      dispatch(updateLanguagesList([{ label: "Arabic", value: 0 }]));
    }
  }, [isEdit, dispatch]);

  useEffect(() => {
    if (languagesList) {
      dispatch(
        setLanguageData(
          languagesList.map((item) => ({
            language: item,
            value: { descriptionState, commentState, collectionState: null },
          }))
        )
      );
    }
  }, [
    languagesList,
    commentState,
    descriptionState,
    collectionState,
    dispatch,
  ]);

  useEffect(() => {
    if (!languageDataStates) return;
    languageDataStates.forEach((item) => {
      if (item.language && item.language.label === currentLanguage?.label) {
        dispatch(updateCurrentLanguageData(item));
      }
    });
  }, [dispatch, languageDataStates, currentLanguage?.label]);

  const loadDescriptionData = async (
    appId: string,
    lang: string,
    country: string
  ) => {
    await dispatch(
      getPwaByIdAndLanguage({
        appId,
        language: lang,
        country,
      })
    );
  };

  return {
    languageDataStates,
    languagesList,
    descriptionState,
    commentState,
    currentDataByLanguage,
    currentCountry,
    currentLanguage,
    pwa_title,
    loading,
    useAppSelector,
    useEffect,
    useState,
    dispatch,
    loadDescriptionData,
    setLoading,
  };
};
