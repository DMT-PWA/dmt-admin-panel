import { SelectValueProp } from "src/shared/types";

const domains: Array<SelectValueProp> = [
  { label: "1xgamepro.com", value: "1xgamepro.com" },
  { label: "melgames.com", value: "melgames.com" },
  { label: "twinb.pro", value: "twinb.pro" },
];

const whitePages: Array<SelectValueProp> = [
  {
    label: "404 page",
    value: "404 page",
  },
  {
    label: "white",
    value: "white",
  },
];

/* const namings: Array<Settings["naming"]> = [
  {
    label:
      "https://spaceplayband.com/h3SYNGpP?external_id={clickId}&ad_campaign_id={campaignId}&source={networkSource}&sub1={sn_sub1}&sub2={sn_sub2}&sub3={sn_sub3}&sub4={sn_sub4}&sub5={sn_sub5}&app_num={appNum}&app_bundle={appBundle}&adset_id={adsetId}&adset_name={adsetName}&ad_id={adId}&ad_name={adName}&network_channel={networkChannel}&is_organic={isOrganic}&gaid={gaid}",
    value:
      "https://spaceplayband.com/h3SYNGpP?external_id={clickId}&ad_campaign_id={campaignId}&source={networkSource}&sub1={sn_sub1}&sub2={sn_sub2}&sub3={sn_sub3}&sub4={sn_sub4}&sub5={sn_sub5}&app_num={appNum}&app_bundle={appBundle}&adset_id={adsetId}&adset_name={adsetName}&ad_id={adId}&ad_name={adName}&network_channel={networkChannel}&is_organic={isOrganic}&gaid={gaid}",
  },
]; */

export { domains, whitePages };
