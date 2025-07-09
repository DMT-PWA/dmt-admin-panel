import { Language } from "src/shared/types";

const countryList = [
  "Algeria",
  "Egypt",
  "Iraq",
  "Saudi Arabia",
  "Germany",
  "Netherlands",
  "Hong Kong",
  "China",
  "Indonesia",
  "Malaysia",
  "Singapore",
  "unitedKingdom",
  "Pakistan",
  "Russia",
  "Senegal",
  "South Korea",
  "Turkey",
  "Lithuania",
] as const;

const languages = [
  {
    value: "egyptArabic",
    label: "Egypt Arabic",
  },
  {
    value: "arabic",
    label: "Arabic",
  },
  {
    value: "dutch",
    label: "Dutch",
  },
  {
    value: "netherlandsDutch",
    label: "Netherlands Dutch",
  },
  {
    value: "english",
    label: "English",
  },
  {
    value: "chinese",
    label: "Chinese",
  },
  {
    value: "indonesian",
    label: "Indonesian",
  },
  {
    value: "malay",
    label: "Malay",
  },
  {
    value: "singaporeMalay",
    label: "Singapor Malay",
  },
  {
    value: "urdu",
    label: "Urdu",
  },
  {
    value: "russian",
    label: "Russian",
  },
  {
    value: "french",
    label: "French",
  },
  {
    value: "korean",
    label: "Korean",
  },
  {
    value: "turkish",
    label: "Turkish",
  },
  {
    value: "lithuanian",
    label: "Lithuanian",
  },
];

const countryToLanguageMap: Record<string, Language> = {
  algeria: { label: "Arabic", value: 0 },
  egypt: { label: "Arabic", value: 0 },
  iraq: { label: "Arabic", value: 0 },
  "saudi arabia": { label: "Arabic", value: 0 },
  germany: { label: "Dutch", value: 0 },
  netherlands: { label: "Dutch", value: 0 },
  "hong kong": { label: "Chinese", value: 0 },
  china: { label: "Chinese", value: 0 },
  indonesia: { label: "Arabic", value: 0 },
  malaysia: { label: "Malay", value: 0 },
  singapore: { label: "Malay", value: 0 },
  "united kingdom": { label: "English", value: 0 },
  pakistan: { label: "Urdu", value: 0 },
  russia: { label: "Russian", value: 0 },
  senegal: { label: "French", value: 0 },
  "south korea": { label: "Korean", value: 0 },
  turkey: { label: "Turkish", value: 0 },
  lithuania: { label: "Lithuanian", value: 0 },
};

export { countryList, languages, countryToLanguageMap };
