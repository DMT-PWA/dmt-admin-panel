import { useEffect, useState } from "react";
import {
  countryData,
  CountryKeys,
  LanguageDataTypes,
  LanguageKeys,
} from "src/shared/lib/translations";
import { Language, Country } from "src/shared/types";

export const usePhonePreview = (
  currentLanguage: Language | null,
  currentCountry: Country
) => {
  const [langData, setLangData] = useState<LanguageDataTypes>(
    {} as LanguageDataTypes
  );

  const [isArabic, setIsArabic] = useState<boolean>(false);

  function formatNumber(num: string) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(Number(num));
  }

  useEffect(() => {
    if (!currentCountry || !currentLanguage) return;

    const country = currentCountry.label.toLowerCase() as CountryKeys;
    const lang = currentLanguage.label.toLowerCase() as LanguageKeys;

    setLangData(countryData[country][lang]);
    setIsArabic(lang === ("arabic" as LanguageKeys));
  }, [currentCountry, currentLanguage]);

  return { langData, isArabic, formatNumber };
};
