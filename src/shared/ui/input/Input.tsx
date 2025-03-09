import clsx from "clsx";
import { ChangeEvent, FC } from "react";

type InputProps = {
  label: string;
  value: string | number;
  input_classes: string;
  label_classes: string;
  container_classes: string;
  placeholder: string;
  type: string;
  onUpdateValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const InputDefault: FC<Partial<InputProps>> = ({
  label,
  value,
  input_classes,
  label_classes,
  container_classes,
  placeholder,
  type = "text",
  onUpdateValue,
}) => {
  return (
    <div
      className={clsx("flex gap-1.5", container_classes, {
        "flex-col": type !== "checkbox",
        "justify-between": type === "checkbox",
      })}
    >
      <label className={clsx({ "title__view-1": !label_classes })}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        className={clsx(`input__default`, input_classes)}
        placeholder={placeholder}
        onChange={onUpdateValue}
      />
    </div>
  );
};
