import { MouseEvent, useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";
import { PwaTable } from "src/widgets/PwaTable";
import { adminId } from "src/shared/lib/data";
import { createPwa } from "src/features/appData/appDataAPI";
import { setAppId } from "src/entities/pwa_create";
import { useAppDispatch } from "src/shared/lib/store";
const MainPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  async function createApp() {
    // dispatch(setAppId("1"));
    navigate(`/pwa_create/design`);
  }

  async function saveApp(ev: MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    await createApp();
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => saveApp(e);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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
        />
      </div>
      <div className="container__view-1 justify-between mt-5.5 px-9.5 pb-9">
        <div className="flex gap-3.25">
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
        <DatePicker
          showIcon
          showPreviousMonths
          monthsShown={2}
          wrapperClassName="self-end"
          dateFormat="dd.MM.yyyy"
          popperPlacement="bottom-start"
          placeholderText="Выбрать дату"
          className="max-w-25 mr-2.5"
          selected={startDate}
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          enableTabLoop={false}
          icon={
            <svg
              width="15"
              height="13"
              viewBox="0 0 15 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.09995 0.502441C3.63051 0.502441 3.24995 0.838787 3.24995 1.25369V2.00494H2.39995C1.46107 2.00494 0.699951 2.67763 0.699951 3.50744V11.0199C0.699951 11.8497 1.46107 12.5224 2.39995 12.5224H12.6C13.5388 12.5224 14.3 11.8497 14.3 11.0199V3.50744C14.3 2.67763 13.5388 2.00494 12.6 2.00494H11.75V1.25369C11.75 0.838787 11.3694 0.502441 10.9 0.502441C10.4305 0.502441 10.05 0.838787 10.05 1.25369V2.00494H4.94995V1.25369C4.94995 0.838787 4.56939 0.502441 4.09995 0.502441ZM4.09995 4.25869C3.63051 4.25869 3.24995 4.59504 3.24995 5.00994C3.24995 5.42485 3.63051 5.76119 4.09995 5.76119H10.9C11.3694 5.76119 11.75 5.42485 11.75 5.00994C11.75 4.59504 11.3694 4.25869 10.9 4.25869H4.09995Z"
                fill="#717171"
              />
            </svg>
          }
        />
      </div>
      <PwaTable />
    </div>
  );
};
export default MainPage;
