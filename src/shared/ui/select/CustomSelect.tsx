import { FC, ReactElement } from "react";
import Select from "react-select";

type ISelectProps = {
  placeholder: string;
  options: object[];
  classes: string;
};

export const CustomSelect: FC<Partial<ISelectProps>> = ({
  placeholder,
  options,
  classes,
}) => {
  const CustomSelectValue = (props): ReactElement => {
    return <div className="flex custom-select">{props.children}</div>;
  };

  return (
    <Select
      options={options}
      placeholder={placeholder}
      className={classes}
      classNamePrefix={null}
      classNames={{
        input: () => "!py-0 !m-0",
        option: () => "!px-4 !py-3 text-view-6",
        indicatorSeparator: () => "hidden",
      }}
      components={{
        Control: CustomSelectValue,
      }}
    />
  );
};
