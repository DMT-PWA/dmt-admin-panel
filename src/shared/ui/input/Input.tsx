import clsx from "clsx";
import { FC } from "react";

type InputProps = {
  label?: string;
  value?: string | number;
  input_classes?: string;
  container_classes?: string;
  placeholder?: string;
  type?: string;
};

export const InputDefault: FC<InputProps> = ({
  label,
  value,
  input_classes,
  container_classes,
  placeholder,
  type = "text",
}) => {
  return (
    <div
      className={clsx("flex gap-1.5", container_classes, {
        "flex-col": type !== "checkbox",
        "justify-between": type === "checkbox",
      })}
    >
      <label className="title__view-1">{label}</label>
      <input
        type={type}
        value={value}
        className={`input__default ${input_classes ? input_classes : ""}`}
        placeholder={placeholder}
      />
    </div>
  );
};
