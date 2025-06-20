import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateFieldPayload, StateType } from "./types";
import { getPwaByIdAndLanguage } from "src/shared/api/create";
import { AppDataProps } from "src/shared/types";
import {
  createCommentHandler,
  getAllComments,
  getCommentById,
  handleComments,
} from "src/entities/comments";

const updateLanguageHelper = (
  state: StateType,
  fieldState: UpdateFieldPayload["state"],
  payload: UpdateFieldPayload["payload"],
  currentLanguage: string
) => {
  if (!state.languagesData) return state;

  const updatedLanguagesData = state.languagesData.map((item) => {
    if (item.language?.label === currentLanguage) {
      return {
        ...item,
        value: {
          ...item.value,
          [fieldState]:
            payload === null ? null : { ...item.value[fieldState], ...payload },
        },
      };
    }
    return item;
  });

  let updatedCurrentLanguageData = state.currentLanguageData;
  if (state.currentLanguageData?.language?.label === currentLanguage) {
    updatedCurrentLanguageData = {
      ...state.currentLanguageData,
      value: {
        ...state.currentLanguageData.value,
        [fieldState]:
          payload === null
            ? null
            : { ...state.currentLanguageData.value[fieldState], ...payload },
      },
    };
  }

  return {
    ...state,
    languagesData: updatedLanguagesData,
    currentLanguageData: updatedCurrentLanguageData,
  };
};

const initialState: StateType = {
  languagesData: null,
  currentLanguageData: null,
};

const languageDataSlice = createSlice({
  name: "languageData",
  initialState,
  reducers: {
    setLanguageData: (state, action) => {
      state.languagesData = action.payload;
    },
    updateCurrentLanguageData: (state, action) => {
      state.currentLanguageData = action.payload;
    },
    updateLanguageData: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { state: fieldState, payload, currentLanguage } = action.payload;

      return updateLanguageHelper(state, fieldState, payload, currentLanguage);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPwaByIdAndLanguage.fulfilled, (state, action) => {
      const { language } = action.meta.arg;
      const payload = action.payload as AppDataProps;

      const {
        about: description = "",
        rating: raiting = "",
        downloadsCount,
        reviewCount,
        version = "",
        whatsNew: whats_new = "",
        androidVersion: android_version = "",
        lastUpdate: last_update = new Date(),
        releaseDate: release_date = new Date(),
        isContainsAds,
        isEditorsChoice,
        isInAppPurchases,
        appTitle,
        appSubTitle,
        collectionId,
        commentId,
        age,
      } = payload;

      const {
        icon: collectionImage = "",
        screenShots: images = [null, null, null, null],
        name,
        _id: collection_id = "",
      } = collectionId || {};
      const { reviewObject, _id = "" } = commentId || {};

      if (!state.languagesData) return;

      state.languagesData = state.languagesData.map((item) => {
        if (item.language?.label === language) {
          return {
            ...item,
            value: {
              descriptionState: {
                about_description: {
                  description,
                  last_update,
                  release_date,
                  android_version,
                  version,
                  whats_new,
                },
                age: age ?? 0,
                title: appTitle ?? "",
                developer_name: appSubTitle ?? "",
                raiting,
                number_of_downloads: downloadsCount ?? "",
                review_count: reviewCount ?? "",
                checkboxes_state: [
                  { id: 0, value: isContainsAds ?? false },
                  { id: 1, value: isInAppPurchases ?? false },
                  { id: 2, value: isEditorsChoice ?? false },
                ],
              },
              collectionState: {
                _id: collection_id,
                collectionImage,
                images,
                collectionName: name ?? "",
              },
              commentState: {
                selected_comment: _id ?? "",
                comments_list: handleComments(reviewObject || []),
                comment_group_name: null,
                all_comments: null,
                comment: null,
              },
            },
          };
        }
        return item;
      });
    });

    builder
      .addCase(getAllComments.fulfilled, (state, action) => {
        const language = action.meta.arg;

        return updateLanguageHelper(
          state,
          "commentState",
          { all_comments: action.payload },
          language
        );
      })
      .addCase(getCommentById.fulfilled, (state, action) => {
        const { language } = action.meta.arg;

        return updateLanguageHelper(
          state,
          "commentState",
          {
            comment_group_name: action.payload.name,
            comments_list: handleComments(action.payload.reviewObject),
          },
          language
        );
      })
      .addCase(createCommentHandler.fulfilled, (state, action) => {
        const { language } = action.meta.arg;

        return updateLanguageHelper(
          state,
          "commentState",
          {
            comment: state.currentLanguageData?.value.commentState.comment
              ? {
                  ...state.currentLanguageData?.value.commentState.comment,
                  commentId: action.payload._id,
                }
              : null,
          },
          language
        );
      });
  },
});

export default languageDataSlice.reducer;

export const {
  setLanguageData,
  updateCurrentLanguageData,
  updateLanguageData,
} = languageDataSlice.actions;
