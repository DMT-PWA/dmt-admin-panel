import {
  Dialog,
  DialogBackdrop,
  Field,
  Label,
  Textarea,
} from "@headlessui/react";
import { FC, useEffect, useState } from "react";
import { CheckboxList } from "src/entities/checkbox_list";
import { InputDefault, InputRange } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";
import {
  setTitle,
  setDeveloperName,
  setRaiting,
  setLastUpdate,
  setReleaseDate,
  setNumberOfDownloads,
  setReviewCount,
  setGrade,
  toggleCheckbox,
  updateAboutDescription,
} from "src/entities/pwa_description";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { ButtonDefault } from "src/shared/ui/button";
import { CollectionCreate } from "src/features/collection_create";
import { ICollection } from "src/shared/types";
import {
  createCollection,
  getAllCollections,
} from "src/features/appData/appDataAPI";
import { CollectionsList } from "src/features/collections_list";
import { addCollection, setCurrentCollection } from "src/entities/pwa_design";

type DescriptionFormProps = {
  adminId: string;
  language: string;
};

export const PwaDescriptionForm: FC<DescriptionFormProps> = ({
  adminId,
  language,
}) => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [isCollectionsOpen, setCollectionsOpen] = useState<boolean>(false);

  const { grades, checkboxes_state, title, about_description, descriptionId } =
    useAppSelector((state) => state.pwa_description);

  const { release_date, last_update } = useAppSelector(
    (state) => state.pwa_description.about_description
  );

  const { collections, currentCollection } = useAppSelector(
    (state) => state.pwa_design
  );

  const collectionCreateHandler = async ({
    collectionImage,
    collectionName,
    images,
  }: ICollection) => {
    await createCollection({
      adminId,
      name: collectionName,
      icon: collectionImage,
      screenShots: images,
    });
  };
  useEffect(() => {
    getAllCollections().then((items) => {
      if (items && items.length > 0) {
        items.forEach(
          ({
            icon,
            screenShots,
            name,
            _id,
          }: {
            _id: string;
            icon: string;
            screenShots: string;
            name: string;
          }) => {
            return dispatch(
              addCollection({
                _id,
                collectionImage: icon,
                images: screenShots,
                collectionName: name,
              })
            );
          }
        );
      }
    });
  }, [dispatch]);

  /* useEffect(() => {
    if (!descriptionId) {
      dispatch(createDescriptionById({ adminId, language }));
    }
  }, []); */

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px]">
      <Title title="Описание" withContainer={false} classes="title__view-2" />
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text__default">Основное</h2>
          <div className="bg-white rounded-[6px] mt-2 pl-4 pr-[19px] pt-3 pb-[30px]">
            <div className="flex gap-10">
              <InputDefault
                label="Название"
                input_classes=""
                value={title || ""}
                container_classes="flex-[0.5]"
                placeholder="App Name"
                onUpdateValue={(e) => dispatch(setTitle(e.target.value))}
              />
              <InputDefault
                label="Разработчик"
                input_classes=""
                container_classes="flex-[0.5]"
                placeholder="Developer Name"
                onUpdateValue={(e) =>
                  dispatch(setDeveloperName(e.target.value))
                }
              />
            </div>
            <div className="flex flex-col gap-[9px] pt-[21px] max-w-[243px]">
              <CheckboxList
                handleChange={(val) => dispatch(toggleCheckbox(val))}
                values={checkboxes_state}
              />
            </div>
            <div className="flex gap-9.75 pt-[22px]">
              <InputDefault
                label="Рейтинг"
                input_classes=""
                type="number"
                placeholder="4.5"
                container_classes="flex-[0.5]"
                onUpdateValue={(e) => dispatch(setRaiting(e.target.value))}
              />
              <InputDefault
                label="Количество отзывов"
                input_classes=""
                type="number"
                placeholder="3500"
                container_classes="flex-[0.5]"
                onUpdateValue={(e) =>
                  dispatch(setReviewCount(e.currentTarget.value))
                }
              />
            </div>
            <div className="mt-5 flex gap-4.75">
              {grades?.map((item, index) => {
                return (
                  <InputRange
                    key={index}
                    value={item.value}
                    rating={item.raiting}
                    onChange={(e) =>
                      dispatch(setGrade({ index, value: e.target.value }))
                    }
                  />
                );
              })}
            </div>
          </div>
          <h2 className="text__default mt-6">Дизайн</h2>
          <div className="bg-white rounded-[6px] mt-2 pl-4 pr-[19px] pt-3 pb-[30px]">
            <div className="flex gap-[22px]">
              <ButtonDefault
                onClickHandler={() => setModalOpen(true)}
                btn_text="Загрузить дизайн"
                btn_classes="btn__orange btn__orange-view-1"
              />
              {collections && (
                <ButtonDefault
                  btn_text="Открыть коллекцию"
                  btn_classes="btn__white btn__white-view-4 text-view-3"
                  onClickHandler={() => setCollectionsOpen(true)}
                />
              )}
            </div>
            {currentCollection && (
              <div className="bg-white rounded-2 mt-2 pl-4 pr-[19px] pt-3 pb-[30px]">
                <div className="flex gap-9.75">
                  <div className="flex flex-col justify-between">
                    <img
                      src={currentCollection.collectionImage}
                      style={{ maxHeight: "92px", borderRadius: "10px" }}
                      width={92}
                      height={92}
                    />
                    <ButtonDefault
                      btn_text="Удалить"
                      btn_classes="btn__orange btn__orange-view-4"
                      onClickHandler={() =>
                        dispatch(setCurrentCollection(null))
                      }
                    />
                  </div>
                  {currentCollection.images.map((el: string | null, index) => {
                    return el ? (
                      <div key={index} className="flex  h-full">
                        <img
                          src={el}
                          alt="Uploaded"
                          className="max-w-28.75 min-h-57 rounded-[11px]"
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
          <h2 className="text__default mt-6">Описание</h2>
          <div className="bg-white rounded-[6px] mt-2 pl-4 pr-[19px] pt-3 pb-[30px]">
            <Field className="flex flex-col gap-3">
              <Label>Описание</Label>
              <Textarea
                placeholder="Описание вашего приложения"
                name="description"
                value={about_description.description}
                style={{ minHeight: "125px" }}
                onChange={(e) =>
                  dispatch(
                    updateAboutDescription({
                      key: "description",
                      value: e.target.value,
                    })
                  )
                }
              ></Textarea>
            </Field>
            <div className="flex gap-[23px] pt-[22px]">
              <InputDefault
                container_classes="flex-1/4"
                label="Версия"
                type="number"
                onUpdateValue={(e) =>
                  dispatch(
                    updateAboutDescription({
                      key: "version",
                      value: Number(e.target.value),
                    })
                  )
                }
              />
              <Field className="flex flex-1/4 flex-col gap-1.5">
                <Label className={"title__view-1"}>Дата выхода</Label>
                <DatePicker
                  selected={release_date}
                  isClearable
                  showIcon
                  dateFormat="dd.MM.yyyy"
                  placeholderText={format(new Date(), "dd.MM.yyyy")}
                  onChange={(date) => dispatch(setReleaseDate(date))}
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
              </Field>

              <InputDefault
                label="Количество скачиваний"
                container_classes="flex-1/2"
                placeholder="10000000"
                onUpdateValue={(e) =>
                  dispatch(setNumberOfDownloads(e.target.value))
                }
              />
            </div>
            <div className="flex pt-[22px]">
              <InputDefault
                container_classes="flex-1/3 mr-5.75"
                label="Требуемая версия андройд"
                type="text"
                onUpdateValue={(e) =>
                  dispatch(
                    updateAboutDescription({
                      key: "android_version",
                      value: e.target.value,
                    })
                  )
                }
              />
              <Field className="flex-1/3 flex flex-col gap-1.5 mr-5">
                <Label className={"title__view-1"}>Последнее обновление</Label>
                <DatePicker
                  selected={last_update}
                  isClearable
                  showIcon={!last_update}
                  dateFormat="dd.MM.yyyy"
                  placeholderText={format(new Date(), "dd.MM.yyyy")}
                  onChange={(date) => dispatch(setLastUpdate(date))}
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
              </Field>
              <InputDefault
                container_classes="flex-2/3"
                label="Возрастные ограничения"
              />
            </div>
            <div className="flex gap-[23px] pt-[22px]">
              <Field className="flex flex-col flex-1/4 gap-2">
                <Label>Описание</Label>
                <Textarea
                  className="min-h-[120px]"
                  placeholder="Исправлены баги и ошибки"
                  name="whats_new"
                  onChange={(e) =>
                    dispatch(
                      updateAboutDescription({
                        key: "whats_new",
                        value: e.target.value,
                      })
                    )
                  }
                ></Textarea>
              </Field>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <CollectionCreate
            onPopupHandler={() => setModalOpen(false)}
            collectionCreateHandler={(val) => collectionCreateHandler(val)}
          />
        </div>
      </Dialog>
      <Dialog
        open={isCollectionsOpen}
        onClose={() => setCollectionsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <CollectionsList onPopupHandler={() => setCollectionsOpen(false)} />
        </div>
      </Dialog>
    </div>
  );
};
