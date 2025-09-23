import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { adminId } from "src/shared/lib/data";
import { AppDataProps, LanguagesListValue } from "src/shared/types";

export const addLanguageToPwa = createAsyncThunk<
  AppDataProps,
  { appId: string; selectedLang: LanguagesListValue },
  { state: RootState }
>("pwa/addLanguageToPwa", async (payload, { getState }) => {
  const state = getState();

  const { appId, selectedLang } = payload;

  const { languagesData } = state.language_data;

  const fullPayload = {
    appId,
    adminId,
    language: selectedLang?.value as string,
    isDefault: false,
    currentInfo: {
      label: selectedLang?.value,
      value: selectedLang?.id,
      isDefault: false,
      info: {
        updatedDate: new Date(),
        isExist: true,
        collectionId: languagesData?.[0].value.collectionState?._id,
        commentId: languagesData?.[0].value.commentState.selected_comment,
        about:
          "Melbet™ est une application de casino mobile captivante développée par la plateforme de jeux Melbet™, offrant une vaste gamme de jeux de haut niveau pour le divertissement et les gains financiers. Réservez votre place dès maintenant et recevez un bonus de bienvenue spécial pour démarrer votre quête de maximisation des gains ! Vivez l'attrait des jeux de casino avec Melbet™, où les tours gratuits et les généreux bonus de dépôt augmentent considérablement vos chances de gain. Cette application présente une sélection diversifiée de jeux aux thèmes uniques, aux graphiques supérieurs et aux animations captivantes. Garantissez des paiements sécurisés et sans tracas, et profitez du jeu quand et où vous le souhaitez, grâce à notre interface mobile intuitive. Melbet™ est la destination ultime pour ceux qui chérissent la fortune et les frissons. Embarquez dans cette aventure gagnante avec nous dès aujourd'hui !",
        isContainsAds: true,
        isInAppPurchases: true,
        isEditorsChoice: true,
        age: 18,
        rating: 4.9,
        reviewCount: "34202",
        version: "9",
        androidVersion: "Android 9.0 and up",
        createDate: new Date(),
        lastUpdate: new Date(),
        releaseDate: new Date(),
        newFeatures: "Yenilikler",
        downloadsCount: "420231",
      },
    },
  };

  return await apiInstance.patch("pwa/addLanguage", fullPayload);
});

export const deleteLanguageFromPwa = createAsyncThunk<
  boolean,
  { appId: string; language: string }
>("pwa/deleteLanguageFromPwa", async ({ appId, language }) => {
  return await apiInstance.patch("pwa/deleteLanguage", {
    appId,
    language,
    adminId,
  });
});
