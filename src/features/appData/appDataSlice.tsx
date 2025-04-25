import { createSlice } from "@reduxjs/toolkit";
import { AppDataProps } from "./types/appData";
import { UpdatedAppDataProps } from "./types/appData";

const updatedAppData: UpdatedAppDataProps = {
  appId: "",
  adminId: "",
  appTitle: "",
  appSubTitle: "",
  domain: "",
  subDomain: "",
  pixelId: "",
  accessToken: "",
  domainApp: "",
  domainLanding: "",
  keitaroDomain: "",
  keitaroCampaign: "",
  keitaroCampaignId: "",
  yandexMetrikaId: "",
  marketerTag: "",
  oneSignalApiKey: "",
  oneSignalAppId: "",
  //==========={New data}=====================
  displayId: "",
  displayName: "",
  appStatus: "", // status
  category: "",
  origin: "",

  //=========[data for country updates]========================
  language: "",
  headerReviews: "",
  hundredPlus: "",
  aboutThisGame: "",
  updatedDate: "",
  country: "",
  casino: "",
  //==========={New data}=====================
  isExist: false, // new to update if a language exists
  collectionId: "",
  about: "",
  isContainsAds: false,
  isInAppPurchases: false,
  isEditorsChoice: false,
  age: "",
  rating: "",
  reviewCount: "",
  version: "",
  androidVersion: "",
  createDate: new Date(), // Current timestamp
  lastUpdate: new Date(),
  releaseDate: new Date(),
  ageLimit: "",
  ageRating: "",
  commentId: "",
  //======={new}===============
  newFeatures: "",
  downloadsCount: "", //new
};

const appData: AppDataProps = {
  isExist: false,
  open: "",
  noPWASupport: "",
  stayOn: "",
  add: "",
  clickIcon: "",
  pressIcon: "",
  wait: "",
  proceed: "",
  containsAds: "",
  inAppPurchases: "",
  headerReviews: "",
  hundredPlus: "",
  downloads: "",
  ageLimit: "",
  ageRating: "",
  install: "",
  wishlist: "",
  available: "",
  aboutThisGame: "",
  updatedOn: "",
  updatedDate: new Date(),
  casino: "",
  dataSafety: "",
  safety: "",
  noInformation: "",
  seeDetails: "",
  ratingsAndReviews: "",
  verified: "",
  phone: "",
  tV: "",
  chromebook: "",
  tablet: "",
  reviews: "",
  fourPointThree: "",
  fifteenM: "",
  helpful: "",
  allReviews: "",
  whatsNew: "",
  findHelpful: "",
  yes: "",
  no: "",
  contact: "",
  newFeatures: "",
  downloadsCount: "",
  isContainsAds: false,
  isInAppPurchases: false,
  isEditorsChoice: false,
  age: 18,
  createDate: new Date(),
  lastUpdate: new Date(),
  releaseDate: new Date(),
  rating: "",
  about: "",
  androidVersion: "",
  collectionId: {
    _id: "",
    adminId: "",
    name: "",
    icon: "",
    screenShots: [],
  },
  commentId: {
    _id: "",
    adminId: "",
    name: "",
    reviewObject: [
      {
        name: "",
        date: "",
        review: "",
        helpful: "",
        helpfulCount: "",
        photo: "",
        rating: "",
        isResponse: false,
        response: "",
        responseDate: "",
      },
    ],
    language: "",
  },
  reviewCount: "",
  version: "",
  _id: "",
  domain: "",
  subDomain: "",
  pixelId: "",
  accessToken: "",
  domainApp: "",
  domainLanding: "",
  keitaroDomain: "",
  keitaroCampaign: "",
  keitaroCampaignId: "",
  yandexMetrikaId: "",
  oneSignalApiKey: "",
  oneSignalAppId: "",
  displayId: "",
  displayName: "",
  marketerTag: "",
  appTitle: "",
  appSubTitle: "",
  renderId: "",
  icon: "",
  screenShots: [],
  reviewObject: [
    {
      name: "",
      date: "",
      review: "",
      helpful: "",
      helpfulCount: "",
      photo: "",
      rating: "",
      isResponse: false,
      response: "",
      responseDate: "",
    },
  ],
};
const initialState = {
  // appData: null,
  // allApps: JSON.parse(window?.localStorage.getItem("allApps")) ?? {},
  allApps: {},

  updatedAppData,
  // allApps: null,
  // appData: JSON.parse(window?.localStorage.getItem("appData")) ?? {},
  appData,
  // completeAppData:
  //   JSON.parse(window?.localStorage.getItem("completeAppData")) ?? {},
  completeAppData: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const appDataSlice = createSlice({
  name: "appData",
  initialState: initialState,
  reducers: {
    getApp(state, action) {
      state.appData = action.payload;
      localStorage.setItem("appData", JSON.stringify(action.payload));
    },

    updateAppData(state, action) {
      state.updatedAppData = action.payload;
      localStorage.setItem("updatedAppData", JSON.stringify(action.payload));
    },
    getCompleteApp(state, action) {
      state.completeAppData = action.payload;
      localStorage.setItem("completeAppData", JSON.stringify(action.payload));
    },
    getAllApp(state, action) {
      state.allApps = action.payload;
      localStorage.setItem("allApps", JSON.stringify(action.payload));
    },
    clearAppData(state) {
      localStorage.removeItem("appData");
      localStorage.removeItem("updatedAppData");
      localStorage.removeItem("completeAppData");
      localStorage.removeItem("allApps");

      return initialState;
    },
  },
});

export const {
  getApp,
  getCompleteApp,
  getAllApp,
  updateAppData,
  clearAppData,
} = appDataSlice.actions;

export default appDataSlice.reducer;
