import { Field, Label, Textarea } from "@headlessui/react";
import { FC, useState } from "react";
import { CheckboxList } from "src/entities/checkbox_list";
import { InputDefault, InputRange } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";
import {
  setTitle,
  setDeveloperName,
  setDescription,
  setRaiting,
  setLastUpdate,
  setNumberOfDownloads,
  setReviewCount,
  setGrade,
} from "src/entities/pwa_description";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

export const PwaDescriptionForm: FC = () => {
  const dispatch = useAppDispatch();

  const { release_date, last_update, review_count, grades } = useAppSelector(
    (state) => state.pwa_description
  );

  const handleDateChange = (date: Date | null) => {
    const formatted = format(date, "dd.MM.yyyy");

    dispatch(setLastUpdate(formatted));
  };

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px]">
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
                onUpdateValue={(e) => dispatch(setTitle(e.target.value))}
              />
              <InputDefault
                label="Разработчик"
                input_classes=""
                container_classes="flex-[0.5]"
                placeholder="Developer Name"
                onUpdateValue={(e) =>
                  dispatch(setDeveloperName(e.target.value))
                }
              />
            </div>
            <div className="flex flex-col gap-[9px] pt-[21px] max-w-[243px]">
              <CheckboxList />
            </div>
            <div className="flex gap-[13px] pt-[22px]">
              <InputDefault
                label="Рейтинг"
                input_classes=""
                type="number"
                placeholder="4.5"
                container_classes="flex-[0.5]"
                onUpdateValue={(e) => dispatch(setRaiting(e.target.value))}
              />
              <InputDefault
                label="Количество отзывов"
                input_classes=""
                type="number"
                placeholder="3500"
                container_classes="flex-[0.5]"
                onUpdateValue={(e) =>
                  dispatch(setReviewCount(e.currentTarget.value))
                }
              />
              <InputDefault
                label="Количество скачиваний"
                input_classes=""
                type="number"
                placeholder="10000000"
                container_classes="flex-[0.5]"
                onUpdateValue={(e) =>
                  dispatch(setNumberOfDownloads(e.target.value))
                }
              />
              <InputDefault
                label="Возраст"
                input_classes=""
                type="number"
                placeholder="12"
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
              <Field className="flex flex-col gap-2">
                <Label className={"title__view-1"}>Последнее обновление</Label>
                <DatePicker
                  value={last_update}
                  isClearable
                  dateFormat="dd.MM.yyyy"
                  placeholderText="21.02.2025"
                  onChange={handleDateChange}
                />
              </Field>

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
                placeholder="35000"
                container_classes="flex-[0.5]"
              />
            </div>
            <div className="mt-5 flex justify-between">
              {grades?.map((item, index) => {
                return (
                  <InputRange
                    key={index}
                    value={item.value}
                    rating={item.raiting}
                    onChange={(e) =>
                      dispatch(setGrade({ index, value: e.target.value }))
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
