import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { setPwaTitle } from "src/entities/pwa_design";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";
import {
  setLanguage,
  setCountry,
  modifiedCountryList,
  updateLanguagesList,
  setMarketerTag,
  selectLanguagesList,
  validatePwaDisplayName,
} from "src/entities/pwa_design";
import { useNavigate } from "react-router-dom";
import { Country } from "src/shared/types";
import trash_icon from "src/shared/assets/icons/trash_icon_orange.png";
import { useBeforeUnload, useDebounce, useMount } from "react-use";
import { cloneDeep, isEqual } from "lodash";
import { IDesign } from "src/shared/api/design";

type PwaFormProps = {
  isEdit?: boolean;
};

const PwaFormComponent: FC<PwaFormProps> = ({ isEdit = false }) => {
  const [valid, setValid] = useState<boolean>(true);

  const navigate = useNavigate();
  const state = useAppSelector((state) => state.pwa_design);

  const { languagesList, pwa_title, pwa_tags, currentCountry, displayId } =
    state;

  const [initStateCopy, setInitStateCopy] = useState<IDesign | null>(null);

  const dispatch = useAppDispatch();

  const selectedLanguages = useAppSelector(selectLanguagesList);

  const countriesList = useAppSelector(modifiedCountryList);

  const handleCountryChange = (option: Country) => {
    dispatch(setCountry(option));
  };

  useEffect(() => {
    if (selectedLanguages && !isEdit) {
      dispatch(updateLanguagesList([selectedLanguages]));
    }
  }, [selectedLanguages, dispatch, isEdit]);

  useEffect(() => {
    if (languagesList) dispatch(setLanguage(languagesList[0]));
  }, [languagesList, dispatch]);

  const handleNavigate = () => {
    return navigate("/pwa");
  };

  useMount(() => {
    setInitStateCopy(cloneDeep(state) as unknown as IDesign);
  });

  useBeforeUnload(!isEqual(state, initStateCopy));

  useDebounce(
    async () => {
      if (pwa_title && !isEdit) {
        const result = await dispatch(validatePwaDisplayName(pwa_title));

        if (validatePwaDisplayName.fulfilled.match(result)) {
          setValid(result.payload.status);
        }
      }
    },
    500,
    [pwa_title]
  );
  const onSetPwaTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPwaTitle(e.target.value));
  };

  return (
    <div className="flex flex-col flex-1">
      {isEdit && (
        <div className="container__view-1 justify-between mt-5.5 mb-6.5 !py-3 px-9.5">
          <div className="flex gap-37.5">
            <div>
              <strong className="text-view-12">iD:</strong>
              <span className="text-view-12 text-orange"> {displayId}</span>
            </div>
            <div>
              <strong className="text-view-12">Название:</strong>
              <span className="text-view-12 text-orange">{pwa_title}</span>
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
            input_classes={valid ? "!border-0" : ""}
            placeholder="..."
            onUpdateValue={onSetPwaTitle}
            isRequired={true}
            valid={valid}
          />
          <label className="title__view-1">
            Страна PWA
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>

          <CustomSelect
            options={countriesList}
            value={currentCountry ?? countriesList[0]}
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
            {languagesList &&
              languagesList.length === 1 &&
              languagesList[0].label !== "English" && (
                <button
                  onClick={() =>
                    dispatch(
                      updateLanguagesList([
                        ...languagesList,
                        { label: "English", value: 1 },
                      ])
                    )
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
            {languagesList &&
              languagesList[0].label !== "English" &&
              languagesList?.some((item) => item.label === "English") && (
                <>
                  <InputDefault
                    value={languagesList[1]?.label}
                    container_classes="flex-[0.5]"
                    disabled
                    input_classes="!border-0"
                  />
                  <button
                    onClick={() =>
                      dispatch(updateLanguagesList(languagesList.slice(0, 1)))
                    }
                  >
                    <img src={trash_icon} width={14} height={14} alt="" />
                  </button>
                </>
              )}
          </div>
          <InputDefault
            value={pwa_tags}
            label="Тег PWA"
            input_classes="!border-0"
            placeholder="Введите тег"
            onUpdateValue={(val) => dispatch(setMarketerTag(val.target.value))}
            isRequired={true}
          />
        </div>
      </div>
    </div>
  );
};

export const PwaForm = memo(PwaFormComponent);
