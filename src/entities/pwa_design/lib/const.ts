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
];

const modifiedCountryList = countryList.map((item, ind) => ({
  value: ind,
  label: item,
}));
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

export { countryList, languages, modifiedCountryList };
