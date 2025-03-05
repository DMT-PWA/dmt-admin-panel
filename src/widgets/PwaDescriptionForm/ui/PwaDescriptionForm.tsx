import { Field, Label, Textarea } from "@headlessui/react";
import { FC } from "react";
import { CheckboxList } from "src/entities/checkbox_list";
import { InputDefault } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";

export const PwaDescriptionForm: FC = () => {
  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[202px]">
      <Title title="Описание" withContainer={false} classes="title__view-2" />
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text__default">Основное</h2>
          <div className="bg-white rounded-[6px] mt-2 pl-4 pr-[19px] pt-3 pb-[30px]">
            <div className="flex gap-10">
              <InputDefault
                label="Название"
                input_classes=""
                container_classes="flex-[0.5]"
                placeholder="App Name"
              />
              <InputDefault
                label="Разработчик"
                input_classes=""
                container_classes="flex-[0.5]"
                placeholder="Developer Name"
              />
            </div>
            <div className="flex flex-col gap-[9px] pt-[21px] max-w-[243px]">
              <CheckboxList />
            </div>
            <div className="flex gap-[13px] pt-[22px]">
              <InputDefault
                label="Рейтинг"
                input_classes=""
                container_classes="flex-[0.5]"
              />
              <InputDefault
                label="Количество отзывов"
                input_classes=""
                container_classes="flex-[0.5]"
              />
              <InputDefault
                label="Количество скачиваний"
                input_classes=""
                container_classes="flex-[0.5]"
              />
              <InputDefault
                label="Возраст"
                input_classes=""
                container_classes="flex-[0.5]"
              />
            </div>
          </div>
          <h2 className="text__default mt-6">Описание</h2>
          <div className="bg-white rounded-[6px] mt-2 pl-4 pr-[19px] pt-3 pb-[30px]">
            <Field className="flex flex-col gap-3">
              <Label>Описание</Label>
              <Textarea
                placeholder="Описание вашего приложения"
                name="description"
              ></Textarea>
            </Field>
            <div className="flex gap-[23px] pt-[22px]">
              <InputDefault label="Версия" />
              <InputDefault label="Дата выхода" />
              <InputDefault
                label="Интерактивные элементы"
                container_classes="flex-auto"
              />
            </div>
            <div className="flex gap-[23px] pt-[22px]">
              <InputDefault label="Требуемая версия андройд" />
              <InputDefault label="Последнее обновление" />
              <InputDefault
                label="Количество скачиваний"
                container_classes="flex-auto"
              />
            </div>
            <div className="flex gap-[23px] pt-[22px]">
              <Field className="flex flex-col gap-2">
                <InputDefault label="Возрастные ограничения" />
                <InputDefault label="Разработчик" />
              </Field>
              <Field className="flex flex-col flex-auto gap-2">
                <Label>Описание</Label>
                <Textarea
                  className="min-h-[120px]"
                  placeholder="Исправлены баги и ошибки"
                  name="whats_new"
                ></Textarea>
              </Field>
            </div>
          </div>
          <h2 className="text__default mt-6">Рейтинг</h2>
          <div className="bg-white rounded-[6px] mt-2 pl-4 pr-[19px] pt-3 pb-[30px]">
            <div className="flex gap-10">
              <InputDefault
                label="Рейтинг"
                input_classes=""
                container_classes="flex-[0.5]"
              />
              <InputDefault
                label="Количество отзывов"
                input_classes=""
                container_classes="flex-[0.5]"
              />
            </div>
            <div className="flex">
              <div className="relative w-full">
                {/* Ползунок */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />

                {/* Значение процента */}
                <div
                  className="absolute top-6 text-sm text-gray-700"
                  style={{ left: `30%`, transform: "translateX(-20%)" }}
                >
                  50%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
