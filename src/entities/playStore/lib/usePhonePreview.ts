import { useEffect, useState } from "react";

import { AppDataProps, LanguagesListValue } from "src/shared/types";

export const usePhonePreview = (
  currentLanguage: LanguagesListValue | null,
  appData: AppDataProps
) => {
  const [langData, setLangData] = useState<AppDataProps | null>(null);

  const [isArabic, setIsArabic] = useState<boolean>(false);

  function formatNumber(num: string) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(Number(num));
  }

  useEffect(() => {
    if (!currentLanguage) return;
    setLangData(appData);

    setIsArabic(currentLanguage.value === "arabic");
  }, [appData, currentLanguage]);

  return { langData, isArabic, formatNumber };
};
