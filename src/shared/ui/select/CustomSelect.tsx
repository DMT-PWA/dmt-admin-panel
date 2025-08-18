import { FC } from "react";
import Select, {
  ActionMeta,
  GroupBase,
  SelectComponentsConfig,
  SingleValue,
} from "react-select";

type Option = {
  readonly value: string;
  readonly label: string;
};

interface ISelectProps {
  placeholder: string;
  options: Option[] | undefined;
  classes: string;
  value: Option | undefined;
  onChange?: (
    selectedOption: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => void;
  isDisabled: boolean;
  components:
    | Partial<SelectComponentsConfig<Option, false, GroupBase<Option>>>
    | undefined;
}

export const CustomSelect: FC<Partial<ISelectProps>> = ({
  placeholder,
  options,
  classes,
  value = null,
  onChange,
  isDisabled = false,
  components,
}) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
      value={value}
      openMenuOnFocus
      components={components}
      isDisabled={isDisabled}
      onChange={onChange}
      className={`custom-select ${classes}`}
      classNamePrefix="react-select"
    />
  );
};
