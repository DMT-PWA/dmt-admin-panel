import { FC, useState } from "react";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";
import {
  removeFacebookPixelField,
  setPixelValue,
  setTokenValue,
  deposit,
  install,
  registration,
} from "src/entities/metrics";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { InputDefault } from "src/shared/ui/input";
import trash_orange from "src/shared/assets/icons/trash_icon_orange.png";
import clsx from "clsx";
import { cloneDeep, isEqual } from "lodash";
import { useBeforeUnload, useMount } from "react-use";

export const PwaMetrics: FC = () => {
  const state = useAppSelector((state) => state.metrics);

  const { facebookPixelList } = state;

  const [initStateCopy, setInitStateCopy] = useState({} as typeof state);

  useMount(() => {
    setInitStateCopy(cloneDeep(state) as unknown as typeof state);
  });

  useBeforeUnload(!isEqual(state, initStateCopy));

  const dispatch = useAppDispatch();

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px] min-h-127.5">
      <Title title="Метрики" withContainer={false} classes="title__view-2" />
      <div className="flex gap-3">
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">
            Регистрация
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect
            value={registration[0]}
            options={registration}
            placeholder=""
            classes="mb-2"
          />
        </div>
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">
            Депозит
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect
            value={deposit[0]}
            options={deposit}
            placeholder="Введите депозит"
          />
        </div>
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">
            Скачивание
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect
            value={install[0]}
            options={install}
            placeholder=""
            classes="mb-2"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3.25">
        <label className="title__view-1">
          Facebook Pixel
          <span className="text-red-600 align-super size-[0.8rem]">*</span>
        </label>
        {facebookPixelList &&
          facebookPixelList.map((item, index: number) => {
            return (
              <div key={index} className={clsx("flex items-end gap-3")}>
                <InputDefault
                  container_classes={clsx(
                    "flex flex-col relative",
                    index === 0 ? "flex-[0.333]" : "flex-[0.337]"
                  )}
                  value={item.pixel ? item.pixel : ""}
                  input_classes="!border-none"
                  onUpdateValue={(e) =>
                    dispatch(
                      setPixelValue({ id: index, value: e.target.value })
                    )
                  }
                  placeholder="Pixel ID or Track ID"
                  children={
                    item.pixel && (
                      <button
                        onClick={() =>
                          dispatch(setPixelValue({ id: index, value: "" }))
                        }
                        className="absolute w-2.75 h-2.75 bottom-3.75 right-4"
                      >
                        <img src="/pwa_icons/clear-icon.png" />
                      </button>
                    )
                  }
                ></InputDefault>

                <InputDefault
                  container_classes={clsx(
                    "flex flex-col relative",
                    index === 0 ? "flex-[0.333]" : "flex-[0.337]"
                  )}
                  input_classes="!border-none"
                  value={item.token || ""}
                  onUpdateValue={(e) =>
                    dispatch(
                      setTokenValue({ id: index, value: e.target.value })
                    )
                  }
                  placeholder="Access token or API Key"
                  children={
                    item.token && (
                      <button
                        onClick={() =>
                          dispatch(setTokenValue({ id: index, value: "" }))
                        }
                        className="absolute w-2.75 h-2.75 bottom-3.75 right-4"
                      >
                        <img src="/pwa_icons/clear-icon.png" />
                      </button>
                    )
                  }
                ></InputDefault>
                {index !== 0 && (
                  <button
                    className="self-center"
                    onClick={() => dispatch(removeFacebookPixelField(index))}
                  >
                    <img src={trash_orange} width={14} height={16} alt="" />
                  </button>
                )}
              </div>
            );
          })}
      </div>
      {/* <button
        className="bg-white py-[13.5px] px-[16.5px] rounded-[8px] max-w-10.5"
        onClick={() =>
          dispatch(addFacebookPixelField({ id: 1, pixel: null, token: null }))
        }
      >
        <img src="/pwa_icons/crosshair.png" width={14} height={14} alt="" />
      </button> */}
    </div>
  );
};
