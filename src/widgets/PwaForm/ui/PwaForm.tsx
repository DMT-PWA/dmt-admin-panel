import { ChangeEvent, FC, memo, useEffect } from "react";
import { setPwaTitle } from "src/entities/pwa_design";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";
import {
  setLanguage,
  setLanguagesList,
  setCountry,
  modifiedCountryList,
  addLanguage,
  removeLanguage,
  setMarketerTag,
} from "src/entities/pwa_design";
import { useNavigate } from "react-router-dom";
import { Country, Language } from "src/shared/types";
import trash_icon from "src/shared/assets/icons/trash_icon_orange.png";
type PwaFormProps = {
  appId: string | null;
  isEdit?: boolean;
};

const PwaFormComponent: FC<PwaFormProps> = ({ appId, isEdit = false }) => {
  const navigate = useNavigate();
  const { pwa_title, pwa_tags, languagesList, currentCountry } = useAppSelector(
    (state) => state.pwa_design
  );
  const dispatch = useAppDispatch();

  const handleCountryChange = (option: Country) => {
    dispatch(setCountry(option));

    dispatch(setLanguagesList());
  };

  useEffect(() => {
    if (languagesList) dispatch(setLanguage(languagesList[0]));
  }, [languagesList, dispatch]);

  const handleNavigate = () => {
    return navigate("/pwa");
  };

  const onSetPwaTitle = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setPwaTitle(e.target.value));

  return (
    <div className="flex flex-col flex-1">
      {isEdit && (
        <div className="container__view-1 justify-between mt-5.5 mb-6.5 !py-3 px-9.5">
          <div className="flex gap-37.5">
            <div>
              <strong className="text-view-12">iD:</strong>
              <span className="text-view-12 text-orange"> {appId}</span>
            </div>
            <div>
              <strong className="text-view-12">Название:</strong>
              <span className="text-view-12 text-orange"> Plinko OLZ NL</span>
            </div>
          </div>
          <ButtonDefault
            btn_text="Вернуться назад"
            btn_classes="btn__default btn-view-2"
            onClickHandler={handleNavigate}
            withArrow
          />
        </div>
      )}
      <div className="container__view-2 flex-col px-7 pb-17.5 h-max">
        <Title title="Дизайн" withContainer={false} classes="title__view-2" />
        <div className="flex flex-col gap-6">
          <InputDefault
            value={pwa_title ?? ""}
            label="Название PWA"
            input_classes="!border-0"
            placeholder="..."
            onUpdateValue={onSetPwaTitle}
            isRequired={true}
          />
          <label className="title__view-1">
            Страна PWA
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>

          <CustomSelect
            options={modifiedCountryList}
            value={currentCountry}
            onChange={handleCountryChange}
            placeholder="Английский"
          />
          <label className="title__view-1">
            Язык интерфейса PWA
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>

          <div className="flex gap-8.75 items-center">
            {languagesList && (
              <InputDefault
                value={languagesList[0]?.label}
                container_classes="flex-[0.5]"
                disabled
                input_classes="!border-0"
              />
            )}
            {languagesList && languagesList.length === 1 && (
              <button
                onClick={() =>
                  dispatch(addLanguage({ label: "English", value: 1 }))
                }
                className="bg-white py-[13.5px] px-[16.5px] rounded-[8px]"
              >
                <img
                  src="/pwa_icons/crosshair.png"
                  width={14}
                  height={14}
                  alt=""
                />
              </button>
            )}
            {languagesList?.some((item) => item.label === "English") && (
              <>
                <InputDefault
                  value={languagesList[1]?.label}
                  container_classes="flex-[0.5]"
                  disabled
                  input_classes="!border-0"
                />
                <button onClick={() => dispatch(removeLanguage())}>
                  <img src={trash_icon} width={14} height={14} alt="" />
                </button>
              </>
            )}
          </div>
          {/* <CustomSelect
            options={languagesList}
            value={currentLanguage}
            onChange={handleLanguageChange}
            isDisabled={true}
            placeholder="Английский"
          /> */}
          <InputDefault
            value={pwa_tags}
            label="Теги PWA"
            input_classes="!border-0"
            placeholder="Выберите теги"
            onUpdateValue={(val) => dispatch(setMarketerTag(val.target.value))}
            isRequired={true}
          />
        </div>
      </div>
    </div>
  );
};

export const PwaForm = memo(PwaFormComponent);
