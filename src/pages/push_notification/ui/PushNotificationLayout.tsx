import { FC } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";
import { NotificationForm } from "src/widgets/NotificationForm";
import { PushNotificationTable } from "src/widgets/NotificationTable";

export const PushNotificationLayout: FC = () => {
  const location = useLocation();

  const navigate = useNavigate();

  return (
    <div className="container__default">
      <Title title="Создание PUSH" classes="title__default" />
      {location.pathname.endsWith("list") && (
        <ButtonDefault
          btn_text="Создать PWA"
          btn_classes="btn__orange text-view-5 !min-h-13.25 px-12 py-3 max-w-58.75"
          onClickHandler={() => navigate("/push_notification/form")}
        />
      )}
      <Routes>
        <Route path="list" element={<PushNotificationTable />} />
        <Route path="form" element={<NotificationForm />} />
      </Routes>
    </div>
  );
};
