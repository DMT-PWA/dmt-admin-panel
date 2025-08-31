import { FC, useRef } from "react";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";
import { NotificationMessage } from "src/shared/types/notification.types";
import Select from "react-select";
import { Textarea } from "@headlessui/react";
import { languages } from "src/entities/pwa_design/lib/const";

type NotificationMessageProps = {
  notificationMessages: NotificationMessage[];
  setMessage: (arg: NotificationMessage[]) => void;
};

export const CreateNotificationMessage: FC<NotificationMessageProps> = ({
  notificationMessages,
  setMessage,
}) => {
  const fileInputRef = useRef<HTMLInputElement[]>([]);

  return (
    <div className="container__view-2 !gap-0 flex-col pb-54 h-max">
      <Title
        title="Сообщение"
        withContainer={false}
        classes="title__view-2 pl-7"
      />
      <table className="w-full">
        <thead className="bg-white">
          <tr>
            <th className="text-view-4 py-4 px-7.75 text-[#717171]">Язык</th>
            <th className="text-view-4 py-4 px-7.75 text-[#717171] ">
              Заголовок
            </th>
            <th className="text-view-4 py-4 px-7.75 text-[#717171] ">
              Сообщение
            </th>
            <th className="text-view-4 py-4 px-7.75 text-[#717171]">
              Изображение
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {notificationMessages.map((message, ind) => {
            const handleMessage = (
              val: string | NotificationMessage["image"],
              field: keyof typeof message
            ) =>
              setMessage(
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
              <tr key={ind} className="border-y-[1px] border-[#E5E7EB] ">
                <td className="py-4.5 px-7.75 align-top">
                  <Select
                    components={{ IndicatorSeparator: null }}
                    className="min-w-63.5 custom-select"
                    placeholder="Выберите язык"
                    classNames={{ control: () => "!border-none" }}
                    options={languages}
                    onChange={(e) => {
                      if (!e) return;
                      handleMessage(e.label, "language");
                    }}
                  />
                </td>

                <td className="py-4.5 px-7.75 align-top">
                  <div className="relative">
                    <Textarea
                      className={"min-w-60 min-h-37.5 w-full !border-none"}
                      placeholder="Введите заголовок"
                      value={message.heading}
                      onChange={(e) => handleMessage(e.target.value, "heading")}
                    />
                    {message.heading.length > 0 && (
                      <button
                        className="absolute w-2.75 h-2.75 top-3 right-4"
                        onClick={() => handleMessage("", "heading")}
                      >
                        <img src="/pwa_icons/clear-icon.png" />
                      </button>
                    )}
                  </div>
                </td>

                <td className="py-4.5 px-7.75 align-top">
                  <div className="relative">
                    <Textarea
                      className={"min-w-75 w-full min-h-37.5 !border-none"}
                      placeholder="Введите сообщение"
                      value={message.message}
                      onChange={(e) => handleMessage(e.target.value, "message")}
                    />
                    {message.message.length > 0 && (
                      <button
                        onClick={() => handleMessage("", "message")}
                        className="absolute w-2.75 h-2.75 top-3 right-4"
                      >
                        <img src="/pwa_icons/clear-icon.png" />
                      </button>
                    )}
                  </div>
                </td>
                <td className="py-4.5 px-7.75 align-top">
                  <div className="flex flex-col gap-3">
                    <div className="">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => {
                          if (!el) return;

                          fileInputRef.current[ind] = el;
                        }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (file) {
                            const fileURL = URL.createObjectURL(file);

                            console.log(fileURL);

                            handleMessage(
                              { url: fileURL, name: file.name },
                              "image"
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={`file-input-${ind}`}
                        className="relative input__default !border-none inline-block w-87.5"
                      >
                        {message.image.name
                          ? message.image.name
                          : "Выберите файл"}
                        {message.image.name && (
                          <button
                            onClick={() =>
                              handleMessage({ url: "", name: "" }, "image")
                            }
                            className="absolute w-2.75 h-2.75 bottom-3.75 right-4"
                          >
                            <img src="/pwa_icons/clear-icon.png" />
                          </button>
                        )}
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <ButtonDefault
                        btn_text="Выберите файл"
                        btn_classes="btn__orange btn__orange-view-7 !px-8.5 h-10.5"
                        onClickHandler={() => fileInputRef.current[ind].click()}
                      />
                    </div>
                  </div>
                </td>

                <td className="py-4.5 px-7.75 align-top">
                  <ButtonDefault
                    btn_text="Удалить"
                    btn_classes="btn__orange btn__orange-view-7 h-7 w-19"
                    onClickHandler={() =>
                      setMessage(
                        notificationMessages.filter((_, index) => index !== ind)
                      )
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="py-4 flex">
        <ButtonDefault
          btn_text="Добавить сообщение"
          btn_classes="btn__orange btn__orange-view-7 h-10.5 w-48.5 ml-8"
          onClickHandler={() =>
            setMessage([
              ...notificationMessages,
              {
                message: "",
                icon: "",
                image: { name: "", url: "" },
                language: "",
                heading: "",
              },
            ])
          }
        />
      </div>
    </div>
  );
};
