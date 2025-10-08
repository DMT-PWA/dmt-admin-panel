import clsx from "clsx";
import { FC } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";
import { NotificationForm } from "src/widgets/NotificationForm";
import { PushNotificationTable } from "src/widgets/NotificationTable";

export const PushNotificationLayout: FC = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const navigateToList = () => navigate("/push_notification/list");

  const isCreatingPage = location.pathname.endsWith("form");

  return (
    <div className="container__default">
      <div className={clsx({ "flex justify-between": isCreatingPage })}>
        <Title title="Создание PUSH" classes="title__default" />
        {isCreatingPage && (
          <button
            onClick={navigateToList}
            className="btn__default btn__gray flex gap-3.25 py-3 pl-2.25 pr-10.5"
          >
            <div className="flex items-center -rotate-90">
              <img src="/pwa_icons/shevron.png" width={20} height={20} />
            </div>
            Назад к списку
          </button>
        )}
        {location.pathname.endsWith("list") && (
          <ButtonDefault
            btn_text="Создать PUSH"
            btn_classes="btn__orange text-view-5 !min-h-13.25 px-12 py-3 max-w-58.75"
            onClickHandler={() => navigate("/push_notification/form")}
          />
        )}
      </div>
      <Routes>
        <Route path="list" element={<PushNotificationTable />} />
        <Route
          path="form"
          element={<NotificationForm navigateToList={navigateToList} />}
        />
        <Route
          path="form/:id"
          element={<NotificationForm navigateToList={navigateToList} isEdit />}
        />
      </Routes>
    </div>
  );
};
