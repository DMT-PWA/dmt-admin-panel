import { FC } from "react";
import { SetNotificationSettings } from "src/features/notification/set-settings";
import { CreateNotificationMessage } from "src/features/notification/create-message";
import { Title } from "src/shared/ui/title";
import Select from "react-select";
import { ButtonDefault } from "src/shared/ui/button";
import { NotificationTimeComponent } from "./NotificationTimeComponent";
import { events } from "../lib/const";
import { useNotificationForm } from "../lib/useNotificationForm";

type NotificationFormProps = {
  navigateToList: () => void;
  isEdit?: boolean;
};

export const NotificationForm: FC<NotificationFormProps> = ({
  navigateToList,
  isEdit,
}) => {
  const {
    pwas,
    event,
    settings,
    languagesList,
    notificationMessages,
    handleNotificationMessages,
    saveNotifications,
    setSettings,
    setEvent,
    handleNotificationTimes,
    notificationTimes,
  } = useNotificationForm(navigateToList, isEdit);

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
          languages={languagesList}
        />
      </div>

      <div className="container__view-2 flex-col pb-17.5 h-max mt-8.5">
        <CreateNotificationMessage
          notificationMessages={notificationMessages}
          setMessage={handleNotificationMessages}
          languages={languagesList}
        />
      </div>

      <div className="flex justify-between">
        <NotificationTimeComponent
          handleNotificationTimes={handleNotificationTimes}
          notificationTimes={notificationTimes}
        />
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
