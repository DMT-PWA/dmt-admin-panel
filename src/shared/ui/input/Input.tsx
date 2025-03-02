import { FC } from "react";

type InputProps = {
  label?: string;
  value?: string | number;
  input_classes?: string;
  placeholder?: string;
};

export const InputDefault: FC<InputProps> = ({
  label,
  value,
  input_classes,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="title__view-1">{label}</label>
      <input
        type="text"
        value={value}
        className={`input__default ${input_classes ? input_classes : ""}`}
        placeholder={placeholder}
      />
    </div>
  );
};
