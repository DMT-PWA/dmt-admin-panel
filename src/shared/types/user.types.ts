type UserStringFields =
  | "ipAddress"
  | "deviceId"
  | "userLink"
  | "advertiserTrackingId"
  | "affiliateLink"
  | "email"
  | "phone"
  | "country"
  | "userAgent"
  | "device"
  | "facebookEventStatus"
  | "role"
  | "appDomain"
  | "keyboardLanguage";

type UserBooleanFields =
  | "appInstalled"
  | "facebookAppInstalled"
  | "supportedCountry";

export interface User
  extends Record<UserStringFields, string>,
    Record<UserBooleanFields, boolean> {
  pushSubscription: {
    permission: string;
    country: string;
    appDomain: string;
    appId: string;
    language: string;
    status: boolean;
    subscription: string;
  };
  userIpAddresses: Array<string>;
  entryCount: number;
  lastLogin: Date;
}
