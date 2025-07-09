import { IDescriptionMain } from "src/shared/types";

type FieldSignature = {
  label: string;
  name: keyof Pick<IDescriptionMain, "title" | "developer_name">;
  placeholder: string;
  flex: number;
};

const TEXT_FIELDS: Array<FieldSignature> = [
  { label: "Название", name: "title", placeholder: "App Name", flex: 0.5 },
  {
    label: "Разработчик",
    name: "developer_name",
    placeholder: "Developer Name",
    flex: 0.5,
  },
];

const NUMBER_FIELDS = [
  { label: "Рейтинг", name: "raiting", placeholder: "4.5", flex: 0.5 },
  {
    label: "Количество отзывов",
    name: "review_count",
    placeholder: "3500",
    flex: 0.5,
  },
];

export { TEXT_FIELDS, NUMBER_FIELDS };
