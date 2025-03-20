import { FC, ReactElement } from "react";
import Select from "react-select";

type ISelectProps = {
  placeholder: string;
  options: object[];
  classes: string;
  value: null | string | number | object;
};

export const CustomSelect: FC<Partial<ISelectProps>> = ({
  placeholder,
  options,
  classes,
  value = null,
}) => {
  const CustomSelectValue = ({ children, ...props }): ReactElement => {
    return (
      <div className="flex custom-select" {...props.innerProps}>
        {children}
      </div>
    );
  };

  return (
    <Select
      options={options}
      placeholder={placeholder}
      value={value}
      openMenuOnFocus
      className={classes}
      classNamePrefix={null}
      classNames={{
        input: () => "!py-0 !m-0",
        option: () => "!px-4 !py-3 text-view-6 border-b-1 border-[#052C650F]",
        indicatorSeparator: () => "hidden",
        menu: () => "!mt-0",
        menuList: () => "!pt-0",
      }}
      components={{
        Control: CustomSelectValue,
      }}
    />
  );
};
