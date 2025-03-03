import { FC } from "react";

import { Title } from "src/shared/ui/title";
import { PwaForm } from "src/widgets/PwaForm";
export const PwaDesign: FC = () => {
  return (
    <div className="container__default">
      <Title title="Создание PWA" classes="title__default" />

      <PwaForm />
    </div>
  );
};
