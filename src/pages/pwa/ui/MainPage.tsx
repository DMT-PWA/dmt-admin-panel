import { useNavigate } from "react-router-dom";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";
import { PwaTable } from "src/widgets/PwaTable";

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/pwa_create/design");

  return (
    <div className="container__default">
      <Title title="PWA" classes="title__default" />
      <div className="flex gap-[22px]">
        <ButtonDefault
          btn_text="Создать PWA"
          btn_classes="btn__orange"
          onClickHandler={handleClick}
        />
        <ButtonDefault btn_text="Статистика PUSH" btn_classes="btn__white" />
      </div>
      <div className="container__view-1 mt-[22px] pl-[38px] pb-9">
        <InputDefault
          label="iD"
          input_classes="w-[352px]"
          placeholder="Поиск по iD"
        />
        <InputDefault
          label="Название PWA"
          input_classes="w-[352px]"
          placeholder="Поиск по названию PWA"
        />
      </div>
      <PwaTable />
    </div>
  );
};
export default MainPage;
