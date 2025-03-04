import { FC } from "react";
import { useDispatch } from "react-redux";
import { setPwaTitle } from "src/entities/pwa_design";
import { useAppSelector } from "src/shared/lib/store";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";

export const PwaForm: FC = () => {
  const title = useAppSelector((state) => state.pwa_design.pwa_title);
  const dispatch = useDispatch();

  return (
    <div className="container__view-2 flex-col px-7 pb-[202px]">
      <Title title="Дизайн" withContainer={false} classes="title__view-2" />
      <div className="flex flex-col gap-6">
        <InputDefault
          value={title}
          label="Название PWA"
          input_classes=""
          placeholder="..."
          onUpdateValue={(event) => dispatch(setPwaTitle(event.target.value))}
        />
        <InputDefault
          label="Язык интерфейса PWA"
          input_classes=""
          placeholder="Английский"
        />
        <InputDefault label="Теги PWA" input_classes="" placeholder="..." />
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
