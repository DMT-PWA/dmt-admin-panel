import React, { FC, useEffect } from "react";

import { Title } from "src/shared/ui/title";
import { PwaDescriptionForm } from "src/widgets/PwaDescriptionForm";
import { PwaForm } from "src/widgets/PwaForm";
import { PhonePreview } from "src/widgets/PhonePreview";
import { useAppSelector } from "src/shared/lib/store";
import { setCurrentStage } from "src/entities/pwa_create";
import { useDispatch } from "react-redux";
import { ButtonDefault } from "src/shared/ui/button";

export const PwaCreate: FC = () => {
  const currentStage = useAppSelector((state) => state.pwa_create.currentStage);

  const getComponentByStage = () => {
    switch (currentStage) {
      case "design":
        return <PwaForm />;
      case "description":
        return <PwaDescriptionForm />;
      default:
        return <PwaForm />;
    }
  };

  return (
    <div className="container__default">
      <Title title="Создание PWA" classes="title__default" />

      <div className="flex gap-[54px]">
        {getComponentByStage()}
        <PhonePreview />
      </div>

      <ButtonDefault
        btn_text="Сохранить"
        btn_classes="btn__orange btn__orange-view-1 m-width-[249px]"
      />
    </div>
  );
};
