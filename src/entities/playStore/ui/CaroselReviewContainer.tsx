import { useMemo } from "react";
import PropTypes from "prop-types";

const CaroselReviewContainer = ({
  className = "",
  propWidth,
  propHeight,
  propFlex,
  sliderItem,
  sliderItem1,
  sliderItem2,
  sliderItem3,
  sliderItem4,
  sliderItem5,
  sliderItem6,
  sliderItem7,
}) => {
  const caroselReviewContainerStyle = useMemo(() => {
    return {
      width: propWidth,
      height: propHeight,
      flex: propFlex,
    };
  }, [propWidth, propHeight, propFlex]);

  return (
    <section
      // className="flex flex-row items-start justify-start pt-0 pb-5 pr-10 md:pr-0 box-border max-w-full"
      className="w-full flex flex-row items-start justify-start pt-0 pb-5 pr-10 md:pr-0 box-border max-w-full"
      // style={caroselReviewContainerStyle}
    >
      <div className="w-full pt-[20px] pb-[20px] overflow-x-auto shrink-0 flex flex-row items-start justify-start gap-[0px] max-w-full">
        <>
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            loading="lazy"
            alt=""
            src={sliderItem}
          />

          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem1}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem2}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem3}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem4}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem5}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem6}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem6}
          />
        </>
        <>
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            loading="lazy"
            alt=""
            src={sliderItem}
          />

          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem1}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem2}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem3}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem4}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem5}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem6}
          />
          <img
            className="self-stretch w-[166.5px] relative rounded-lg max-h-full overflow-hidden shrink-0 object-cover min-h-[296px]"
            alt=""
            src={sliderItem6}
          />
        </>
      </div>
    </section>
    // <div
    //   className={`w-full h-[336px] overflow-x-auto shrink-0 flex flex-row items-start justify-start py-5 px-2.5 box-border gap-5 max-w-full ${className}`}

    // >

    // </div>
  );
};

CaroselReviewContainer.propTypes = {
  className: PropTypes.string,
  sliderItem: PropTypes.string,
  sliderItem1: PropTypes.string,
  sliderItem2: PropTypes.string,
  sliderItem3: PropTypes.string,
  sliderItem4: PropTypes.string,
  sliderItem5: PropTypes.string,
  sliderItem6: PropTypes.string,
  sliderItem7: PropTypes.string,

  /** Style props */
  propWidth: PropTypes.any,
  propHeight: PropTypes.any,
  propFlex: PropTypes.any,
};

export default CaroselReviewContainer;
