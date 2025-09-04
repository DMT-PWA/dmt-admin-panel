import clsx from "clsx";
import { MouseEvent, useState } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import { useNavigate } from "react-router-dom";
import IconCalendar from "src/shared/assets/icons/IconCalendar";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";
import { PwaTable } from "src/widgets/PwaTable";
const MainPage = () => {
  const navigate = useNavigate();

  async function createApp() {
    navigate(`/pwa_create/design`);
  }

  async function saveApp(ev: MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    await createApp();
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => saveApp(e);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [idSearch, setIdSearch] = useState("");

  const handleDateChange: DatePickerProps["onChange"] = (
    dates: [Date | null, Date | null] | null
  ) => {
    if (dates) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <div className="container__default">
      <Title title="PWA" classes="title__default" />
      <div className="flex gap-[22px]">
        <ButtonDefault
          btn_text="Создать PWA"
          btn_classes="btn__orange text-view-5 !min-h-13.25 px-12 py-3"
          onClickHandler={handleClick}
        />
        <ButtonDefault
          btn_text="Статистика PUSH"
          btn_classes="btn__white text-view-5 !min-h-13.25 px-12 py-3"
          onClickHandler={() => navigate("/push_notification")}
        />
      </div>
      <div className="container__view-1 justify-between mt-5.5 px-9.5 pb-9">
        <div className="flex gap-3.25">
          <InputDefault
            label="iD"
            input_classes="w-[352px]"
            placeholder="Поиск по iD"
            value={idSearch}
            onUpdateValue={(e) => setIdSearch(e.target.value)}
          />
          <InputDefault
            label="Название PWA"
            input_classes="w-[352px]"
            placeholder="Поиск по названию PWA"
          />
        </div>
        <DatePicker
          showIcon
          showPreviousMonths
          monthsShown={2}
          wrapperClassName="self-end"
          dateFormat="dd.MM.yyyy"
          popperPlacement="bottom-start"
          placeholderText="Выбрать дату"
          className={clsx("mr-2.5", { "max-w-25": !endDate })}
          selected={startDate}
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          enableTabLoop={false}
          icon={<IconCalendar />}
        />
      </div>
      <PwaTable idSearch={idSearch} />
    </div>
  );
};
export default MainPage;
