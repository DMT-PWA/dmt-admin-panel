import { FC, MouseEvent } from "react";

type Button = {
  btn_text: string;
  btn_classes?: string;
  onClickHandler?: (
    event: MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;
};

export const ButtonDefault: FC<Button> = ({
  btn_text,
  btn_classes,
  onClickHandler,
}) => (
  <button
    onClick={onClickHandler}
    className={`btn__default ${btn_classes ? btn_classes : ""}`}
  >
    {btn_text}
  </button>
);
