import { FC, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";
import { domains, whitePages } from "../lib/constants";
import {
  updateSettingField,
  getAllCampaigns,
  verifyCustomDomain,
} from "src/widgets/PwaSettings";
import { InputDefault } from "src/shared/ui/input";
import { useDebounce } from "react-use";
import clsx from "clsx";
export const PwaSettings: FC = () => {
  const dispatch = useAppDispatch();

  const [isValid, setIsValid] = useState<boolean>(false);

  const {
    domainApp,
    domainLanding,
    marketerTag,
    whitePage,
    currentCampaign,
    campaigns,
    subdomain,
  } = useAppSelector((state) => state.settings);

  /* const handleCampaign = useCallback(async () => {
    const data = await dispatch(getAllCampaigns());

    if (isEdit) {
      const existedCampaign = data.payload.find(
        (item) => item.keitaroCampaignId === action.payload.keitaroCampaignId
      );

      dispatch(
        updateSettingField({ field: "currentCampaign", value: existedCampaign })
      );
    }
  }, [dispatch, isEdit]); */

  const handleSubdomain = (val: string) => {
    dispatch(
      updateSettingField({
        field: "subdomain",
        value: val,
      })
    );
  };

  useDebounce(
    () =>
      dispatch(
        verifyCustomDomain({
          serviceId: "682209c3451d947dcdfea597",
          name: subdomain,
        })
      ),
    500,
    [subdomain]
  );
  useEffect(() => {
    dispatch(getAllCampaigns());
  }, [dispatch]);

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px] min-h-127.5">
      <Title title="Настройки" withContainer={false} classes="title__view-2" />
      <div className="flex gap-3">
        <div className="flex flex-col flex-1/3 justify-end">
          <label className="title__view-1 mb-2">Теги</label>
          <CustomSelect placeholder="" classes="mb-2" />
          <label className="title__view-1 mb-2">
            Нейминг/Ссылка
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect
            value={currentCampaign ?? undefined}
            options={campaigns}
            onChange={(val) =>
              dispatch(
                updateSettingField({ field: "currentCampaign", value: val })
              )
            }
            placeholder="Введите нейминг"
          />
        </div>
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">
            Домен
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect
            value={domainApp ?? undefined}
            options={domains}
            onChange={(val) =>
              dispatch(updateSettingField({ field: "domainApp", value: val }))
            }
            placeholder="Выберите домен"
            classes="mb-2"
          />
          <label className="title__view-1 mb-2">
            White Page
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect
            value={whitePage ?? undefined}
            options={whitePages}
            onChange={(val) =>
              dispatch(updateSettingField({ field: "whitePage", value: val }))
            }
            placeholder="Введите название PWA"
          />
        </div>
        <div className="flex flex-col flex-1/3">
          {/* <label className="title__view-1 mb-2">Subdomen</label>
          <CustomSelect placeholder="Выберите домен" classes="mb-2" /> */}
          <InputDefault
            label="Subdomen"
            label_classes={clsx("title__view-1 mb-2", {
              "!text-red-1": !isValid,
            })}
            placeholder="Введите поддомен"
            input_classes={clsx({
              "!border-0": isValid,
              "border-red-1": !isValid,
            })}
            value={subdomain ?? ""}
            onUpdateValue={(val) => handleSubdomain(val.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
