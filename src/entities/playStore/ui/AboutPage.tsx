import { format } from "date-fns";
import { FC } from "react";
import { Country, IDescriptionAbout, Language } from "src/shared/types";
import { usePhonePreview } from "src/entities/playStore";
import clsx from "clsx";
interface IAboutGameProps extends IDescriptionAbout {
  number_of_downloads: string | number | null;
  whats_new: string | null;
  currentLanguage: Language;
  currentCountry: Country;
}

export const AboutPage: FC<IAboutGameProps> = ({
  android_version,
  last_update,
  release_date,
  version,
  number_of_downloads,
  currentLanguage,
  currentCountry,
  whats_new = null,
}) => {
  const { isArabic, langData } = usePhonePreview(
    currentLanguage,
    currentCountry
  );

  const { downloads, updatedOn, containsAds, ageRating } = langData;

  const modifiedNumberOfDownload = (downloads: number | null) => {
    if (downloads) {
      return Number(downloads) > 1000
        ? `1,000+ ${downloads}`
        : `${downloads} ${downloads}`;
    }
  };

  return (
    <div className="px-6.25 pt-3 pb-85">
      <section className="flex flex-col gap-12.5">
        <h1 className={clsx("title__view-4", { "text-right": isArabic })}>
          More info
        </h1>
        <div
          className={clsx("flex gap-5.5", {
            "flex-row-reverse text-right": isArabic,
          })}
        >
          <div className="h-8.5 w-8.5">
            <img src="/pwa_icons/age.png" />
          </div>
          <p className="text-view-10 flex flex-col gap-1">
            <span className="font-medium">{ageRating}</span>
            <span className="font-normal">
              In-game purchases (includes random items)
            </span>
          </p>
        </div>
        <div
          className={clsx("flex gap-5.5", {
            "flex-row-reverse text-right": isArabic,
          })}
        >
          <div className="h-5 w-6">
            <img src="/pwa_icons/ad-icon.png" />
          </div>
          <p className="text-view-10 flex flex-col gap-1">
            <span className="font-medium">{containsAds}</span>
            <span className="font-normal">
              Ads are placed by the app developer.
            </span>
          </p>
        </div>
        <div
          className={clsx("flex gap-5.5", {
            "flex-row-reverse text-right": isArabic,
          })}
        >
          <div className="h-5.25 w-7">
            <img src="/pwa_icons/gamepad.png" />
          </div>
          <p className="text-view-10 flex flex-col gap-1">
            <span className="font-medium">Uses Google Play Games</span>
            <span className="font-normal">
              For automatic sign-in , leaderboards,achievements, and more.
            </span>
          </p>
        </div>
      </section>
      {whats_new && (
        <section className="flex my-8 flex-col gap-5.75">
          <div className="flex items-center gap-2.25">
            <h1 className="title__view-4">What’s new </h1>
            <img
              src="/pwa_icons/circle-blue.png"
              style={{ height: "8px", width: "8px" }}
              alt=""
            />
          </div>
          <span className="text-view-10">{whats_new}</span>
        </section>
      )}
      <h1 className={clsx("title__view-4 my-11", { "text-right": isArabic })}>
        Game info
      </h1>
      <section className="flex flex-col gap-10">
        <div
          className={clsx("flex justify-between", {
            "flex-row-reverse": isArabic,
          })}
        >
          <span className="text-view-10 font-medium">Version</span>
          <span className="text-view-10">{version}</span>
        </div>
        <div
          className={clsx("flex justify-between", {
            "flex-row-reverse": isArabic,
          })}
        >
          <span className="text-view-10 font-medium">{updatedOn}</span>
          <span className="text-view-10">
            {last_update ? format(last_update, "dd MMM yyy") : null}
          </span>
        </div>
        <div
          className={clsx("flex justify-between", {
            "flex-row-reverse": isArabic,
          })}
        >
          <span className="text-view-10 font-medium">{downloads}</span>
          <span className="text-view-10">
            {modifiedNumberOfDownload(Number(number_of_downloads))}
          </span>
        </div>
      </section>
      <section className="flex flex-col mt-11 gap-11">
        <div
          className={clsx("flex justify-between", {
            "flex-row-reverse": isArabic,
          })}
        >
          <span className="text-view-10 font-medium">Download size</span>
          <span className="text-view-10">54.5 MB</span>
        </div>
        <div
          className={clsx("flex justify-between", {
            "flex-row-reverse": isArabic,
          })}
        >
          <span className="text-view-10 font-medium">Required OS</span>
          <span className="text-view-10">{android_version}</span>
        </div>
        <div
          className={clsx("flex justify-between", {
            "flex-row-reverse": isArabic,
          })}
        >
          <span className="text-view-10 font-medium">Offered by</span>
          <span className="text-view-10">Realis</span>
        </div>
        <div
          className={clsx("flex justify-between", {
            "flex-row-reverse": isArabic,
          })}
        >
          <span className="text-view-10 font-medium">Released on</span>
          <span className="text-view-10">
            {release_date ? format(release_date, "dd MMM yyyy") : null}
          </span>
        </div>
        <div
          className={clsx("flex justify-between", {
            "flex-row-reverse": isArabic,
          })}
        >
          <span className="text-view-10 font-medium">Compatibility </span>
          <span className="text-view-10">Works on your device</span>
        </div>
      </section>
    </div>
  );
};
