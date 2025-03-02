import { FC } from "react";

interface ITitle {
  readonly title: string;
  readonly withContainer?: boolean;
  readonly classes?: string;
}

export const Title: FC<ITitle> = ({ title, classes, withContainer = true }) => {
  return (
    <div className={withContainer ? "title__container" : ""}>
      <h1 className={classes ? classes : ""}>{title}</h1>
    </div>
  );
};
