import { LanguagesListValue } from ".";

export type Language = {
  value: number;
  label: string;
};

export type LanguagesList = null | Array<LanguagesListValue>;

export type Country = {
  value: string;
  label: string;
} | null;
