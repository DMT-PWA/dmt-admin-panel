import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";
import { domains, whitePages } from "../lib/constants";
import { updateSettingField, getAllCampaigns } from "src/widgets/PwaSettings";
import { InputDefault } from "src/shared/ui/input";

export const PwaSettings: FC = () => {
  const dispatch = useAppDispatch();

  const {
    domainApp,
    domainLanding,
    marketerTag,
    whitePage,
    currentCampaign,
    campaigns,
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
            label_classes="title__view-1 mb-2"
            placeholder="Введите поддомен"
            input_classes="!border-0"
            onUpdateValue={(val) =>
              dispatch(
                updateSettingField({
                  field: "subdomain",
                  value: val.target.value,
                })
              )
            }
          />
        </div>
      </div>
    </div>
  );
};
