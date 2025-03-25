import { FC, useEffect, useState } from "react";

import { Title } from "src/shared/ui/title";
import { PwaDescriptionForm } from "src/widgets/PwaDescriptionForm";
import { PwaForm } from "src/widgets/PwaForm";
import { PhonePreview } from "src/widgets/PhonePreview";
import { ButtonDefault } from "src/shared/ui/button";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { PwaComments, PwaCommentsCreate } from "src/widgets/PwaComments";
import { PwaSettings } from "src/widgets/PwaSettings";
import { PwaMetrics } from "src/widgets/PwaMetrics";
import { updatePwaGeneral } from "src/features/appData/appDataAPI";
import { useAppSelector } from "src/shared/lib/store";
import { adminId } from "src/shared/lib/data";

export const PwaCreate: FC = () => {
  const { currentLanguage } = useAppSelector((state) => state.pwa_design);
  const { appId } = useAppSelector((state) => state.pwa_create);
  const { title, developer_name } = useAppSelector(
    (state) => state.pwa_description
  );

  const pathname = useLocation().pathname;

  const shouldShowPhonePreview = ![
    "/pwa_create/metrics",
    "/pwa_create/settings",
  ].includes(pathname);

  const handleSavePwaGeneral = async () => {
    await updatePwaGeneral({
      appTitle: title,
      appId,
      adminId,
      appSubTitle: developer_name,
    });
  };

  const isSaveBtnShown =
    pathname !== "/pwa_create/comments_create" &&
    pathname !== "/pwa_create/comments";

  return (
    <div className="container__default">
      <Title title="Создание PWA" classes="title__default" />

      <div className="flex gap-[54px]">
        <Routes>
          <Route path="design/:appId" element={<PwaForm />} />
          <Route path="description/:appId" element={<PwaDescriptionForm />} />
          <Route path="comments/:appId" element={<PwaComments />} />
          <Route
            path="comments_create/:appId"
            element={<PwaCommentsCreate />}
          />
          <Route path="settings/:appId" element={<PwaSettings />} />
          <Route path="metrics/:appId" element={<PwaMetrics />} />
          {/* <Route path="*" element={<PwaForm />} /> */}
        </Routes>

        {shouldShowPhonePreview && <PhonePreview />}
      </div>

      {isSaveBtnShown && (
        <ButtonDefault
          btn_text="Сохранить"
          btn_classes="btn__orange btn__orange-view-1 max-w-62.25 mt-5.5"
          onClickHandler={() => handleSavePwaGeneral()}
        />
      )}
    </div>
  );
};
