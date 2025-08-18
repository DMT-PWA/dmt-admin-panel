import { FC, useEffect, useState } from "react";
import { InputDefault } from "src/shared/ui/input";
import { CustomSelect } from "src/shared/ui/select";
import Select from "react-select";
import { SelectValueProp } from "src/shared/types";
import { NotificationSettings } from "src/shared/types/notification.types";

type Props = {
  pwas: NotificationSettings["pwas"];
  pwa: NotificationSettings["pwa"] | null;
  setPwa: (arg: NotificationSettings["pwa"] | null) => void;
};
const defaultLanguageMessage = (
  <span className="text-view-7 text-xs">
    *If the end user has a language for which there is no text, the push will be
    sent in the specified language.
  </span>
);

export const SetNotificationSettings: FC<Props> = ({ pwas, setPwa, pwa }) => {
  const [pwasList, setPwasList] = useState<
    Array<SelectValueProp & { defaultLanguage: string }>
  >([]);

  useEffect(() => {
    setPwasList(
      pwas.map((el) => ({
        value: el._id || "",
        label: el.displayName || "",
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
          components={{ IndicatorSeparator: null }}
          classNames={{ clearIndicator: () => "!p-0" }}
          onChange={(e) => {
            if (e) {
              return setPwa({
                defaultLanguage: e.defaultLanguage,
                displayName: e.label,
                _id: e.value,
              });
            }

            return setPwa(null);
          }}
          backspaceRemovesValue
        />
        <span className="title__view-1 mb-1">Status</span>
        <CustomSelect classes="mb-2.25" placeholder="Введите статус" />
        <span className="title__view-1 mb-1">Название</span>
        <InputDefault
          placeholder="Введите название"
          input_classes="!border-none"
          container_classes="relative mb-2.25"
          children={
            <button className="absolute w-2.75 h-2.75 bottom-3.75 right-4">
              <img src="/pwa_icons/clear-icon.png" />
            </button>
          }
        />
        <span className="title__view-1 mb-1">Default Languague</span>
        <div>
          <CustomSelect
            placeholder="Выберите язык"
            isDisabled={true}
            components={{ DropdownIndicator: null }}
            value={
              pwa
                ? { label: pwa.defaultLanguage, value: pwa.defaultLanguage }
                : undefined
            }
          />

          {defaultLanguageMessage}
        </div>
      </form>
    </>
  );
};
