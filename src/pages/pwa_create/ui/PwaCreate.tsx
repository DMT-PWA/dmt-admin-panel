import { FC, useEffect, useState } from "react";

import { Title } from "src/shared/ui/title";
import { PwaDescriptionForm } from "src/widgets/PwaDescriptionForm";
import { PwaForm } from "src/widgets/PwaForm";
import { PhonePreview } from "src/widgets/PhonePreview";
import { ButtonDefault } from "src/shared/ui/button";
import { Route, Routes, useLocation } from "react-router-dom";
import { PwaComments, PwaCommentsCreate } from "src/widgets/PwaComments";
import { PwaSettings } from "src/widgets/PwaSettings";
import { PwaMetrics } from "src/widgets/PwaMetrics";
import { getPwaById, updatePwaGeneral } from "src/features/appData/appDataAPI";
import { useAppSelector } from "src/shared/lib/store";
import { adminId } from "src/shared/lib/data";
import { setCollectionImage } from "src/entities/collection";
import { useDispatch } from "react-redux";
import { setTitle, setDeveloperName } from "src/entities/pwa_description";

type PwaCreateProps = {
  appId: string | undefined;
  isEdit?: boolean;
};

export const PwaCreate: FC<PwaCreateProps> = ({ appId, isEdit = false }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const { currentLanguage, currentCountry } = useAppSelector(
    (state) => state.pwa_design
  );

  useEffect(() => {
    setLoading(true);
    fetchAppById();
    setLoading(false);
  }, [appId]);

  async function fetchAppById() {
    if (!appId) return;

    const response = await getPwaById(appId);

    if (response?._id) {
      dispatch(setCollectionImage(response?.logo as string));
      dispatch(setTitle(response.appTitle));
      dispatch(setDeveloperName(response.appSubTitle));
    }
  }

  const { title, developer_name } = useAppSelector(
    (state) => state.pwa_description
  );

  const { collectionImage } = useAppSelector((state) => state.collection);

  const pathname = useLocation().pathname;

  const shouldShowPhonePreview =
    currentLanguage &&
    !loading &&
    !pathname.endsWith("settings") &&
    !pathname.endsWith("metrics");

  const handleSavePwaGeneral = async () => {
    await updatePwaGeneral({
      appTitle: title,
      appId,
      adminId,
      appSubTitle: developer_name,
      logo: collectionImage,
    });
  };

  const isSaveBtnShown = !pathname.endsWith("comments_create");

  return (
    <div className="container__default">
      <Title
        title={isEdit ? "Редактирование  PWA" : "Создание PWA"}
        classes="title__default"
        withContainer={!isEdit}
      />

      <div className="flex gap-[54px]">
        <Routes>
          <Route
            path="design"
            element={<PwaForm appId={appId} isEdit={isEdit} />}
          />
          <Route path="description" element={<PwaDescriptionForm />} />
          <Route path="comments" element={<PwaComments />} />
          <Route path="comments_create" element={<PwaCommentsCreate />} />
          <Route path="settings" element={<PwaSettings />} />
          <Route path="metrics" element={<PwaMetrics />} />
          <Route path="*" element={<PwaForm appId={appId} />} />
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
