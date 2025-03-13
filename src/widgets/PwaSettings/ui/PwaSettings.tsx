import { FC } from "react";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";

export const PwaSettings: FC = () => {
  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px]">
      <Title title="Настройки" withContainer={false} classes="title__view-2" />
      <div className="flex gap-3">
        <div className="flex flex-col flex-[0.5]">
          <label className="title__view-1 mb-1">Название</label>
          <CustomSelect placeholder="Введите название PWA" classes="mb-2" />
          <label className="title__view-1 mb-2">Теги</label>
          <CustomSelect placeholder="" classes="mb-2" />
          <label className="title__view-1 mb-2">Нейминг/Ссылка</label>
          <CustomSelect placeholder="Введите нейминг" />
        </div>
        <div className="flex flex-col flex-[0.5]">
          <label className="title__view-1 mt-20 mb-2">Домен</label>
          <CustomSelect placeholder="Выберите домен" classes="mb-2" />
          <label className="title__view-1 mb-2">White Page</label>
          <CustomSelect placeholder="Введите название PWA" />
        </div>
      </div>
    </div>
  );
};
