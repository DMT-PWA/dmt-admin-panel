import { FC } from "react";

import { Title } from "src/shared/ui/title";
import { PwaDescriptionForm } from "src/widgets/PwaDescriptionForm";
export const PwaDescription: FC = () => {
  return (
    <div className="container__default">
      <Title title="Создание PWA" classes="title__default" />

      <PwaDescriptionForm />
    </div>
  );
};
