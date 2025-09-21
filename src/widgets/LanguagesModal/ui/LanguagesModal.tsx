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

  const onSaveHandler = () => {
    if (!language) return;

    updateLanguagesList(language.value);

    onClose();
  };

  return (
    <Dialog open={isModalOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <div className="relative bg-white py-11 px-6.5">
          <div className="flex gap-6.25">
            <Select
              classNamePrefix="react-select"
              className="min-w-63.5 custom-select"
              placeholder="Выберите язык"
              options={languagesList}
              value={language}
              onChange={setLanguage}
            />
          </div>

          <div className="flex gap-[43px]">
            <ButtonDefault
              btn_text="Сохранить"
              btn_classes="btn__orange btn__orange-view-3"
              onClickHandler={onSaveHandler}
            />
            <ButtonDefault
              btn_text="Отмена"
              btn_classes="btn__white btn__white-view-3 "
              onClickHandler={onClose}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};
