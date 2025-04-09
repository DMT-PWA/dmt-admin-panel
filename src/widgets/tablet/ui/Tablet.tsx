import { useState, useEffect, useCallback, FC } from "react";
import {
  CaroselReviewContainerTablet,
  FeaturesContainer,
  ReviewContent1,
  ReviewsContent,
  SessionSafety2,
} from "src/entities/playStore";
import { Reviewer } from "src/entities/reviewer";
import { useMediaQuery } from "src/shared/lib/hooks";
import { appData } from "src/shared/lib/data";
import { translations } from "src/shared/lib/translations";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { format } from "date-fns";
import clsx from "clsx";
import { Country, Language } from "src/shared/types";
const frontend = import.meta.env.VITE_FRONTEND_URL;

interface ITabletProps {
  toAbout: () => void;
}

const Tablet: FC<ITabletProps> = (props) => {
  const { toAbout } = props;

  const { currentCountry, currentLanguage, currentCollection } = useAppSelector(
    (state) => state.pwa_design
  );

  const country = currentCountry?.label.toLowerCase();
  const lang = currentLanguage?.label.toLowerCase();

  // const [lang, setLang] = useState(null);
  // const [country, setCountry] = useState(null);

  const {
    title,
    developer_name,
    raiting,
    number_of_downloads,
    grades,
    checkboxes_state,
    about_description,
  } = useAppSelector((state) => state.pwa_description);

  const { comments_list } = useAppSelector((state) => state.comments);

  const { description } = about_description;

  const icon = currentCollection?.collectionImage;

  const formatDownloads = (downloads: number | string | null): string => {
    return Number(downloads) > 100000 ? "100K+" : `${downloads}`;
  };
  const modifiedNumberOfDownloads = formatDownloads(
    Number(number_of_downloads)
  );

  //===================================================================================================
  //==========================={Translations Block}====================================================
  //===================================================================================================
  const {
    headerReviews,
    downloads,
    ageRating,
    install,
    aboutThisGame,
    ratingsAndReviews,
    reviewObject,
    findHelpful,
    yes,
    no,
    screenShots,
  } = appData[country][lang || "english"];
  //===================================================================================================
  //================================={React states}====================================================
  //===================================================================================================

  const [isAppSupport] = useState(false);
  const [, setIsInstall] = useState(false);

  async function installApp() {
    setIsInstall(true);
  }

  return (
    <>
      {currentCountry && currentLanguage && (
        <div className="max-w-93.75 w-full max-h-203 relative flex flex-row items-start justify-start leading-[normal] tracking-[normal]">
          <main
            data-phone-container
            className="h-full rounded-[40px] flex-1 bg-white overflow-y-auto flex flex-col items-start justify-start pt-0 px-0 box-border relative max-w-full text-left text-2xs text-dimgray font-roboto"
          >
            <section
              data-scroll-to="AppHeaderSafari"
              className={`self-stretch flex flex-row items-start justify-start pt-0 box-border max-w-full text-left text-sm text-whitesmoke-200 font-roboto`}
            >
              <div className="flex-1 flex flex-col items-start justify-start gap-5 max-w-full">
                <div className="self-stretch overflow-hidden flex flex-row items-start justify-start bg-[url('/hero-game-tablet@3x.png')] bg-cover bg-no-repeat bg-[top] max-w-full">
                  <div className="flex-1 flex flex-col items-start justify-start pt-[10px] px-[20px] pb-[4px] tabletBlack:pb-8 box-border gap-10 max-w-full mq600:gap-5">
                    <div className="self-stretch flex flex-row items-start justify-center pt-0 px-0 pb-[4px]"></div>
                    <div className="self-stretch flex flex-col items-start justify-start gap-10 text-5xl mq450:gap-5">
                      <div className="w-[282px] flex flex-row items-start justify-start relative gap-2">
                        {icon ? (
                          <img
                            className="w-14 h-14 relative rounded-xl overflow-hidden shadow-lg"
                            loading="lazy"
                            alt=""
                            src={icon ?? ""}
                          />
                        ) : (
                          <div className="w-14 h-14 relative rounded-xl bg-[#D6D6D6]"></div>
                        )}
                        <div className="flex-1 flex flex-col items-start justify-start gap-px text-gray-100">
                          <div className="flex flex-col justify-center items-center">
                            <div className="self-stretch flex flex-row items-center justify-center flex-wrap content-start gap-1">
                              <span className="text-[#000000CC] tracking-[3%] m-0 flex-1 relative leading-[100%] font-normal font-[inherit]">
                                {title}
                                <br />
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row items-start justify-start flex-wrap content-start text-xs text-blue_default">
                            <div className="relative font-bold tracking-[0.3px] leading-[16px] inline-block min-w-[74px]">
                              {developer_name}
                            </div>
                          </div>
                          <div
                            className={clsx(
                              "flex flex-row items-center justify-center flex-wrap content-center gap-y-[7px] text-xs text-dimgray",
                              {
                                "gap-x-[6px]":
                                  checkboxes_state.some(
                                    (item) => item.id === 0
                                  ) &&
                                  checkboxes_state.some(
                                    (item) => item.id === 1
                                  ),
                              }
                            )}
                          >
                            <div className="relative text-2xs tracking-[0.3px] leading-[16px] inline-block">
                              {checkboxes_state &&
                                checkboxes_state.some(
                                  (item) => item.id === 0
                                ) && <span>Contains ads</span>}
                            </div>
                            {checkboxes_state &&
                              checkboxes_state.some((item) => item.id === 0) &&
                              checkboxes_state.some(
                                (item) => item.id === 1
                              ) && (
                                <img
                                  src="/pwa_icons/dot.png"
                                  width={2}
                                  height={2}
                                />
                              )}

                            <div className="relative text-2xs tracking-[0.3px] leading-[16px] inline-block">
                              {checkboxes_state &&
                                checkboxes_state.some(
                                  (item) => item.id === 1
                                ) && <span>In-app purchases</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ====================={updated}============================= */}
                      <div
                        className={clsx(
                          "w-full flex flex-row items-center justify-center text-sm text-gray-100 whitespace-nowrap container-snap container-snap",
                          checkboxes_state &&
                            checkboxes_state.some((item) => item.id === 2)
                            ? "gap-2.75"
                            : "gap-4.5"
                        )}
                      >
                        <div className="flex flex-col gap-1.75 items-center justify-center">
                          <div className="flex flex-row items-center justify-center gap-px">
                            <div className="relative font-bold font-product_sans tracking-[0.25px] leading-4 inline-block min-w-[22px]">
                              {raiting || 4.8}
                            </div>
                            <div className="flex flex-col items-start justify-start px-0 pb-0">
                              <img
                                className="w-3 h-3 relative overflow-hidden shrink-0"
                                alt=""
                                src="/pwa_icons/icon-star-black.svg"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-start justify-start text-xs text-dimgray">
                            <div
                            // className="relative tracking-[0.3px] leading-[16px] inline-block min-w-[74px] whitespace-nowrap"
                            >
                              {headerReviews}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-center pt-2 px-0 pb-0">
                          <div className="w-[1px] h-5 relative bg-darkgray/60" />
                        </div>

                        <div className="flex flex-col gap-1.75 items-center justify-center">
                          <div className="flex flex-row items-center justify-center py-0 px-2">
                            <div className="relative font-bold  tracking-[0.25px] leading-4 inline-block min-w-[45px]">
                              {modifiedNumberOfDownloads}
                            </div>
                          </div>
                          <div className="flex flex-row items-start justify-start text-xs text-dimgray">
                            <div
                            //  className="relative tracking-[0.3px] leading-[16px] inline-block min-w-[74px] whitespace-nowrap"
                            >
                              {downloads}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-center pt-2 px-0 pb-0">
                          <div className="w-[1px] h-5 relative bg-darkgray/60" />
                        </div>

                        {checkboxes_state &&
                          checkboxes_state.some((item) => item.id === 2) && (
                            <>
                              <div className="flex flex-col items-center justify-center">
                                <div className="w-[20px] h-[22px] flex flex-row items-center justify-center pb-1.5">
                                  <img src="/pwa_icons/editors-choice.png" />
                                </div>
                                <div className="flex flex-row items-start justify-start text-xs text-dimgray">
                                  <div>Editors’ Choice</div>
                                </div>
                              </div>

                              <div className="flex flex-col items-center justify-center pt-2 px-0 pb-0">
                                <div className="w-[1px] h-5 relative bg-darkgray/60" />
                              </div>
                            </>
                          )}

                        <div className="flex flex-col items-center justify-center">
                          <div className="flex flex-row items-center justify-center pb-1.5">
                            <div className="relative font-bold text-[8px] inline-block">
                              <img
                                src="/pwa_icons/age.png"
                                style={{ height: "14px", width: "21px" }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-start justify-start text-xs text-dimgray">
                            <div>{ageRating}</div>
                          </div>
                        </div>
                      </div>

                      <button
                        className={`cursor-pointer hover:opacity-80 [border:none] py-2 px-5 self-stretch rounded-1 tabletBlack:rounded-lg overflow-hidden flex flex-row items-start justify-center bg-onexBlue tabletBlack:bg-blue_default`}
                        onClick={installApp}
                      >
                        <div className="relative text-sm tracking-[0.25px] leading-4 font-product_sans text-neutral-100 text-left inline-block min-w-[40px]">
                          {install}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <CaroselReviewContainerTablet
              propWidth="100%"
              propHeight="140px"
              propFlex="unset"
              screenShots={screenShots}
            />
            <section className="self-stretch flex flex-row items-start justify-start pt-0 px-5 pb-5 box-border max-w-full shrink-0 text-left text-lg text-gray-100 font-roboto">
              <div className="flex-1 flex flex-col items-start justify-start gap-5 shrink-0 max-w-full">
                <div className="self-stretch h-6 flex flex-row items-center justify-between gap-5">
                  <div className="self-stretch w-full flex flex-row items-start justify-start">
                    <div className="self-stretch flex-1 relative leading-[24px]">
                      {aboutThisGame}
                    </div>
                  </div>
                  <button
                    className="overflow-hidden flex flex-col items-start justify-start py-[5px] px-1"
                    onClick={toAbout}
                  >
                    <img
                      className="w-4 h-3.5 relative"
                      alt=""
                      src="/pwa_icons/vector-5.svg"
                    />
                  </button>
                </div>
                {/* ================={new about content}================================== */}
                <div className="self-stretch h-fit overflow-hidden shrink-0 flex flex-col items-start justify-start gap-4">
                  <p
                    className="max-w-full text-smi text-dimgray tracking-[0.2px] leading-[20px] break-words whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: description }} // Use dangerouslySetInnerHTML
                  />
                </div>
                <FeaturesContainer />
                {/* <SessionSafety2 /> */}
              </div>
            </section>
            <div className="self-stretch h-11 shrink-0 flex flex-row items-start justify-start pt-0 px-5 pb-5 box-border max-w-full text-lg text-gray-100">
              <div className="self-stretch flex-1 flex flex-row items-start justify-start relative shrink-0 max-w-full">
                <div className="self-stretch w-full relative leading-[24px] inline-block">
                  {ratingsAndReviews}
                </div>
                <div className="!m-[0] absolute h-6 top-[0px] right-[0px] bottom-[0px] overflow-hidden flex flex-col items-start justify-start py-[5px] px-1 box-border w-6">
                  <img
                    className="w-4 h-3.5 relative"
                    alt=""
                    src="/pwa_icons/vector-5.svg"
                  />
                </div>
              </div>
            </div>
            <section className="self-stretch flex flex-row items-start justify-start pt-0 pb-5 pl-5 pr-7 box-border max-w-full shrink-0">
              <ReviewsContent
                propMinWidth="82px"
                propMinWidth1="144px"
                reviewsContentWidth="unset"
                reviewsContentFlex="1"
                reviewsContentHeight="112px"
                ratingScoreAlignSelf="stretch"
                ratingScoreFlex="1"
                scoreValueDisplay="unset"
                scoreValueMinWidth="unset"
                scoreValueAlignSelf="stretch"
                scoreValueFlex="1"
                reviewsInfoAlignSelf="stretch"
                reviewsInfoHeight="16px"
                reviewsCountAlignSelf="stretch"
                reviewsCountWidth="33px"
                mDisplay="unset"
                mMinWidth="unset"
                mAlignSelf="stretch"
                mFlex="1"
                reviewsTextAlignSelf="stretch"
                reviewsTextFlex="1"
                reviewsDisplay="unset"
                reviewsMinWidth="unset"
                reviewsAlignSelf="stretch"
                reviewsFlex="1"
                emptyBarsMinWidth="unset"
                emptyBarsWidth="8px"
                divMinWidth="unset"
                divWidth="8px"
                divMinWidth1="unset"
                divWidth1="8px"
                divMinWidth2="unset"
                divWidth2="8px"
                ratingMinWidth="unset"
                ratingWidth="8px"
                raitingValue={raiting || 4.8}
                grades={grades}
              />
            </section>
            {/* =========+{Section: Reviews result }======================== */}
            {reviewObject && <Reviewer commentsList={comments_list} />}
            {/* <ReviewContent1 /> */}
            {/* <section className="self-stretch flex flex-row items-start justify-start pt-0 pb-5 pl-5 pr-[30px] box-border max-w-full shrink-0 text-left text-sm text-dimgray font-roboto">
            <div className="h-fit flex-1 relative tracking-[0.2px] leading-[20px] inline-block shrink-0 max-w-full">
              {newFeatures}
            </div>
          </section>
          <footer className="self-stretch h-11 shrink-0 flex flex-row items-start justify-start pt-0 pb-5 pl-5 pr-[29px] box-border max-w-full text-left text-lg text-gray-100 font-roboto">
            <div className="self-stretch flex-1 flex flex-row items-start justify-start relative shrink-0 max-w-full">
              <div className="self-stretch w-fit relative leading-[24px] inline-block">
                {contact}
              </div>
              {isAppSupport ? (
                <div
                  className="!m-[0] absolute h-6 top-[0px] right-[0px] bottom-[0px] overflow-hidden flex flex-col items-start justify-start py-[9px] px-[5px] box-border w-6"
                  onClick={() => setIsAppSupport(false)}
                >
                  <img
                    className="w-3.5 h-1.5 relative"
                    alt=""
                    src="/pwa_icons/vector-191.svg"
                  />
                </div>
              ) : (
                <div
                  className="!m-[0] absolute h-6 top-[0px] right-[0px] bottom-[0px] overflow-hidden flex flex-col items-start justify-start py-[9px] px-[5px] box-border w-6"
                  onClick={() => setIsAppSupport(true)}
                >
                  <img
                    className="w-3.5 h-1.5 relative"
                    alt=""
                    src="/pwa_icons/vector-19.svg"
                  />
                </div>
              )}
            </div>
          </footer> */}
            {isAppSupport && <></>}

            {/*  <div className="self-stretch h-px shrink-0 flex flex-row items-start justify-start py-0 px-5 box-border max-w-full mb-[80px] mt-[20px]">
            <div className="self-stretch flex-1 relative bg-whitesmoke-200 shrink-0 max-w-full z-[1]" />
          </div> */}
          </main>
        </div>
      )}
    </>
  );
};

export default Tablet;
