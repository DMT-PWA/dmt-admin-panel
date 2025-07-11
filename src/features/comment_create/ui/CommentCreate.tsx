import { FC } from "react";
import { InputDefault } from "src/shared/ui/input";
import avatar_icon from "src/shared/assets/icons/avatar_icon.png";
import { IUserComment } from "src/shared/types";
import { Field, Label, Switch, Textarea } from "@headlessui/react";
import { ButtonDefault } from "src/shared/ui/button";
import DatePicker from "react-datepicker";
import clsx from "clsx";

interface CommentCreateProps extends IUserComment {
  onFiledUpdate: <K extends keyof IUserComment>(
    field: K,
    value: IUserComment[K]
  ) => void;
  setModalOpen: (arg: boolean) => void;
}

export const CommentCreate: FC<CommentCreateProps> = ({
  onFiledUpdate,
  setModalOpen,
  author_name,
  avatar,
  comments_text,
  likes_count,
  raiting,
  review_date,
  developer_answer,
  answer_date,
  answer_text,
  developer_name,
}) => {
  const label = (text: string) => (
    <Label
      className={clsx("mb-2 text-view-2", {
        "text-gray-4": !developer_answer,
      })}
    >
      {text}
    </Label>
  );

  return (
    <>
      <div className="flex">
        <h2 className="text__default flex-[0.5]">Коментарий пользователя</h2>
        <div className="flex flex-[0.5] justify-between">
          <h2 className="text__default">Ответ разработчика</h2>
          <Switch
            checked={developer_answer}
            onChange={(value) => onFiledUpdate("developer_answer", value)}
            className="group inline-flex h-[16px] w-8 items-center rounded-full bg-[#697077] transition data-[checked]:bg-orange"
          >
            <span className="size-3 translate-x-0.5 rounded-full bg-white transition group-data-[checked]:translate-x-4.5" />
          </Switch>
        </div>
      </div>
      <div className="bg-white flex gap-4.25 rounded-[6px] mt-4 pl-4 pr-[19px] pt-3 pb-[30px]">
        <div className="flex-1/2">
          <div className="flex flex-col gap-2">
            <InputDefault
              label="Имя автора"
              input_classes=""
              onUpdateValue={(e) =>
                onFiledUpdate("author_name", e.target.value)
              }
              value={author_name ?? ""}
              container_classes="flex-[0.5]"
              placeholder="Введите имя автора"
            />
            <Field>
              <Label className="text__default text-view-2">Аватар</Label>
              <Field className="flex gap-5.25 mt-2">
                <div className="h-[43px] w-[43px] rounded-[8px] bg-[#E8E8E8] flex justify-center items-center">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-full h-full object-cover rounded-[8px]"
                    />
                  ) : (
                    <img
                      src={avatar_icon}
                      alt="avatar"
                      width={17}
                      height={21}
                    />
                  )}
                </div>
                <ButtonDefault
                  onClickHandler={() => setModalOpen(true)}
                  btn_text="Загрузить коллекцию"
                  btn_classes="btn__orange btn__orange-view-2 flex-auto"
                />
              </Field>
            </Field>
          </div>
          <div>
            <div className="flex gap-[13px] pt-[22px]">
              <Field className="flex flex-col flex-1/2 justify-between">
                <Label>Дата отзыва</Label>
                <DatePicker
                  showIcon
                  isClearable
                  dateFormat="dd.MM.yyyy"
                  selected={review_date}
                  onChange={(val) => onFiledUpdate("review_date", val)}
                  icon={
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
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
                container_classes="flex-1/2"
                placeholder="Введите рейтинг"
                type="number"
                max={5}
                value={raiting || ""}
                onUpdateValue={(e) =>
                  onFiledUpdate("raiting", Number(e.target.value))
                }
              />
            </div>
            <Field>
              <InputDefault
                label="Количество лайков"
                input_classes=""
                type="number"
                container_classes="flex-[0.5] mt-2"
                placeholder="Введите количество лайков"
                value={likes_count || ""}
                onUpdateValue={(e) =>
                  onFiledUpdate("likes_count", e.target.value)
                }
              />
              <Field className="flex flex-col mt-2">
                <Label className="mb-2 text-view-2">Текст коментария</Label>
                <Textarea
                  className="min-h-[120px]"
                  placeholder="Введите текст "
                  name="whats_new"
                  value={comments_text ?? ""}
                  onChange={(e) =>
                    onFiledUpdate("comments_text", e.target.value)
                  }
                ></Textarea>
              </Field>
            </Field>
          </div>
        </div>
        <div className="flex-1/2">
          <div className="flex flex-col gap-2">
            <InputDefault
              label="Имя разработчика"
              input_classes={clsx({ "!border-gray-5": !developer_answer })}
              disabled={!developer_answer}
              container_classes="flex-[0.5]"
              label_classes={clsx("title__view-1", {
                "!text-gray-4": !developer_answer,
              })}
              placeholder="Введите имя разработчика"
              value={developer_name ?? ""}
              onUpdateValue={(e) =>
                onFiledUpdate("developer_name", e.target.value)
              }
            />
            <Field className="flex flex-col mt-2">
              {label("Текст ответа")}
              <Textarea
                className={clsx("min-h-[120px]", {
                  "!border-gray-5": !developer_answer,
                })}
                placeholder="Введите ответ"
                disabled={!developer_answer}
                name="whats_new"
                value={answer_text ?? ""}
                onChange={(e) => onFiledUpdate("answer_text", e.target.value)}
              ></Textarea>
            </Field>
            <Field className="flex flex-col mt-2">
              {label("Дата ответа")}
              <DatePicker
                disabled={!developer_answer}
                isClearable
                selected={answer_date}
                dateFormat="dd.MM.yyyy"
                wrapperClassName="max-w-116.5"
                onChange={(date) => onFiledUpdate("answer_date", date)}
              />
            </Field>
          </div>
        </div>
      </div>
    </>
  );
};
