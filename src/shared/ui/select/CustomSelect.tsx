import { FC } from "react";
import Select from "react-select/base";

type ISelectProps = {
  placeholder: string;
};

export const CustomSelect: FC<Partial<ISelectProps>> = ({ placeholder }) => {
  const CustomSelectValue = ({ children, ...props }) => {
    return (
      <div className="flex custom-select" {...props.innerProps}>
        {children}
      </div>
    );
  };

  return (
    <Select
      options={[{ value: "chocolate", label: "Chocolate" }]}
      placeholder={placeholder}
      classNames={{
        input: () => "!py-0 !m-0",
      }}
      components={{
        Control: CustomSelectValue,
      }}
    />
  );
};
