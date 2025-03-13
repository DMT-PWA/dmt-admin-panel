import clsx from "clsx";
import { FC, MouseEvent } from "react";
import arrow_left from "../../assets/icons/arrow_left.png";

type Button = {
  btn_text: string;
  btn_classes: string;
  onClickHandler: (
    event: MouseEvent<HTMLButtonElement>
  ) => void | Promise<void> | (object | null)[];
  withArrow: boolean;
};

export const ButtonDefault: FC<Partial<Button>> = ({
  btn_text,
  btn_classes,
  onClickHandler,
  withArrow = false,
}) => (
  <button
    onClick={onClickHandler}
    className={clsx(btn_classes, "btn__default", {
      "flex justify-between items-center": withArrow,
    })}
  >
    {withArrow && (
      <div className="h-[19px] w-[19px] flex items-center gap-[11px]">
        <img src={arrow_left} width={11} height={10} />
      </div>
    )}
    {btn_text}
  </button>
);
