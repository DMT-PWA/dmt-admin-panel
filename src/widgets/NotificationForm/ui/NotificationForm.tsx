import { FC, useEffect, useState } from "react";
import { SetNotificationSettings } from "src/features/notification/set-settings";
import { CreateNotificationMessage } from "src/features/notification/create-message";
import { Title } from "src/shared/ui/title";
import DatePicker from "react-datepicker";
import { Checkbox, Field, Label } from "@headlessui/react";
import Select from "react-select";
import { ButtonDefault } from "src/shared/ui/button";
import {
  NotificationMessage,
  NotificationSettings,
  NotificationTime,
} from "src/shared/types/notification.types";
import {
  createNotification,
  getAllPwa,
  getNotificationsById,
  updateNotification,
} from "../lib/notificationForm.thunk";
import { useAppDispatch } from "src/shared/lib/store";
import { SelectValueProp } from "src/shared/types";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { languages } from "src/entities/pwa_design/lib/const";

const events = [
  { value: "Everyone", label: "Все" },
  { value: "Reg-Dep-", label: "Нет регистрации" },
  { value: "Reg+Dep-", label: "Есть регистрация , нет депозита" },
  { value: "Reg+Dep+", label: "Есть регистрация , есть депозит" },
];

const DAYS = [
  { id: "Monday", label: "Пн" },
  { id: "Tuesday", label: "Вт" },
  { id: "Wednesday", label: "Ср" },
  { id: "Thursday", label: "Чт" },
  { id: "Friday", label: "Пт" },
  { id: "Saturday", label: "Сб" },
  { id: "Sunday", label: "Вс" },
];

type NotificationFormProps = {
  navigateToList: () => void;
};

