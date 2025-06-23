export type Language = {
  value: number;
  label: string;
};

export type LanguagesList = [Language, Language] | [Language] | null;

export type Country = { value: string; label: string } | null;
