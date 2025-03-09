import { FC } from "react";

type InputRangeProps = {
  value: number;
  rating: number;
};

export const InputRange: FC<InputRangeProps> = ({ value, rating }) => {
  return (
    <div className="flex flex-col gap-[15px]">
      <span className="text__deafult text-view-1" style={{ left: `${value}%` }}>
        Количество оценок {rating} в %
      </span>
      <input
        type="range"
        min="0"
        max="100"
        disabled
        value={value}
        className="w-full h-0.75 bg-orange appearance-none cursor-pointer"
      />
    </div>
  );
};
