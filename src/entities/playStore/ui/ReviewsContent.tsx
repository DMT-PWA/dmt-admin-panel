import { FC, useMemo } from "react";
import clsx from "clsx";

interface ReviewsContentProps {
  raitingValue: string | number | null;
  grades: { id: number; value: number | string; raiting: number }[];
  isArabic: boolean;
  reviews: string;
  reviews_count: string;
}

const ReviewsContent: FC<Partial<ReviewsContentProps>> = (props) => {
  const {
    raitingValue,
    grades,
    isArabic = false,
    reviews,
    reviews_count,
  } = props;

  //===================================================================================================
  //================================={React states}====================================================
  //===================================================================================================

  function formatNumber(num: string) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(Number(num));
  }

  const ratingVisualsStyle = useMemo(() => {
    return {
      minWidth: "144px",
    };
  }, []);

  const reviewsContent2Style = useMemo(() => {
    return {
      width: "unset",
      flex: "1",
    };
  }, []);

  const ratingScoreStyle = useMemo(() => {
    return {
      alignSelf: "stretch",
      flex: "1",
    };
  }, []);

  const scoreValueStyle = useMemo(() => {
    return {
      display: "unset",
      minWidth: "unset",
      alignSelf: "stretch",
      flex: "1",
    };
  }, []);

  const emptyBarsStyle = useMemo(() => {
    return {
      minWidth: "unset",
      width: "8px",
    };
  }, []);

  const div1Style = useMemo(() => {
    return {
      minWidth: "unset",
      width: "8px",
    };
  }, []);

  const div2Style = useMemo(() => {
    return {
      minWidth: "unset",
      width: "8px",
    };
  }, []);

  const div3Style = useMemo(() => {
    return {
      minWidth: "unset",
      width: "8px",
    };
  }, []);

  const ratingStyle = useMemo(() => {
    return {
      minWidth: "unset",
      width: "8px",
    };
  }, []);

  return (
    <div
      className={clsx(
        `w-[327px] flex flex-row items-start justify-start gap-[23px] max-w-full text-left text-37xl text-gray-100 font-roboto mq450:flex-wrap `,
        { "flex-row-reverse": isArabic }
      )}
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
              {formatNumber(reviews_count ?? "")} {reviews}
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
            <div
              className={clsx(
                "self-stretch flex flex-row items-start justify-start gap-[15px]",
                { "flex-row-reverse": isArabic }
              )}
            >
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
            <div
              className={clsx(
                "self-stretch flex flex-row items-start justify-start gap-[15px]",
                { "flex-row-reverse": isArabic }
              )}
            >
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
            <div
              className={clsx(
                "self-stretch flex flex-row items-start justify-start gap-[15px]",
                { "flex-row-reverse": isArabic }
              )}
            >
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
            <div
              className={clsx(
                "self-stretch flex flex-row items-start justify-start gap-[15px]",
                { "flex-row-reverse": isArabic }
              )}
            >
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
          <div
            className={clsx(
              "self-stretch flex flex-row items-start justify-start gap-[15px]",
              { "flex-row-reverse": isArabic }
            )}
          >
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
