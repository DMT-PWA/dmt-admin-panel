import { FC } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

type Option = {
  readonly value: string;
  readonly label: string;
};

interface ISelectProps {
  placeholder: string;
  options: Option[];
  classes: string;
  value: Option;
  onChange?: (
    selectedOption: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => void;
}

export const CustomSelect: FC<Partial<ISelectProps>> = ({
  placeholder,
  options,
  classes,
  value = null,
  onChange,
}) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
      value={value}
      openMenuOnFocus
      onChange={onChange}
      className={`custom-select ${classes}`}
      classNamePrefix="react-select"
    />
  );
};
