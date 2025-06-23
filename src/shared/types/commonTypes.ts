import { CommentResponse } from "./commentsTypes";

type AdminId = { adminId: string };

type Icon = { icon: string };

/* type ObjectId = {
  $oid: string;
}; */

type DateField = {
  $date: string;
};

type Step = {
  name: string;
  instruction: string;
};

type LanguageContent = {
  step1ChromeDesktop: Step;
  step2ChromeDesktop: Step;
  step1SafariDesktop: Step;
  step2SafariDesktop: Step;
  step3SafariDesktop: Step;
  step1ChromeMobile: Step;
  step2ChromeMobile: Step;
  step3ChromeMobile: Step;
  step1SafariMobile: Step;
  step2SafariMobile: Step;
  step3SafariMobile: Step;
  isExist: boolean;
  open: string;
  noPWASupport: string;
  stayOn: string;
  appFunctionality: string;
  add: string;
  clickIcon: string;
  pressIcon: string;
  greeting: string;
  wait: string;
  proceed: string;
  description: string;
  containsAds: string;
  inAppPurchases: string;
  headerReviews: string;
  hundredPlus: string;
  downloads: string;
  ageLimit: string;
  ageRating: string;
  install: string;
  wishlist: string;
  available: string;
  aboutThisGame: string;
  about: string;
  about2?: string; // to be removed
  about3?: string; // to be removed
  updatedOn: string;
  updatedDate: string;
  casino: string;
  dataSafety: string;
  safety: string;
  noInformation: string;
  seeDetails: string;
  ratingsAndReviews: string;
  verified: string;
  phone: string;
  tV: string;
  chromebook: string;
  tablet: string;
  reviews: string;
  fourPointThree: string;
  fifteenM: string;
  helpful: string;
  allReviews: string;
  whatsNew: string;
  findHelpful: string;
  yes: string;
  no: string;
  contact: string;
  newFeatures: string;
  icon?: string;
  screenShots?: string[];
  reviewObject?: CommentResponse[];
};

export type AppDataFull = {
  _id: string;
  adminId: string;
  languages?: string[];
  icon?: string;
  logo?: string;
  backgroundPhotoMobile?: string; // to be removed
  backgroundPhotoDesktop?: string; // to be removed
  appTitle: string;
  appSubTitle: string;
  egypt: {
    arabic: LanguageContent;
    english: LanguageContent;
  };
  iraq: {
    arabic: LanguageContent;
    english: LanguageContent;
  };
  saudiArabia: {
    arabic: LanguageContent;
    english: LanguageContent;
  };
  germany: {
    dutch: LanguageContent;
    english: LanguageContent;
  };
  netherlands: {
    dutch: LanguageContent;
    english: LanguageContent;
  };
  hongKong: {
    chinese: LanguageContent;
    english: LanguageContent;
  };
  china: {
    chinese: LanguageContent;
    english: LanguageContent;
  };
  indonesia: {
    indonesian: LanguageContent;
    english: LanguageContent;
  };
  malaysia: {
    malay: LanguageContent;
    english: LanguageContent;
  };
  singapore: {
    malay: LanguageContent;
    english: LanguageContent;
  };
  unitedKingdom: {
    english: LanguageContent;
  };
  pakistan: {
    urdu: LanguageContent;
    english: LanguageContent;
  };
  russia: {
    russian: LanguageContent;
    english: LanguageContent;
  };
  senegal: {
    french: LanguageContent;
    english: LanguageContent;
  };
  southKorea: {
    korean: LanguageContent;
    english: LanguageContent;
  };
  turkey: {
    turkish: LanguageContent;
    english: LanguageContent;
  };
  lithuania: {
    lithuanian: LanguageContent;
    english: LanguageContent;
  };
  createdAt: string;
  updatedAt: DateField;
  __v: number;
  oneSignalApiKey?: string;
  oneSignalAppId?: string;
  domain?: string;
  marketerTag?: string;
  subDomain?: string;
  accessToken?: string;
  domainApp?: string;
  domainLanding?: string;
  keitaroDomain?: string;
  keitaroFirstCampaign?: string;
  pixelId?: string;
  renderId?: string; // new
};

