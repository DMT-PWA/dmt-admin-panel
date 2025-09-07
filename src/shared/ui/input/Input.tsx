import clsx from "clsx";
import { ChangeEvent, FC, KeyboardEvent, ReactNode } from "react";

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
  valid: boolean;
  error_message: string;
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
  valid = true,
  error_message = "Это имя уже используется",
}) => {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "+" || e.key === "-") {
      e.preventDefault();
      return;
    }
  };

  return (
    <div
      className={clsx("flex", container_classes, {
        "flex-col": type !== "checkbox",
        "justify-between": type === "checkbox",
        "gap-1.5": label,
      })}
    >
      <label
        className={clsx(
          { "title__view-1": !label_classes },
          { "title__view-1 !text-red-1": !valid },
          label_classes
        )}
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
        min={0}
        disabled={disabled}
        className={clsx(
          `input__default`,
          {
            "border-red-1": !valid,
          },
          input_classes
        )}
        placeholder={placeholder}
        onChange={onUpdateValue}
        onKeyDown={onKeyDown}
      />
      {children}
      {!valid && (
        <span className="text-view-1 text-red-1">{error_message}</span>
      )}
    </div>
  );
};
