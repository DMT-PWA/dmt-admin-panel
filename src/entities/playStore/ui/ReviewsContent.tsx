import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "src/shared/lib/hooks";
import { appData } from "src/shared/lib/data";

interface ReviewsContentProps {
  raitingValue: string | number | null;
  grades: { id: number; value: number | string; raiting: number }[];
}

const ReviewsContent: FC<Partial<ReviewsContentProps>> = (props) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const {
    className = "",
    propMinWidth,
    propMinWidth1,
    reviewsContentWidth,
    reviewsContentFlex,
    reviewsContentHeight,
    ratingScoreAlignSelf,
    ratingScoreFlex,
    scoreValueDisplay,
    scoreValueMinWidth,
    scoreValueAlignSelf,
    scoreValueFlex,
    reviewsInfoAlignSelf,
    reviewsInfoHeight,
    reviewsCountAlignSelf,
    reviewsCountWidth,
    mDisplay,
    mMinWidth,
    mAlignSelf,
    mFlex,
    reviewsTextAlignSelf,
    reviewsTextFlex,
    reviewsDisplay,
    reviewsMinWidth,
    reviewsAlignSelf,
    reviewsFlex,
    emptyBarsMinWidth,
    emptyBarsWidth,
    divMinWidth,
    divWidth,
    divMinWidth1,
    divWidth1,
    divMinWidth2,
    divWidth2,
    ratingMinWidth,
    ratingWidth,
    raitingValue,
    grades,
  } = props;
  //===================================================================================================
  //==========================={Redux Block}====================================================
  //===================================================================================================
  const { fourPointThree, fifteenM, reviews } = appData;
  //===================================================================================================
  //================================={React states}====================================================
  //===================================================================================================

  const reviewsContent1Style = useMemo(() => {
    return {
      minWidth: propMinWidth,
      height: reviewsContentHeight,
    };
  }, [propMinWidth, reviewsContentHeight]);

  const ratingVisualsStyle = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  const reviewsContent2Style = useMemo(() => {
    return {
      width: reviewsContentWidth,
      flex: reviewsContentFlex,
    };
  }, [reviewsContentWidth, reviewsContentFlex]);

  const ratingScoreStyle = useMemo(() => {
    return {
      alignSelf: ratingScoreAlignSelf,
      flex: ratingScoreFlex,
    };
  }, [ratingScoreAlignSelf, ratingScoreFlex]);

  const scoreValueStyle = useMemo(() => {
    return {
      display: scoreValueDisplay,
      minWidth: scoreValueMinWidth,
      alignSelf: scoreValueAlignSelf,
      flex: scoreValueFlex,
    };
  }, [
    scoreValueDisplay,
    scoreValueMinWidth,
    scoreValueAlignSelf,
    scoreValueFlex,
  ]);

  const reviewsInfoStyle = useMemo(() => {
    return {
      alignSelf: reviewsInfoAlignSelf,
      height: reviewsInfoHeight,
    };
  }, [reviewsInfoAlignSelf, reviewsInfoHeight]);

  const reviewsCountStyle = useMemo(() => {
    return {
      alignSelf: reviewsCountAlignSelf,
      width: reviewsCountWidth,
    };
  }, [reviewsCountAlignSelf, reviewsCountWidth]);

  const mStyle = useMemo(() => {
    return {
      display: mDisplay,
      minWidth: mMinWidth,
      alignSelf: mAlignSelf,
      flex: mFlex,
    };
  }, [mDisplay, mMinWidth, mAlignSelf, mFlex]);

  const reviewsTextStyle = useMemo(() => {
    return {
      alignSelf: reviewsTextAlignSelf,
      flex: reviewsTextFlex,
    };
  }, [reviewsTextAlignSelf, reviewsTextFlex]);

  const reviewsStyle = useMemo(() => {
    return {
      display: reviewsDisplay,
      minWidth: reviewsMinWidth,
      alignSelf: reviewsAlignSelf,
      flex: reviewsFlex,
    };
  }, [reviewsDisplay, reviewsMinWidth, reviewsAlignSelf, reviewsFlex]);

  const emptyBarsStyle = useMemo(() => {
    return {
      minWidth: emptyBarsMinWidth,
      width: emptyBarsWidth,
    };
  }, [emptyBarsMinWidth, emptyBarsWidth]);

  const div1Style = useMemo(() => {
    return {
      minWidth: divMinWidth,
      width: divWidth,
    };
  }, [divMinWidth, divWidth]);

  const div2Style = useMemo(() => {
    return {
      minWidth: divMinWidth1,
      width: divWidth1,
    };
  }, [divMinWidth1, divWidth1]);

  const div3Style = useMemo(() => {
    return {
      minWidth: divMinWidth2,
      width: divWidth2,
    };
  }, [divMinWidth2, divWidth2]);

  const ratingStyle = useMemo(() => {
    return {
      minWidth: ratingMinWidth,
      width: ratingWidth,
    };
  }, [ratingMinWidth, ratingWidth]);

  return (
    <div
      className={`w-[327px] flex flex-row items-start justify-start gap-[23px] max-w-full text-left text-37xl text-gray-100 font-roboto mq450:flex-wrap ${className}`}
      style={reviewsContent2Style}
    >
      <div className="w-fit flex flex-col items-start justify-start gap-2 min-w-[82px]">
        <div
          className="flex flex-row items-start justify-start py-0 pl-0 pr-1"
          style={ratingScoreStyle}
        >
          <div
            className="text-center relative leading-[64px] inline-block min-w-[78px]"
            style={scoreValueStyle}
          >
            {raitingValue}
          </div>
        </div>
        <div
          className="flex flex-row items-start justify-start py-0 pl-0 pr-1"
          style={ratingScoreStyle}
        >
          <div className="flex relative leading-[64px] min-w-[78px]">
            {[...Array(5)].map((_, index) => {
              const starSrc =
                index < Math.floor(Number(raitingValue))
                  ? "/pwa_icons/icon-start-blue.svg"
                  : "/pwa_icons/icon-star-white.png";

              return (
                <img
                  key={index}
                  className="h-3 w-3 relative overflow-hidden shrink-0"
                  alt=""
                  src={starSrc}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-row items-start justify-start py-0 pl-0 pr-1 gap-0.5 text-2xs text-dimgray w-full">
          <div className="flex flex-row items-start justify-start w-full">
            <div className="relative tracking-[0.3px] leading-[16px] inline-block w-full">
              {fifteenM} {reviews}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex-1 flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border min-w-[144px] text-xs text-dimgray"
        style={ratingVisualsStyle}
      >
        <div className="self-stretch flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-row items-start justify-start gap-[15px]">
              <div
                className="relative tracking-[0.3px] leading-[16px] inline-block min-w-[8px]"
                style={emptyBarsStyle}
              >
                5
              </div>
              <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                <div className="self-stretch h-2.5 relative rounded-9980xl bg-whitesmoke-200">
                  <div className="absolute top-[0px] left-[0px] rounded-9980xl bg-whitesmoke-200 w-full h-full hidden" />
                  <div
                    className="absolute top-[0px] left-[0px] rounded-9980xl bg-blue_default h-2.5 z-[1]"
                    style={{ width: `${grades?.[0].value}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[15px]">
              <div
                className="relative tracking-[0.3px] leading-[16px] inline-block min-w-[8px] z-[1]"
                style={div1Style}
              >
                4
              </div>
              <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                <div className="self-stretch h-2.5 relative rounded-9980xl bg-whitesmoke-200">
                  <div className="absolute top-[0px] left-[0px] rounded-9980xl bg-whitesmoke-200 w-full h-full hidden" />
                  <div
                    className="absolute top-[0px] left-[0px] rounded-9980xl bg-blue_default h-2.5 z-[1]"
                    style={{ width: `${grades?.[1].value}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-row items-start justify-start gap-[15px]">
              <div
                className="relative tracking-[0.3px] leading-[16px] inline-block min-w-[8px] z-[2]"
                style={div2Style}
              >
                3
              </div>
              <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                <div className="self-stretch h-2.5 relative rounded-9980xl bg-whitesmoke-200">
                  <div className="absolute top-[0px] left-[0px] rounded-9980xl bg-whitesmoke-200 w-full h-full hidden" />
                  <div
                    className="absolute top-[0px] left-[0px] rounded-9980xl bg-blue_default h-2.5 z-[1]"
                    style={{ width: `${grades?.[2].value}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[15px]">
              <div
                className="relative tracking-[0.3px] leading-[16px] inline-block min-w-[8px] z-[3]"
                style={div3Style}
              >
                2
              </div>
              <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                <div className="self-stretch h-2.5 relative rounded-9980xl bg-whitesmoke-200">
                  <div className="absolute top-[0px] left-[0px] rounded-9980xl bg-whitesmoke-200 w-full h-full hidden" />
                  <div
                    className="absolute top-[0px] left-[0px] rounded-9980xl bg-blue_default h-2.5 z-[1]"
                    style={{ width: `${grades?.[3].value}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start gap-[15px]">
            <div
              className="relative tracking-[0.3px] leading-[16px] inline-block min-w-[8px] z-[4]"
              style={ratingStyle}
            >
              1
            </div>
            <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
              <div className="self-stretch h-2.5 relative rounded-9980xl bg-whitesmoke-200">
                <div className="absolute top-[0px] left-[0px] rounded-9980xl bg-whitesmoke-200 w-full h-full hidden" />
                <div
                  className="absolute top-[0px] left-[0px] rounded-9980xl bg-blue_default  h-2.5 z-[1]"
                  style={{ width: `${grades?.[4].value}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsContent;
