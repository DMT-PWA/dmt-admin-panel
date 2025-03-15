import { FC } from "react";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";

export const PwaMetrics: FC = () => {
  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px]">
      <Title title="Метрики" withContainer={false} classes="title__view-2" />
      <div className="flex gap-3">
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-1">Скачивание</label>
          <CustomSelect placeholder="" classes="mb-2" />
          <label className="title__view-1 mb-2">Facebook Pixel</label>
          <CustomSelect placeholder="" classes="mb-2" />
        </div>
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">Регистрация</label>
          <CustomSelect placeholder="" classes="mb-2" />
          <CustomSelect placeholder="" classes="mt-7" />
        </div>
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">Депозит</label>
          <CustomSelect placeholder="Введите депозит" />
        </div>
      </div>
    </div>
  );
};
