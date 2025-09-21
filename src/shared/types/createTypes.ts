import { Language, LanguagesList } from "./designTypes";

export interface UpdatePwaPayload {
  appId: string;
  adminId: string;
  language: string | undefined | null;
  country: string | undefined;
  appTitle: string | undefined | null;
  appSubTitle: string | undefined | null;
  hundredPlus: string | undefined | null;
  about: string | undefined | null;
  collectionId?: string | undefined | null;
  defaultLanguage: string;
  descriptionId?: string | undefined | null;
  commentId?: string | undefined | null;
  isExist: boolean;
  languageList: LanguagesList | [Language];
  currentCountry: string;
  currentLanguage: string;
  domain: string;
  subDomain: string;
  pixelId: string;
  accessToken: string;
}
