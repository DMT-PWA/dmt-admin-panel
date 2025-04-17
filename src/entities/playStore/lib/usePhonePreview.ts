import { useEffect, useState } from "react";
import { dataByTrasnslation, Translations } from "src/shared/lib/translations";
import { Language, Country } from "src/shared/types"

export const usePhonePreview = (currentLanguage: Language, currentCountry: Country) => {
    const [langData, setLangData] = useState<Translations | null>({});

    const [isArabic, setIsArabic] = useState<boolean>(false);

    useEffect(() => {
        if (!currentLanguage && !currentCountry) return;

        const country = currentCountry?.label.toLowerCase();
        const lang = currentLanguage?.label.toLowerCase();

        setLangData(dataByTrasnslation[country][lang]);

        setIsArabic(() => (lang === "arabic" ? true : false));
    }, [currentCountry, currentLanguage]);

    return { langData, isArabic }
}