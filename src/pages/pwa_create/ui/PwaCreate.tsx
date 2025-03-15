import { FC } from "react";

import { Title } from "src/shared/ui/title";
import { PwaDescriptionForm } from "src/widgets/PwaDescriptionForm";
import { PwaForm } from "src/widgets/PwaForm";
import { PhonePreview } from "src/widgets/PhonePreview";
import { ButtonDefault } from "src/shared/ui/button";
import { Route, Routes, useLocation } from "react-router-dom";
import { PwaComments, PwaCommentsCreate } from "src/widgets/PwaComments";
import { PwaSettings } from "src/widgets/PwaSettings";
import { PwaMetrics } from "src/widgets/PwaMetrics";

export const PwaCreate: FC = () => {
  const pathname = useLocation().pathname;

  const isSaveBtnShown =
    pathname !== "/pwa_create/comments_create" &&
    pathname !== "/pwa_create/comments";

  return (
    <div className="container__default">
      <Title title="Создание PWA" classes="title__default" />

      <div className="flex gap-[54px]">
        <Routes>
          <Route path="design" element={<PwaForm />} />
          <Route path="description" element={<PwaDescriptionForm />} />
          <Route path="comments" element={<PwaComments />} />
          <Route path="comments_create" element={<PwaCommentsCreate />} />
          <Route path="settings" element={<PwaSettings />} />
          <Route path="metrics" element={<PwaMetrics />} />
          <Route path="*" element={<PwaForm />} />
        </Routes>

        <PhonePreview />
      </div>

      {isSaveBtnShown && (
        <ButtonDefault
          btn_text="Сохранить"
          btn_classes="btn__orange btn__orange-view-1 max-w-62.25 mt-5.5"
        />
      )}
    </div>
  );
};
