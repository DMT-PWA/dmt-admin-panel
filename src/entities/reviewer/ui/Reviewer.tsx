import React from "react";
import { useMediaQuery } from "src/shared/lib/hooks";

const reviewData1 = [
  {
    name: "samurai",
    date: "January 22, 2024",
    review: `Application works very well and withdraws money quickly. I advise everyone to download this application`,
    helpful: `people found this review helpful`,
    helpfulCount: `13`,
    photo: "/t1.png",
    rating: "5",
  },
  {
    name: "Bracken322",
    date: "January 21, 2024",
    review: `Waited 10 minutes to withdraw money to my account, started to worry, wrote to support and the money came immediately. Good application`,
    helpful: `people found this review helpful`,
    helpfulCount: `4`,
    photo: "/t2.png",
    rating: "4",
  },
  {
    name: "Jack Sparrow",
    date: "January 18, 2024",
    review: `1xBet is a great app. I recommend it to everyone`,
    helpful: `people found this review helpful`,
    helpfulCount: `2`,
    photo: "/t3.png",
    rating: "4",
  },
  {
    name: "Sheff816",
    date: "January 12, 2024",
    review: `Just withdrew 1400$, definitely recommend!`,
    helpful: `people found this review helpful`,
    helpfulCount: `185`,
    photo: "/t4.png",
    rating: "4",
  },
];

