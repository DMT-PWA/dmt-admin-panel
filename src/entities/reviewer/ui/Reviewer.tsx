import clsx from "clsx";
import { format } from "date-fns";
import { FC } from "react";
import { IUserComment } from "src/shared/types";
import { CommentsList } from "src/entities/comments/@x/reviewer";
type ReviewerFields = "findHelpful" | "yes" | "no";

type ReviewerProps = Record<ReviewerFields, string> & {
  isArabic: boolean;
  commentsList: CommentsList;
};

const Reviewer: FC<ReviewerProps> = (props) => {
  const {
    findHelpful = "Did you find this helpful?",
    yes = "Yes",
    no = "No",
    isArabic,
    commentsList,
  } = props;

  const anyStars = (review_date: Date | string, review_raiting: number) => {
    const rating = Math.min(review_raiting, 5);
    return (
      <div
        className={clsx(
          "h-9 shrink-0 flex flex-row items-start pt-0 px-5 pb-5 box-border",
          isArabic ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={clsx(
            "self-stretch flex-1 flex flex-row items-start justify-start shrink-0",
            { "text-end": isArabic }
          )}
        >
          {[...Array(5)].map((_, index) => {
            const starSrc =
              index < rating
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
          <div
            className={clsx(
              "self-stretch ml-1.75 relative tracking-[0.3px] leading-[16px]",
              { "flex-1": !isArabic }
            )}
          >
            {format(review_date, "dd MMMM yyyy")}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {commentsList &&
        commentsList?.map((review: IUserComment, index: number) => (
          <div key={index} className="w-full">
            <div className="self-stretch flex flex-row items-start justify-start pt-0 px-5 pb-5 box-border max-w-full shrink-0 text-sm text-gray-100">
              <div
                className={clsx(
                  "flex-1 flex flex-row items-center justify-between py-0 pl-0 pr-5 box-border shrink-0 max-w-full gap-5",
                  { "flex-row-reverse": isArabic }
                )}
              >
                <div
                  className={clsx(
                    "w-fit flex flex-row items-center justify-start py-0 pl-0 box-border gap-2.5",
                    { "pr-[68px]": !isArabic }
                  )}
                >
                  {review.avatar ? (
                    <img
                      className="h-8 w-8 rounded-341xl overflow-hidden shrink-0 object-cover"
                      alt=""
                      src={review.avatar}
                    />
                  ) : (
                    <div className="w-8 h-8 relative rounded-full bg-[#D6D6D6]"></div>
                  )}
                  <div className="h-5 flex-1 flex flex-row items-center justify-center">
                    <div className="self-stretch flex-1 relative tracking-[0.2px] leading-[20px]">
                      {review.author_name}
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden flex flex-row items-center justify-start py-1 px-2.5 box-border w-6 h-6">
                  <img
                    className="h-4 w-1 relative"
                    alt=""
                    src="/pwa_icons/vector-16.svg"
                  />
                </div>
              </div>
            </div>

            {review.review_date &&
              anyStars(review.review_date || "", Number(review.raiting) || 0)}

            <section className="self-stretch flex flex-row items-start justify-start pt-0 pb-5 pl-5 pr-[30px] box-border max-w-full shrink-0 text-left text-sm text-dimgray font-roboto">
              <div
                className={clsx(
                  "h-fit flex-1 relative tracking-[0.2px] leading-[20px] inline-block shrink-0 max-w-full",
                  { "text-end": isArabic }
                )}
              >
                {review.comments_text}
              </div>
            </section>
            <section className="flex flex-row items-start justify-start pt-0 px-5 pb-10 box-border max-w-full text-left text-xs text-dimgray font-roboto">
              <div className="ml-5 flex-1 flex flex-col items-start justify-start gap-5">
                {/* <div className="w-fit flex-1 flex flex-row items-start justify-start gap-1.5">
                  <div className="self-stretch flex-1 relative tracking-[0.3px] leading-[16px]">
                    {review.helpful}
                  </div>
                </div> */}
                <div
                  className={clsx(
                    "self-stretch flex flex-row items-start justify-start gap-[23px]",
                    { "flex-row-reverse": isArabic }
                  )}
                >
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
            {review.developer_answer === true && (
              <section className="bg-[#F0F0F0] mb-5.25 mx-6.25 self-stretch pt-3 pb-5.75 px-4 flex flex-col gap-2.75 rounded-[11px]">
                <div className="flex justify-between">
                  <span className="text-view-8">{review.developer_name}</span>
                  <span className="text-view-8">
                    {review.answer_date
                      ? format(review.answer_date, "dd/MM/yyyy")
                      : ""}
                  </span>
                </div>
                <span className="text-view-9">{review.answer_text}</span>
              </section>
            )}
          </div>
        ))}
    </>
  );
};

export default Reviewer;
