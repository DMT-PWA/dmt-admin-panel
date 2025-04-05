import { FC, useMemo } from "react";
import { useAppSelector } from "src/shared/lib/store";

import { ICollection } from "src/shared/types";

type CaroselReviewContainerTabletProps = {
  propWidth: number | string;
  propHeight: number | string;
  propFlex: string;
  screenShots: Array<string>;
};

const CaroselReviewContainerTablet: FC<CaroselReviewContainerTabletProps> = (
  props
) => {
  const { currentCollection } = useAppSelector((state) => state.pwa_design);

  const emptyCollections = () => {
    if (!currentCollection) {
      return Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="w-20 h-35 relative rounded-[6px] bg-[#D6D6D6]"
        ></div>
      ));
    }

    return currentCollection.images.map((photo: string, i: number) => {
      if (photo) {
        return (
          <img
            key={i}
            className="self-stretch w-[80px] relative rounded-lg max-h-full overflow-hidden object-cover"
            alt=""
            loading="lazy"
            src={photo}
          />
        );
      }

      return (
        <div
          key={`empty-${i}`}
          className="w-20 h-35 relative rounded-[6px] bg-[#D6D6D6]"
        ></div>
      );
    });
  };
  const { propWidth, propHeight, propFlex, screenShots } = props;
  const caroselReviewContainerStyle = useMemo(() => {
    return {
      width: propWidth,
      height: propHeight,
      flex: propFlex,
    };
  }, [propWidth, propHeight, propFlex]);

  return (
    <section
      className="flex flex-row items-start justify-start md:pr-0 box-border max-w-full mb-7"
      style={caroselReviewContainerStyle}
    >
      <div className="w-full overflow-x-auto shrink-0 flex flex-row items-center justify-center gap-[10px] max-w-full whitespace-nowrap container-snap container-snap">
        {emptyCollections()}
      </div>
    </section>
  );
};

export default CaroselReviewContainerTablet;
