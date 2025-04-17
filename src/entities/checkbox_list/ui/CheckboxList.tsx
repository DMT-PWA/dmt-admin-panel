import { FC } from "react";
import { Checkbox, Label, Field } from "@headlessui/react";
import { checkbox } from "src/shared/types";

interface ICheckboxList {
  handleChange: (val: { id: number; value: boolean }) => void;
  values: Array<checkbox>;
}

export const CheckboxList: FC<ICheckboxList> = ({ handleChange, values }) => {
  return (
    <Field className="flex flex-col gap-[9px] pt-[21px] max-w-[243px]">
      <div className="flex justify-between">
        <Label>Есть реклама</Label>
        <Checkbox
          checked={values.some((item) => item.id === 0)}
          onChange={(e) => handleChange({ id: 0, value: e })}
          className="group block size-4 rounded border data-[checked]:border-0 bg-white data-[checked]:bg-orange"
        ></Checkbox>
      </div>
      <div className="flex justify-between">
        <Label>Покупки в приложении</Label>
        <Checkbox
          checked={values.some((item) => item.id === 1)}
          onChange={(e) => handleChange({ id: 1, value: e })}
          className="group block size-4 rounded border data-[checked]:border-0 bg-white data-[checked]:bg-orange"
        ></Checkbox>
      </div>
      <div className="flex justify-between">
        <Label>Выбор редакции</Label>
        <Checkbox
          checked={values.some((item) => item.id === 2)}
          onChange={(e) => handleChange({ id: 2, value: e })}
          className="group block size-4 rounded border data-[checked]:border-0  bg-white data-[checked]:bg-orange"
        ></Checkbox>
      </div>
    </Field>
  );
};
