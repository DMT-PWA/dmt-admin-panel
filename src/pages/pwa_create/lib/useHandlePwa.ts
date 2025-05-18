import { finishCreatePWA, UpdatePwaPayload } from "src/entities/pwa_create";

export const useHandlePwa = () => {
  const handleCreate = (callback: () => void, {currentLanguage, currentCountry, adminId, languageList}: UpdatePwaPayload) => {
      dispatch(
        finishCreatePWA({
          adminId: adminId,
          country: currentCountry?.label.toLowerCase(),
          language: currentLanguage?.label,
          defaultCountry: currentCountry?.label.toLowerCase(),
          defaultLanguage: currentLanguage?.label,
          currentCountry: currentCountry?.label,
          currentLanguage: currentLanguage?.label,
          languageList: languagesList,
        })
      );

      callback();
    }
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
          updateDescription({ ...basePayload, ...descriptionStates[0].value })
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
};
