import { FC, useState } from "react";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";
import { NotificationMessage } from "src/shared/types/notification.types";
import Select from "react-select";
import { Textarea } from "@headlessui/react";
import { InputDefault } from "src/shared/ui/input";
import { languages } from "src/entities/pwa_design/lib/const";

export const CreateNotificationMessage: FC = () => {
  const [notificationMessages, handleNotificationMessages] = useState<
    NotificationMessage[]
  >([]);

  return (
    <div className="container__view-2 !gap-0 flex-col pb-54 h-max">
      <Title
        title="Сообщение"
        withContainer={false}
        classes="title__view-2 pl-7"
      />
      <div className="bg-white py-4 px-7.75 flex justify-between">
        <span className="text-view-4 text-[#717171] min-w-41.75">Язык</span>
        <span className="text-view-4 text-[#717171] min-w-63.25">
          Заголовок
        </span>
        <span className="text-view-4 text-[#717171] min-w-71.25">
          Сообщение
        </span>
        <span className="text-view-4 text-[#717171] min-w-71.25">
          Изображение
        </span>
        <span></span>
      </div>

      {notificationMessages.map((message, ind) => {
        const handleMessage = (val: string, field: keyof typeof message) =>
          handleNotificationMessages(
            notificationMessages.map((el, index) => {
              if (index === ind) {
                return {
                  ...el,
                  [field]: val,
                };
              }

              return el;
            })
          );

        return (
          <div
            key={ind}
            className="flex py-4.5 border-y-[1px] border-[#E5E7EB] items-start justify-between"
          >
            <Select
              components={{ IndicatorSeparator: null }}
              className="ml-8 min-w-63.5 custom-select"
              placeholder="Выберите язык"
              classNames={{ control: () => "!border-none" }}
              options={languages}
            />

            <div className="relative">
              <Textarea
                className={"min-w-60 min-h-37.5 !border-none"}
                placeholder="Введите заголовок"
                value={message.title}
                onChange={(e) => handleMessage(e.target.value, "title")}
              />
              {message.title.length > 0 && (
                <button
                  className="absolute w-2.75 h-2.75 top-3 right-4"
                  onClick={() => handleMessage("", "title")}
                >
                  <img src="/pwa_icons/clear-icon.png" />
                </button>
              )}
            </div>

            <div className="relative">
              <Textarea
                className={"min-w-75 min-h-37.5 !border-none"}
                placeholder="Введите сообщение"
                value={message.body}
                onChange={(e) => handleMessage(e.target.value, "body")}
              />
              {message.body.length > 0 && (
                <button
                  onClick={() => handleMessage("", "body")}
                  className="absolute w-2.75 h-2.75 top-3 right-4"
                >
                  <img src="/pwa_icons/clear-icon.png" />
                </button>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <InputDefault
                input_classes={"!border-none"}
                placeholder="Название файла"
              />

              <div className="flex gap-3">
                <ButtonDefault
                  btn_text="Выберите файл"
                  btn_classes="btn__orange btn__orange-view-7 !px-8.5 h-10.5"
                />
                <button
                  disabled
                  className="h-10.5 border-[#717171] border-1 px-8.5 rounded-[6px] bg-white text-view-13 !font-semibold"
                >
                  Файл не выбран
                </button>
              </div>
            </div>

            <ButtonDefault
              btn_text="Удалить"
              btn_classes="mx-8 btn__orange btn__orange-view-7 h-7 w-19"
              onClickHandler={() =>
                handleNotificationMessages(
                  notificationMessages.filter((_, index) => index !== ind)
                )
              }
            />
          </div>
        );
      })}

      <div className="py-4 flex">
        <ButtonDefault
          btn_text="Добавить сообщение"
          btn_classes="btn__orange btn__orange-view-7 h-10.5 w-48.5 ml-8"
          onClickHandler={() =>
            handleNotificationMessages([
              ...notificationMessages,
              { body: "", icon: "", image: "", language: "", title: "" },
            ])
          }
        />
      </div>
    </div>
  );
};
