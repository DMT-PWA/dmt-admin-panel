import { FC } from "react";
import { Checkbox, Label, Field } from "@headlessui/react";

export const CheckboxList: FC = () => {
  return (
    <Field className="flex flex-col gap-[9px] pt-[21px] max-w-[243px]">
      <div className="flex justify-between">
        <Label>Есть реклама</Label>
        <Checkbox className="group block size-4 rounded border bg-white data-[checked]:bg-orange"></Checkbox>
      </div>
      <div className="flex justify-between">
        <Label>Покупки в приложении</Label>
        <Checkbox className="group block size-4 rounded border bg-white data-[checked]:bg-orange"></Checkbox>
      </div>
      <div className="flex justify-between">
        <Label>Выбор редакции</Label>
        <Checkbox className="group block size-4 rounded border bg-white data-[checked]:bg-orange"></Checkbox>
      </div>
    </Field>
  );
};
