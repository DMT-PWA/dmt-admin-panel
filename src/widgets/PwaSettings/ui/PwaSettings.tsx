import { FC, useEffect, useState } from "react";
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
import { useDebounce, useMount, useBeforeUnload } from "react-use";
import clsx from "clsx";
import { cloneDeep, isEqual } from "lodash";

export const PwaSettings: FC<{ isEdit: boolean }> = ({ isEdit = false }) => {
  const dispatch = useAppDispatch();

  const [valid, setValid] = useState<boolean>(true);

  const state = useAppSelector((state) => state.settings);

  const { domainApp, whitePage, currentCampaign, campaigns, subdomain } = state;

  const [initStateCopy, setInitStateCopy] = useState({} as typeof state);
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

  useEffect(() => {
    dispatch(getAllCampaigns());
  }, [dispatch]);

  useMount(() => {
    setInitStateCopy(cloneDeep(state) as unknown as typeof state);
  });

  useBeforeUnload(!isEqual(state, initStateCopy));

  useDebounce(
    async () => {
      if (isEdit && initStateCopy.subdomain === subdomain) return;

      if (subdomain && domainApp) {
        const result = await dispatch(
          verifyCustomDomain({
            domain: domainApp.value,
            subDomain: subdomain,
          })
        );

        if (verifyCustomDomain.fulfilled.match(result)) {
          setValid(result.payload.status);
        }
      }
    },
    300,
    [subdomain]
  );

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
            options={campaigns ?? undefined}
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
              "!text-red-1": !valid,
            })}
            placeholder="Введите поддомен"
            input_classes={clsx({
              "!border-0": valid,
              "border-red-1": !valid,
            })}
            value={subdomain ?? ""}
            onUpdateValue={(val) => handleSubdomain(val.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