const Reviewer = (props) => {
  const {
    reviewData,
    helpful = "people found this review helpful",
    findHelpful = "Did you find this helpful?",
    yes = "Yes",
    no = "No",
    onClick,
  } = props;

  const isMobile = useMediaQuery("(max-width: 600px)");

  const oneStar = (review) => {
    return (
      <div className="w-fit h-9 shrink-0 flex flex-row items-start justify-start pt-0 px-5 pb-5 box-border">
        {isMobile ? (
          <div className="self-stretch flex-1 flex flex-row items-start justify-start shrink-0">
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[2]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[3]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
              <img
                className="w-3 h-3 relative overflow-hidden shrink-0 z-[4]"
                alt=""
                src="/pwa_icons/iconstartsmall.svg"
              />
            </div>
            <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
              {review.date}
            </div>
          </div>
        ) : (
          <div className="self-stretch flex-1 flex flex-row items-start justify-start shrink-0">
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[2]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[3]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
              <img
                className="w-3 h-3 relative overflow-hidden shrink-0 z-[4]"
                alt=""
                src="/pwa_icons/iconstartsmall.svg"
              />
            </div>
            <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
              {review.date}
            </div>
          </div>
        )}
      </div>
    );
  };

  const twoStar = (review) => {
    return (
      <div className="w-fit h-9 shrink-0 flex flex-row items-start justify-start pt-0 px-5 pb-5 box-border">
        {isMobile ? (
          <div className="self-stretch flex-1 flex flex-row items-start justify-start shrink-0">
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[2]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[3]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
              <img
                className="w-3 h-3 relative overflow-hidden shrink-0 z-[4]"
                alt=""
                src="/pwa_icons/iconstartsmall.svg"
              />
            </div>
            <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
              {review.date}
            </div>
          </div>
        ) : (
          <div className="self-stretch flex-1 flex flex-row items-start justify-start shrink-0">
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[2]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[3]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
              <img
                className="w-3 h-3 relative overflow-hidden shrink-0 z-[4]"
                alt=""
                src="/pwa_icons/iconstartsmall.svg"
              />
            </div>
            <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
              {review.date}
            </div>
          </div>
        )}
      </div>
    );
  };

  const threeStar = (review) => {
    return (
      <div className="w-fit h-9 shrink-0 flex flex-row items-start justify-start pt-0 px-5 pb-5 box-border">
        {isMobile ? (
          <div className="self-stretch flex-1 flex flex-row items-start justify-start shrink-0">
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[2]"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[3]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
              <img
                className="w-3 h-3 relative overflow-hidden shrink-0 z-[4]"
                alt=""
                src="/pwa_icons/iconstartsmall.svg"
              />
            </div>
            <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
              {review.date}
            </div>
          </div>
        ) : (
          <div className="self-stretch flex-1 flex flex-row items-start justify-start shrink-0">
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[2]"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[3]"
              alt=""
              src="/pwa_icons/iconstartsmall.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
              <img
                className="w-3 h-3 relative overflow-hidden shrink-0 z-[4]"
                alt=""
                src="/pwa_icons/iconstartsmall.svg"
              />
            </div>
            <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
              {review.date}
            </div>
          </div>
        )}
      </div>
    );
  };

  const fourStar = (review) => {
    return (
      <div className="w-fit h-9 shrink-0 flex flex-row items-start justify-start pt-0 px-5 pb-5 box-border">
        {isMobile ? (
          <div className="self-stretch flex-1 flex flex-row items-start justify-start shrink-0">
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[2]"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[3]"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
              <img
                className="w-3 h-3 relative overflow-hidden shrink-0 z-[4]"
                alt=""
                src="/pwa_icons/iconstartsmall.svg"
              />
            </div>
            <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
              {review.date}
            </div>
          </div>
        ) : (
          <div className="self-stretch flex-1 flex flex-row items-start justify-start shrink-0">
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[2]"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[3]"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
              <img
                className="w-3 h-3 relative overflow-hidden shrink-0 z-[4]"
                alt=""
                src="/pwa_icons/iconstartsmall.svg"
              />
            </div>
            <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
              {review.date}
            </div>
          </div>
        )}
      </div>
    );
  };

  const fiveStar = (review) => {
    return (
      <div className="w-fit h-9 shrink-0 flex flex-row items-start justify-start pt-0 px-5 pb-5 box-border">
        {isMobile ? (
          <div className="self-stretch flex-1 flex flex-row items-start justify-start shrink-0">
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[2]"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[3]"
              alt=""
              src="/pwa_icons/icon-start-blue.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
              <img
                className="w-3 h-3 relative overflow-hidden shrink-0 z-[4]"
                alt=""
                src="/pwa_icons/icon-start-blue.svg"
              />
            </div>
            <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
              {review.date}
            </div>
          </div>
        ) : (
          <div className="self-stretch flex-1 flex flex-row items-start justify-start shrink-0">
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[2]"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <img
              className="h-3 w-3 relative overflow-hidden shrink-0 z-[3]"
              alt=""
              src="/pwa_icons/iconstartsmall-1.svg"
            />
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-1.5">
              <img
                className="w-3 h-3 relative overflow-hidden shrink-0 z-[4]"
                alt=""
                src="/pwa_icons/iconstartsmall-1.svg"
              />
            </div>
            <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
              {review.date}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {reviewData.length > 0 &&
        reviewData.map((review, index) => (
          <>
            <div
              className="self-stretch flex flex-row items-start justify-start pt-0 px-5 pb-5 box-border max-w-full shrink-0 text-sm text-gray-100"
              key={index}
            >
              <div className="flex-1 flex flex-row items-center justify-between py-0 pl-0 pr-5 box-border shrink-0 max-w-full gap-5">
                <div className="w-fit flex flex-row items-center justify-start py-0 pl-0 pr-[68px] box-border gap-2.5">
                  <img
                    className="h-8 w-8 rounded-341xl overflow-hidden shrink-0 object-cover"
                    alt=""
                    src={review?.photo}
                  />
                  <div className="h-5 flex-1 flex flex-row items-center justify-center">
                    <div className="self-stretch flex-1 relative tracking-[0.2px] leading-[20px]">
                      {review.name}
                    </div>
                  </div>
                </div>
                <div
                  className="overflow-hidden flex flex-row items-center justify-start py-1 px-2.5 box-border w-6 h-6"
                  onClick={onClick}
                >
                  <img
                    className="h-4 w-1 relative"
                    alt=""
                    src="/pwa_icons/vector-16.svg"
                  />
                </div>
              </div>
            </div>
            <>{review?.rating === "1" && <>{oneStar(review)}</>}</>
            <>{review?.rating === "2" && <>{twoStar(review)}</>}</>
            <>{review?.rating === "3" && <>{threeStar(review)}</>}</>
            <>{review?.rating === "4" && <>{fourStar(review)}</>}</>
            <>{review?.rating === "5" && <>{fiveStar(review)}</>}</>

            <section className="self-stretch flex flex-row items-start justify-start pt-0 pb-5 pl-5 pr-[30px] box-border max-w-full shrink-0 text-left text-sm text-dimgray font-roboto">
              <div className="h-fit flex-1 relative tracking-[0.2px] leading-[20px] inline-block shrink-0 max-w-full">
                {review.review}
              </div>
            </section>
            <section className="h-[100px] shrink-0 flex flex-row items-start justify-start pt-0 px-5 pb-10 box-border max-w-full text-left text-xs text-dimgray font-roboto">
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-5 shrink-0">
                <div className="w-fit flex-1 flex flex-row items-start justify-start gap-1.5">
                  <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
                    {/* {review.helpfulCount} {helpful} */}
                    {review.helpful}
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start gap-[23px]">
                  <div className="flex-1 flex flex-col items-start justify-start pt-2 px-0 pb-0">
                    <div className="self-stretch h-4 relative tracking-[0.3px] leading-[16px] inline-block">
                      {findHelpful}
                    </div>
                  </div>
                  <div className="w-[122px] flex flex-row items-start justify-start gap-3 text-sm">
                    <div className="cursor-pointer h-6 flex-1 rounded-9980xl border-gainsboro-200 border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start py-[3px] pl-4 pr-[15px]">
                      <div className="self-stretch w-6 relative tracking-[0.25px] leading-[18px] inline-block">
                        {yes}
                      </div>
                    </div>
                    <div className="cursor-pointer h-6 flex-1 rounded-9980xl border-gainsboro-200 border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start py-[3px] px-4">
                      <div className="self-stretch w-[19px] relative tracking-[0.25px] leading-[18px] inline-block">
                        {no}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ))}
    </>
  );
};

export default Reviewer;
