import { Dialog, DialogBackdrop } from "@headlessui/react";
import { FC, useState } from "react";
import { SelectValueProp } from "src/shared/types";
import { ButtonDefault } from "src/shared/ui/button";
import Select from "react-select";
import { useAppSelector } from "src/shared/lib/store";
import { modifiedLanguagesList } from "src/entities/pwa_design/model/selectors";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  updateLanguagesList: (lang: string) => void;
}

export const LanguagesModal: FC<Props> = ({
  isModalOpen,
  onClose,
  updateLanguagesList,
}) => {
  const languagesList = useAppSelector(modifiedLanguagesList);

  const [language, setLanguage] = useState<SelectValueProp | null>(null);

  const onSaveHandler = async () => {
    if (!language) return;

    updateLanguagesList(language.value);

    onClose();
  };

  return (
    <Dialog open={isModalOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <div className="relative bg-white py-11 px-6.5 min-w-[612px]">
          <div className="flex flex-col gap-2.5">
            <label className="text__default">Новый язык</label>
            <Select
              classNamePrefix="react-select"
              className="w-full custom-select languages-select"
              placeholder="Добавьте новый язык"
              options={languagesList}
              value={language}
              onChange={setLanguage}
            />
          </div>

          <div className="flex justify-end gap-[13px] mt-8.5">
            <ButtonDefault
              btn_text="Отмена"
              btn_classes="btn__white btn__white-view-3 !px-6.5"
              onClickHandler={onClose}
            />
            <ButtonDefault
              btn_text="ОК"
              btn_classes="btn__orange btn__orange-view-3"
              onClickHandler={onSaveHandler}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};
