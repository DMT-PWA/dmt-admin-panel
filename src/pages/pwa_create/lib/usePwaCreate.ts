import { useEffect, useState } from "react";
import { CombinedDescription } from "src/entities/pwa_description";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { ICollection, Language } from "src/shared/types";
import { AppDataProps } from "src/shared/types/commonTypes";
import { handleComments, ICommentsState } from "src/entities/comments";
import {
  setLanguage,
  setCountry,
  updateLanguagesList,
  resetState,
} from "src/entities/pwa_design";
import { getPwaByIdAndLanguage } from "src/shared/api/create";
import { shallowEqual } from "react-redux";

type DataByLanguage = {
  language: Language;
  value: {
    descriptionState: CombinedDescription;
    commentState: ICommentsState;
    collectionState: ICollection | null;
  };
};

export const usePwaCreate = (isEdit: boolean) => {
  const dispatch = useAppDispatch();

  const { languagesList, currentLanguage, currentCountry, pwa_title } =
    useAppSelector((state) => state.pwa_design, shallowEqual);
  const descriptionState = useAppSelector((state) => state.pwa_description);

  const commentState = useAppSelector((state) => state.comments);

  const collectionState = useAppSelector((state) => state.collection);

  const [languageDataStates, setLanguageDataStates] = useState<
    DataByLanguage[]
  >([]);

  const [currentDataByLanguage, setCurrentDataByLanguage] =
    useState<DataByLanguage | null>(null);

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
      setLanguageDataStates(() =>
        languagesList.map((item) => ({
          language: item,
          value: { descriptionState, commentState, collectionState: null },
        }))
      );
    }
  }, [languagesList, commentState, descriptionState, collectionState]);

  useEffect(() => {
    languageDataStates.forEach((item) => {
      if (item.language.label === currentLanguage?.label) {
        setCurrentDataByLanguage(item);
      }
    });
  }, [languageDataStates, currentLanguage?.label]);

  const loadDescriptionData = async (
    appId: string,
    lang: string,
    country: string
  ) => {
    const action = await dispatch(
      getPwaByIdAndLanguage({
        appId,
        language: lang,
        country,
      })
    );

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
      collectionId,
      commentId,
      age,
    } = action.payload as unknown as AppDataProps;

    const { icon, screenShots, name } = collectionId;

    const { reviewObject, _id } = commentId;

    setLanguageDataStates((prevStates) =>
      prevStates.map((item) => {
        if (item.language.label === lang) {
          return {
            ...item,
            value: {
              descriptionState: {
                about_description: {
                  description: about ?? "",
                  last_update: lastUpdate ?? new Date(),
                  release_date: releaseDate ?? new Date(),
                  android_version: androidVersion ?? "",
                  version: version ?? "",
                  whats_new: whatsNew ?? "",
                },
                age: age ?? 0,
                title: appTitle ?? "",
                developer_name: appSubTitle ?? "",
                raiting: rating ?? "",
                number_of_downloads: downloadsCount ?? "",
                review_count: reviewCount ?? "",
                checkboxes_state: [
                  { id: 0, value: isContainsAds ?? false },
                  { id: 1, value: isInAppPurchases ?? false },
                  { id: 2, value: isEditorsChoice ?? false },
                ],
              },
              collectionState: {
                _id: _id ?? "",
                collectionImage: icon ?? "",
                images: screenShots ?? [null, null, null, null],
                collectionName: name ?? "",
              },
              commentState: {
                selected_comment: _id ?? "",
                comments_list: [...handleComments(reviewObject)],
                comment_group_name: null,
                all_comments: null,
                comment: null,
              },
            },
          };
        }
        return item;
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
    setLanguageDataStates,
    loadDescriptionData,
    setLoading,
  };
};