// Example usage:
// const appData: AppData = { ... };

export type UpdatedAppDataProps = {
  appId?: string;
  adminId?: string;
  appTitle?: string;
  appSubTitle?: string;
  domain?: string;
  subDomain?: string;
  pixelId?: string;
  accessToken?: string;
  domainApp?: string;
  domainLanding?: string;
  keitaroDomain?: string;
  keitaroCampaign?: string;
  keitaroCampaignId?: string;
  yandexMetrikaId?: string;
  marketerTag?: string;
  oneSignalApiKey?: string;
  oneSignalAppId?: string;
  displayId?: string;
  displayName?: string;
  appStatus?: string; // status
  category?: string;
  origin?: string;
  language?: string;
  headerReviews?: string;
  hundredPlus?: string;
  aboutThisGame?: string;
  updatedDate?: string;
  country?: string;
  casino?: string;
  isExist?: boolean;
  collectionId?: string;
  about?: string;
  isContainsAds?: boolean;
  isInAppPurchases?: boolean;
  isEditorsChoice?: boolean;
  age?: string;
  rating?: string;
  reviewCount?: string;
  version?: string;
  androidVersion?: string;
  createDate?: Date;
  lastUpdate?: Date;
  releaseDate?: Date;
  ageLimit?: string;
  ageRating?: string;
  commentId?: string;
  newFeatures?: string;
  downloadsCount?: string;
};

export type AppDataProps = {
  isExist?: boolean;
  open?: string;
  noPWASupport?: string;
  stayOn?: string;
  add?: string;
  clickIcon?: string;
  pressIcon?: string;
  wait?: string;
  proceed?: string;
  containsAds?: string;
  inAppPurchases?: string;
  headerReviews?: string;
  hundredPlus?: string;
  downloads?: string;
  ageLimit?: string;
  ageRating?: string;
  install?: string;
  wishlist?: string;
  available?: string;
  aboutThisGame?: string;
  updatedOn?: string;
  updatedDate?: Date;
  casino?: string;
  dataSafety?: string;
  safety?: string;
  noInformation?: string;
  seeDetails?: string;
  ratingsAndReviews?: string;
  verified?: string;
  phone?: string;
  tV?: string;
  chromebook?: string;
  tablet?: string;
  reviews?: string;
  fourPointThree?: string;
  fifteenM?: string;
  helpful?: string;
  allReviews?: string;
  whatsNew?: string;
  findHelpful?: string;
  yes?: string;
  no?: string;
  contact?: string;
  newFeatures?: string;
  downloadsCount?: string;
  isContainsAds?: boolean;
  isInAppPurchases?: boolean;
  isEditorsChoice?: boolean;
  age?: number;
  createDate?: Date;
  lastUpdate?: Date;
  releaseDate?: Date;
  rating?: string;
  about?: string;
  androidVersion?: string;
  collectionId: {
    _id?: string;
    adminId?: string;
    name?: string;
    icon?: string;
    screenShots?: string[];
  };
  commentId: {
    _id?: string;
    adminId?: string;
    name?: string;
    reviewObject: CommentResponse[];
    language?: string;
  };
  reviewCount?: string;
  version?: string;
  _id?: string;
  domain?: string;
  subDomain?: string;
  pixelId?: string;
  accessToken?: string;
  domainApp?: string;
  domainLanding?: string;
  keitaroDomain?: string;
  keitaroCampaign?: string;
  keitaroCampaignId?: string;
  yandexMetrikaId?: string;
  oneSignalApiKey?: string;
  oneSignalAppId?: string;
  displayId?: string;
  displayName?: string;
  marketerTag?: string;
  appTitle?: string;
  appSubTitle?: string;
  renderId?: string;
  icon?: string;
  screenShots?: string[];
  reviewObject: CommentResponse[];
};

type ValidationResponse = {
  message: string;
  status: boolean;
};

export type { AdminId, Icon, ValidationResponse };
