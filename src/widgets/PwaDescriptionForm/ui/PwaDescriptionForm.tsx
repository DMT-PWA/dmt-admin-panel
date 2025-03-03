import { FC } from "react";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";

export const PwaDescriptionForm: FC = () => {
  return (
    <div className="container__view-2 flex-col px-7 pb-[202px]">
      <Title title="Описание" withContainer={false} classes="title__view-2" />
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text__default">Основное</h2>
          <div className="bg-white rounded-[6px] pl-4 pr-[19px] pt-3 pb-[30px]">
            <div className="flex gap-10">
              <InputDefault
                label="Название"
                input_classes=""
                container_classes="flex-[0.5]"
                placeholder="App Name"
              />
              <InputDefault
                label="Разработчик"
                input_classes=""
                container_classes="flex-[0.5]"
                placeholder="Developer Name"
              />
            </div>
            <div className="flex flex-col gap-[9px] pt-[21px] max-w-[243px]">
              <InputDefault
                label="Есть реклама"
                input_classes=""
                type="checkbox"
                placeholder="App Name"
              />
              <InputDefault
                label="Покупки в приложении"
                input_classes=""
                type="checkbox"
                placeholder="Выбор редакции"
              />
              <InputDefault
                label="Название"
                input_classes=""
                type="checkbox"
                placeholder="App Name"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[22px]">
        <ButtonDefault
          btn_text="Создать коллекцию"
          btn_classes="btn__orange btn__orange-view-1"
        />
        <ButtonDefault
          btn_text="Открыть коллекцию"
          btn_classes="btn__white btn__orange-view-1"
        />
      </div>
      .
    </div>
  );
};
