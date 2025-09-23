import { ChangeEvent, FC, memo, useState } from "react";
import { setPwaTitle } from "src/entities/pwa_design";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import Select from "react-select";
import { Title } from "src/shared/ui/title";
import {
  setCountry,
  setMarketerTag,
  validatePwaDisplayName,
} from "src/entities/pwa_design";
import { useNavigate } from "react-router-dom";
import { Country } from "src/shared/types";
import { useBeforeUnload, useDebounce, useMount } from "react-use";
import { cloneDeep, isEqual } from "lodash";
import { IDesign } from "src/entities/pwa_design/model/types";

type PwaFormProps = {
  isEdit?: boolean;
};

const PwaFormComponent: FC<PwaFormProps> = ({ isEdit = false }) => {
  const [valid, setValid] = useState<boolean>(true);

  const navigate = useNavigate();
  const state = useAppSelector((state) => state.pwa_design);

  const { pwa_tags, pwa_title, currentCountry, displayId, countriesList } =
    state;

  const [initStateCopy, setInitStateCopy] = useState<IDesign | null>(null);

  const dispatch = useAppDispatch();

  const handleCountryChange = (option: Country) => {
    dispatch(setCountry(option));
  };

  const handleNavigate = () => {
    return navigate("/pwa");
  };

  useMount(() => {
    setInitStateCopy(cloneDeep(state) as unknown as IDesign);
  });

  useBeforeUnload(!isEqual(state, initStateCopy));

  useDebounce(
    async () => {
      if (isEdit && pwa_title === initStateCopy?.pwa_title) return;

      if (pwa_title) {
        const result = await dispatch(validatePwaDisplayName(pwa_title));
        if (validatePwaDisplayName.fulfilled.match(result)) {
          setValid(result.payload.status);
        }
      }
    },
    300,
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

          <Select
            className={`custom-select`}
            classNamePrefix="react-select"
            options={countriesList}
            value={currentCountry}
            onChange={handleCountryChange}
            placeholder="Выберите страну..."
          />

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
