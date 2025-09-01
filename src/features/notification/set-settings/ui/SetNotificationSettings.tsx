import { FC, useEffect, useState } from "react";
import { InputDefault } from "src/shared/ui/input";
import { CustomSelect } from "src/shared/ui/select";
import Select from "react-select";
import { NotificationSettings } from "src/shared/types/notification.types";
import { languages } from "src/entities/pwa_design/lib/const";

type Props = {
  pwas: NotificationSettings["pwas"];
  settings: NotificationSettings;
  setSettings: (arg: NotificationSettings) => void;
};
const defaultLanguageMessage = (
  <span className="text-view-7 text-xs">
    *If the end user has a language for which there is no text, the push will be
    sent in the specified language.
  </span>
);

const STATUSES = [
  { value: "on", label: "Включить" },
  { value: "off", label: "Выключить" },
];

export const SetNotificationSettings: FC<Props> = ({
  pwas,
  settings,
  setSettings,
}) => {
  const [pwasList, setPwasList] = useState<NotificationSettings["pwas"]>([]);

  useEffect(() => {
    setPwasList(
      pwas.map((el) => ({
        ...el,
        value: el._id || "",
        label: `${el.displayId} - ${el.displayName}`,
        defaultLanguage: el.defaultLanguage || "",
      }))
    );
  }, [pwas]);

  return (
    <>
      <form action="" className="flex flex-col">
        <span className="title__view-1 mb-1">PWA</span>
        <Select
          isClearable
          classNamePrefix="react-select"
          className="mb-2.25 custom-select"
          placeholder="Выберите pwa"
          options={pwasList}
          isMulti
          components={{ IndicatorSeparator: null }}
          classNames={{
            clearIndicator: () => "!p-0",
            multiValue: () => "!my-0",
            multiValueLabel: () => "!py-0",
          }}
          value={settings.pwas.map((selected) =>
            pwasList.find((option) => option._id === selected._id)
          )}
          backspaceRemovesValue
          onChange={(val) => setSettings({ ...settings, pwas: [...val] })}
        />
        <span className="title__view-1 mb-1">Status</span>
        <Select
          options={STATUSES}
          classNamePrefix="react-select"
          className="mb-2.25 custom-select"
          placeholder="Введите статус"
        />
        <span className="title__view-1 mb-1">Название</span>
        <InputDefault
          placeholder="Введите название"
          input_classes="!border-none"
          container_classes="relative mb-2.25"
          value={settings.title}
          children={
            <button className="absolute w-2.75 h-2.75 bottom-3.75 right-4">
              <img src="/pwa_icons/clear-icon.png" />
            </button>
          }
          onUpdateValue={(e) =>
            setSettings({ ...settings, title: e.target.value })
          }
        />
        <span className="title__view-1 mb-1">Default Languague</span>
        <div>
          <Select
            placeholder="Выберите язык"
            components={{ DropdownIndicator: null }}
            classNamePrefix="react-select"
            className="custom-select"
            value={settings.defaultLanguage}
            options={languages}
            onChange={(e) => {
              if (!e) return;

              setSettings({
                ...settings,
                defaultLanguage: e,
              });
            }}
          />

          {defaultLanguageMessage}
        </div>
      </form>
    </>
  );
};
