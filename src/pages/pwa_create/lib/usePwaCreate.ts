import { useCallback, useEffect, useState } from "react";
import { CombinedDescription } from "src/entities/pwa_description";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { Language } from "src/shared/types";
import { AppDataProps } from "src/shared/types/commonTypes";
import { getPwaByIdAndLanguage } from "src/shared/api/create";
import { ICommentsState } from "src/entities/comments";
import { PayloadAction } from "@reduxjs/toolkit";

type DataByLanguage = {
  language: Language;
  value: {
    descriptionState: CombinedDescription;
    commentState: ICommentsState;
  };
};

export const usePwaCreate = () => {
  const dispatch = useAppDispatch();

  const { languagesList, currentLanguage, currentCountry, pwa_title } =
    useAppSelector((state) => state.pwa_design);
  const descriptionState = useAppSelector((state) => state.pwa_description);

  const commentState = useAppSelector((state) => state.comments);

  const [languageDataStates, setLanguageDataStates] = useState<
    DataByLanguage[]
  >([]);

  const [currentDataByLanguage, setCurrentDataByLanguage] =
    useState<DataByLanguage | null>(null);

  useEffect(() => {
    if (languagesList) {
      setLanguageDataStates(() =>
        languagesList.map((item) => ({
          language: item,
          value: { descriptionState, commentState },
        }))
      );

      languageDataStates.forEach((item) => {
        if (item.language.label === currentLanguage?.label) {
          setCurrentDataByLanguage(item);
        }
      });
    }
  }, [languagesList, descriptionState, commentState]);

  const loadDescriptionData = (action: PayloadAction) => {
    setCurrentDataByLanguage(() => {
      const {
        about,
        rating,
        downloadsCount,
        reviewCount,
        version,
        whatsNew,
        androidVersion,
        lastUpdate,
        releaseDate,
        isContainsAds,
        isEditorsChoice,
        isInAppPurchases,
        appTitle,
        appSubTitle,
      } = action.payload as unknown as AppDataProps;

      return {
        ...currentDataByLanguage,
        value: {
          descriptionState: {
            about_description: {
              description: about,
              last_update: lastUpdate,
              release_date: releaseDate,
              android_version: androidVersion,
              version,
              whats_new: whatsNew,
            },
            title: appTitle,
            developer_name: appSubTitle,
            raiting: rating,
            number_of_downloads: downloadsCount,
            review_count: reviewCount,
            checkboxes_state: [
              { id: 0, value: isContainsAds },
              { id: 1, value: isInAppPurchases },
              { id: 2, value: isEditorsChoice },
            ],
          },
        },
      };
    });
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
    useAppSelector,
    useEffect,
    useState,
    dispatch,
    setLanguageDataStates,
    loadDescriptionData,
  };
};
