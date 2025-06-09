export type Language = {
  value: number;
  label: string;
};

export type LanguagesList = [Language, Language] | [Language] | null;

export type Country = { value: string; label: string } | null;
export interface ICollection {
  _id: string;
  collectionImage: string | null;
  images: (string | null)[];
  collectionName: string | null;
}