export const NotificationForm: FC<NotificationFormProps> = ({
  navigateToList,
}) => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const [notificationTimes, handleNotificationTimes] = useState<
    NotificationTime[]
  >([]);

  const [pwas, setPwas] = useState<NotificationSettings["pwas"]>([]);

  const [settings, setSettings] = useState({
    defaultLanguage: "",
    pwa: null,
    pwas: [],
    title: "",
  } as NotificationSettings);

  const [notificationMessages, handleNotificationMessages] = useState<
    NotificationMessage[]
  >([]);

  const [event, setEvent] = useState<SelectValueProp | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(getAllPwa());

      if (getAllPwa.fulfilled.match(data)) {
        setPwas(data.payload);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetch = async () => {
      if (location.pathname.split("/").pop() !== "form") {
        const response = await dispatch(
          getNotificationsById(location.pathname.split("/").pop() || "")
        );

        if (getNotificationsById.fulfilled.match(response)) {
          const { title, defaultLanguage, appIds, messages, schedules } =
            response.payload;

          setSettings({
            title,
            defaultLanguage:
              languages.find((el) => el.label === defaultLanguage) || "",
            pwas: appIds,
          });

          handleNotificationMessages(messages);

          /* handleNotificationTimes(
            schedules.map((el) => ({ ...el, time: new Date(el.time) }))
          ); */
        }
      }
    };

    fetch();
  }, [dispatch, location.pathname]);

  const saveNotifications = () => {
    const payload = {
      messages: notificationMessages.map((el) => ({
        ...el,
        image: el.image.url,
      })),
      defaultLanguage: settings.defaultLanguage.label,
      title: settings.title,
      category: event?.value || "",
      adminId: "67210571554f552165ee9b65",
      appIds: pwas.map((el) => el._id),
      schedules: notificationTimes.map((el) => ({
        ...el,
        time: format(el.time, "HH:mm"),
      })),
    };

    if (location.pathname.endsWith("form")) {
      dispatch(createNotification(payload));
    } else {
      dispatch(
        updateNotification({ id: location.pathname.split("/").pop(), payload })
      );
    }

    navigateToList();
  };

  return (
    <div>
      <div className="container__view-2 flex-col px-7 pb-17.5 h-max mt-12.5">
        <Title
          title="Настройки"
          withContainer={false}
          classes="title__view-2"
        />
        <SetNotificationSettings
          pwas={pwas}
          settings={settings}
          setSettings={setSettings}
        />
      </div>

      <div className="container__view-2 flex-col pb-17.5 h-max mt-8.5">
        <CreateNotificationMessage
          notificationMessages={notificationMessages}
          setMessage={handleNotificationMessages}
        />
      </div>

      <div className="flex justify-between">
        <div className="container__view-2 !gap-0 flex-col pb-54 h-max mt-8.5">
          <Title
            title="Время"
            withContainer={false}
            classes="title__view-2 pl-7"
          />
          <div className="bg-white py-4 px-7.75 flex">
            <span className="text-view-4 text-[#717171] min-w-41.75">
              Время
            </span>
            <span className="text-view-4 text-[#717171] min-w-63.25">
              День недели
            </span>
            <span className="text-view-4 text-[#717171] min-w-71.25">
              Повторять
            </span>
          </div>

          {notificationTimes &&
            notificationTimes.map((time, ind) => {
              const handleRecurringChange = (val: SelectValueProp) => {
                const updatedTimes = notificationTimes.map((el, i) =>
                  i === ind ? { ...el, isRecurring: val.value === "yes" } : el
                );
                handleNotificationTimes(updatedTimes);
              };

              const handleDayToggle = (day: string) => {
                handleNotificationTimes(
                  notificationTimes.map((time, i) => {
                    if (i === ind) {
                      return {
                        ...time,
                        days: time.days.includes(day)
                          ? time.days.filter((d) => d !== day)
                          : [...time.days, day],
                      };
                    }

                    return time;
                  })
                );
              };

              return (
                <div
                  key={ind}
                  className="flex py-4.5 border-y-[1px] border-[#E5E7EB] items-center"
                >
                  <DatePicker
                    wrapperClassName="ml-7.75 mr-5.25 max-w-31.5"
                    className="max-w-19.5"
                    selected={time.time}
                    onChange={(e) => {
                      if (!e) return;
                      handleNotificationTimes(
                        notificationTimes.map((el, i) =>
                          i === ind ? { ...el, time: e } : el
                        )
                      );
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Время"
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 3C7.44772 3 7 3.44772 7 4V8C7 8.26522 7.10543 8.5195 7.29297 8.70703L10.1211 11.5352C10.5116 11.9257 11.1446 11.9257 11.5352 11.5352C11.9257 11.1446 11.9257 10.5116 11.5352 10.1211L9 7.58594V4C9 3.44772 8.55229 3 8 3Z"
                          fill="#6B7280"
                        />
                      </svg>
                    }
                  />

                  <Field className="px-10.5 flex gap-[7px] max-w-[243px] border-x-[1px] border-[#E5E7EB]">
                    {DAYS.map((day) => (
                      <div
                        key={day.id}
                        className="flex flex-col justify-between"
                      >
                        <Label className="text-view-13">{day.label}</Label>
                        <Checkbox
                          className="group block size-4 rounded border data-[checked]:border-0 bg-white data-[checked]:bg-orange"
                          checked={time.days.includes(day.id)}
                          onChange={() => handleDayToggle(day.id)}
                        />
                      </div>
                    ))}
                  </Field>

                  <Select
                    classNamePrefix="react-select"
                    className="mx-6.5 min-w-32 custom-select"
                    components={{ DropdownIndicator: null }}
                    options={[
                      { value: "yes", label: "Да" },
                      { value: "no", label: "Нет" },
                    ]}
                    placeholder=""
                    value={
                      time.isRecurring
                        ? { value: "yes", label: "Да" }
                        : { value: "no", label: "Нет" }
                    }
                    onChange={handleRecurringChange}
                  />

                  <ButtonDefault
                    btn_text="Удалить"
                    btn_classes="mx-8 btn__orange btn__orange-view-7 h-7 w-19"
                    onClickHandler={() =>
                      handleNotificationTimes(
                        notificationTimes.filter((_, index) => index !== ind)
                      )
                    }
                  />
                </div>
              );
            })}

          <div className="bg-white py-4 px-7.75 flex">
            <ButtonDefault
              btn_text="Добавить"
              btn_classes="btn__orange btn__orange-view-7 h-7 w-22"
              onClickHandler={() =>
                handleNotificationTimes([
                  ...notificationTimes,
                  {
                    days: [],
                    isRecurring: true,
                    time: new Date(),
                  },
                ])
              }
            />
          </div>
        </div>
        <div className="container__view-2 !gap-0 flex-col px-7 pb-17.5 h-max mt-8.5">
          <Title
            title="Фильтр"
            withContainer={false}
            classes="title__view-2 mb-2"
          />

          <span className="text__default title__view-1">Событие</span>
          <Select
            classNamePrefix="react-select"
            className="mb-2.25 mt-1.5 min-w-168.5 custom-select"
            components={{ IndicatorSeparator: null }}
            classNames={{
              control: () => "!border-none",
              menu: () => "!mt-0.25",
              option: () => "!py-3 !px-4 !text-view-13",
            }}
            placeholder="Введите событие"
            options={events}
            value={event}
            onChange={setEvent}
          />

          <div className="bg-[#F9FAFB] flex justify-between px-8 py-4 rounded-t-[10px] mt-2">
            <span className="text-view-13">SUB</span>
            <span className="text-view-13">Parameter name</span>
            <span className="text-view-13">Meaning</span>
          </div>
          <div className="bg-white py-4 px-7.75 flex">
            <ButtonDefault
              btn_text="Add"
              btn_classes="btn__orange btn__orange-view-7 h-7 w-22"
            />
          </div>
        </div>
      </div>

      <ButtonDefault
        btn_text="Сохранить "
        btn_classes="btn__orange btn__orange-view-7 h-10.5 w-48.5 mt-7"
        onClickHandler={saveNotifications}
      />
    </div>
  );
};
