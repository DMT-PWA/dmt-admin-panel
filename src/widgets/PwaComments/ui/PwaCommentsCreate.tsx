import { Field, Label, Switch, Textarea } from "@headlessui/react";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";
import avatar_icon from "src/shared/assets/icons/avatar_icon.png";
import DatePicker from "react-datepicker";

export const PwaCommentsCreate: FC = () => {
  const [enabled, setEnabled] = useState(false);

  const navigate = useNavigate();

  const onClickHandler = () => navigate("/pwa_create/comments");

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px]">
      <div className="flex justify-between">
        <Title title="Описание" withContainer={false} classes="title__view-2" />
        <ButtonDefault
          btn_text="Вернуться назад"
          btn_classes="btn__white btn__white-view-1"
          onClickHandler={onClickHandler}
          withArrow
        />
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex">
            <h2 className="text__default flex-[0.5]">
              Коментарий пользователя
            </h2>
            <div className="flex flex-[0.5] justify-between">
              <h2 className="text__default">Ответ разработчика</h2>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className="group inline-flex h-[16px] w-8 items-center rounded-full bg-[#697077] transition data-[checked]:bg-orange"
              >
                <span className="size-3 translate-x-0.5 rounded-full bg-white transition group-data-[checked]:translate-x-4.5" />
              </Switch>
            </div>
          </div>
          <div className="bg-white flex gap-4.25 rounded-[6px] mt-4 pl-4 pr-[19px] pt-3 pb-[30px]">
            <div>
              <div className="flex flex-col gap-2">
                <InputDefault
                  label="Имя автора"
                  input_classes=""
                  container_classes="flex-[0.5]"
                  placeholder="Введите имя автора"
                />
                <Field>
                  <Label className="text__default text-view-2">Аватар</Label>
                  <Field className="flex gap-5.25 mt-2">
                    <div className="h-[43px] w-[43px] rounded-2 bg-[#E8E8E8] flex justify-center items-center">
                      <img
                        src={avatar_icon}
                        alt="avatar"
                        width={17}
                        height={21}
                      />
                    </div>
                    <ButtonDefault
                      btn_text="Загрузить коллекцию"
                      btn_classes="btn__orange btn__orange-view-2"
                    />
                    <ButtonDefault
                      btn_text="Открыть коллекцию"
                      btn_classes="btn__white btn__white-view-2"
                    />
                  </Field>
                </Field>
              </div>
              <div>
                <div className="flex gap-[13px] pt-[22px]">
                  <Field className="flex flex-col justify-between">
                    <Label>Дата отзыва</Label>
                    <DatePicker
                      showIcon
                      icon={
                        <svg
                          width="15"
                          height="13"
                          viewBox="0 0 15 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.09995 0.502441C3.63051 0.502441 3.24995 0.838787 3.24995 1.25369V2.00494H2.39995C1.46107 2.00494 0.699951 2.67763 0.699951 3.50744V11.0199C0.699951 11.8497 1.46107 12.5224 2.39995 12.5224H12.6C13.5388 12.5224 14.3 11.8497 14.3 11.0199V3.50744C14.3 2.67763 13.5388 2.00494 12.6 2.00494H11.75V1.25369C11.75 0.838787 11.3694 0.502441 10.9 0.502441C10.4305 0.502441 10.05 0.838787 10.05 1.25369V2.00494H4.94995V1.25369C4.94995 0.838787 4.56939 0.502441 4.09995 0.502441ZM4.09995 4.25869C3.63051 4.25869 3.24995 4.59504 3.24995 5.00994C3.24995 5.42485 3.63051 5.76119 4.09995 5.76119H10.9C11.3694 5.76119 11.75 5.42485 11.75 5.00994C11.75 4.59504 11.3694 4.25869 10.9 4.25869H4.09995Z"
                            fill="#717171"
                          />
                        </svg>
                      }
                    />
                  </Field>
                  <InputDefault
                    label="Рейтинг"
                    input_classes=""
                    container_classes="flex-[0.5]"
                    placeholder="Введите имя автора"
                  />
                </div>
                <Field>
                  <InputDefault
                    label="Количество лайков"
                    input_classes=""
                    container_classes="flex-[0.5] mt-2"
                    placeholder="Введите имя автора"
                  />
                  <Field className="flex flex-col mt-2">
                    <Label className="mb-2 text-view-2">Текст коментария</Label>
                    <Textarea
                      className="min-h-[120px]"
                      placeholder="Введите текст "
                      name="whats_new"
                    ></Textarea>
                  </Field>
                </Field>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <InputDefault
                  label="Имя разработчика"
                  input_classes=""
                  container_classes="flex-[0.5]"
                  placeholder="Введите имя автора"
                />
                <Field className="flex flex-col mt-2">
                  <Label className="mb-2 text-view-2">Текст ответа</Label>
                  <Textarea
                    className="min-h-[120px]"
                    placeholder="Введите ответ"
                    name="whats_new"
                  ></Textarea>
                </Field>
                <InputDefault
                  label="Дата ответа"
                  input_classes=""
                  container_classes="flex-[0.5] mt-2"
                  placeholder="Введите имя автора"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
