import { FC } from "react";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";
import {
  addFacebookPixelField,
  removeFacebookPixelField,
  setPixelValue,
  setTokenValue,
} from "src/entities/metrics";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { InputDefault } from "src/shared/ui/input";
import trash_orange from "src/shared/assets/icons/trash_icon_orange.png";

export const PwaMetrics: FC = () => {
  const { facebookPixelList } = useAppSelector((state) => state.metrics);

  const dispatch = useAppDispatch();

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px]">
      <Title title="Метрики" withContainer={false} classes="title__view-2" />
      <div className="flex gap-3">
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">Регистрация</label>
          <CustomSelect placeholder="" classes="mb-2" />
        </div>
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">Депозит</label>
          <CustomSelect placeholder="Введите депозит" />
        </div>
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-1">Скачивание</label>
          <CustomSelect placeholder="" classes="mb-2" />
        </div>
      </div>
      <div className="flex flex-col gap-3.25">
        <label className="title__view-1">Facebook Pixel</label>
        {facebookPixelList &&
          facebookPixelList.map((item, index: number) => {
            return (
              <div key={index} className="flex items-end gap-3 flex-2/3">
                <InputDefault
                  container_classes="flex flex-col flex-[0.333] relative"
                  value={item.pixel ? item.pixel : ""}
                  input_classes="!border-none"
                  onUpdateValue={(e) =>
                    dispatch(
                      setPixelValue({ id: index, value: e.target.value })
                    )
                  }
                  children={<button className="absolute py-3 px-5">X</button>}
                ></InputDefault>

                <InputDefault
                  container_classes="flex flex-col flex-[0.3333]"
                  input_classes="!border-none"
                  value={item.token ? item.token : ""}
                  onUpdateValue={(e) =>
                    dispatch(
                      setTokenValue({ id: index, value: e.target.value })
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
      <button
        className="bg-white py-[13.5px] px-[16.5px] rounded-[8px] max-w-10.5"
        onClick={() =>
          dispatch(addFacebookPixelField({ id: 1, pixel: null, token: null }))
        }
      >
        <img src="/pwa_icons/crosshair.png" width={14} height={14} alt="" />
      </button>
    </div>
  );
};
