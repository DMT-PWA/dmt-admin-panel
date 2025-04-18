import clsx from "clsx";
import { ChangeEvent, FC, ReactNode } from "react";

type InputProps = {
  label: string;
  value: string | number;
  input_classes: string;
  label_classes: string;
  container_classes: string;
  placeholder: string;
  type: string;
  max: number;
  disabled: boolean;
  onUpdateValue: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  isRequired: boolean;
};

export const InputDefault: FC<Partial<InputProps>> = ({
  label,
  value,
  input_classes,
  label_classes,
  container_classes,
  placeholder,
  max,
  disabled = false,
  type = "text",
  onUpdateValue,
  children,
  isRequired = false,
}) => {
  return (
    <div
      className={clsx("flex", container_classes, {
        "flex-col": type !== "checkbox",
        "justify-between": type === "checkbox",
        "gap-1.5": label,
      })}
    >
      <label
        className={clsx({ "title__view-1": !label_classes }, label_classes)}
      >
        {label}
        {isRequired && (
          <span className="text-red-600 align-super size-[0.8rem]">*</span>
        )}
      </label>
      <input
        type={type}
        value={value}
        max={max}
        disabled={disabled}
        className={clsx(`input__default`, input_classes)}
        placeholder={placeholder}
        onChange={onUpdateValue}
      />
      {children}
    </div>
  );
};
