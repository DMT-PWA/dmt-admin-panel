import { LanguagesListValue } from ".";

export type Language = {
  value: number;
  label: string;
};

export type LanguagesList =
  | [Language, Language]
  | [Language]
  | null
  | Array<LanguagesListValue>;

export type Country = {
  value: string;
  label: string;
} | null;
