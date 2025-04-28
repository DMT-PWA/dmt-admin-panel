import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { appData } from "src/shared/lib/data";

const ReviewContent1 = ({ className = "" }) => {
  //===================================================================================================
  //==========================={Translations Block}====================================================
  //===================================================================================================
  const { allReviews, whatsNew } = appData;
  //===================================================================================================
  //================================={React states}====================================================
  //===================================================================================================

  return (
    <section
      className={`w-full h-fit shrink-0 flex flex-row items-start justify-start pt-0 px-5 pb-5 box-border max-w-full text-left text-xs text-dimgray font-roboto ${className}`}
    >
      <div className="self-stretch flex-1 flex flex-row items-start justify-start gap-3 shrink-0">
        <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-5">
          <div className="self-stretch flex-1 flex flex-row items-start justify-start gap-6">
            <div className="self-stretch flex-1 flex flex-col items-start justify-start pt-2 px-0 pb-0">
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-10">
                <div className="w-full flex-1 flex flex-col items-start justify-start gap-5 text-sm text-onexBlueLight tabletBlack:text-seagreen-300">
                  <div className="self-stretch flex-1 flex flex-row items-start justify-start py-0 pl-[11px] pr-0">
                    <div className="self-stretch flex-1 relative tracking-[0.15px] leading-[20px]">
                      {allReviews}
                    </div>
                  </div>
                  <div className="w-full h-6 relative text-lg leading-[24px] text-gray-100 inline-block">
                    {whatsNew}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ReviewContent1.propTypes = {
  className: PropTypes.string,
};

export default ReviewContent1;
