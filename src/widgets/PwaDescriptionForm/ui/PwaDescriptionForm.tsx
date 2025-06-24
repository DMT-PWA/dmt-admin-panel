import {
  Dialog,
  DialogBackdrop,
  Field,
  Label,
  Textarea,
} from "@headlessui/react";
import { FC, useEffect, useState } from "react";
import { CheckboxList } from "src/shared/ui/checkbox_list";
import { InputDefault, InputRange } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";
import { CombinedDescription } from "src/entities/pwa_description";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { ButtonDefault } from "src/shared/ui/button";
import { CollectionCreate } from "src/features/collection_create";
import { IDescriptionAbout, ICollection } from "src/shared/types";
import {
  CollectionsList,
  getAllCollections,
} from "src/features/collections_list";
import { TEXT_FIELDS } from "../lib/const";
import {
  updateLanguageData,
  selectLanguage,
  selectCurrentLanguageValue,
} from "src/features/languageData";
import IconCalendar from "src/shared/assets/icons/IconCalendar";
import { createCollection } from "src/features/collections_list/model/collectionsThunk";
import { cloneDeep, isEqual } from "lodash";
import { useBeforeUnload, useMount } from "react-use";

type DescriptionFormProps = {
  adminId: string;
};

export const PwaDescriptionForm: FC<DescriptionFormProps> = ({ adminId }) => {
  const dispatch = useAppDispatch();

  const language = useAppSelector(selectLanguage);

  const value = useAppSelector(selectCurrentLanguageValue);

  const { collectionsList } = useAppSelector((state) => state.collections);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [isCollectionsOpen, setCollectionsOpen] = useState<boolean>(false);

  const [initStateCopy, setInitStateCopy] = useState({} as typeof value);

  useEffect(() => {
    if (!collectionsList.length) dispatch(getAllCollections());
  }, [dispatch, collectionsList]);

  useMount(() => {
    setInitStateCopy(cloneDeep(value) as unknown as typeof value);
  });

  useBeforeUnload(!isEqual(value, initStateCopy));

  if (!value) return <div>Loading...</div>;

  const { descriptionState, collectionState } = value;

  const {
    grades,
    checkboxes_state,
    about_description,
    raiting,
    review_count,
    number_of_downloads,
  } = descriptionState;

  const { release_date, last_update, version, android_version, whats_new } =
    about_description as IDescriptionAbout;

  const handleUpdateField = (payload: Partial<CombinedDescription>) => {
    if (language) {
      dispatch(
        updateLanguageData({
          state: "descriptionState",
          payload,
          currentLanguage: language,
        })
      );
    }
  };

  const handleCollectionUpdate = (payload: Partial<ICollection> | null) => {
    if (!language) return;
    dispatch(
      updateLanguageData({
        state: "collectionState",
        payload,
        currentLanguage: language,
      })
    );
  };

  const collectionCreateHandler = async (payload: Omit<ICollection, "_id">) => {
    if (!language) return;

    const response = await dispatch(createCollection({ ...payload, adminId }));

    if (createCollection.fulfilled.match(response)) {
      const { _id, icon, name, screenShots } = response.payload;

      dispatch(
        updateLanguageData({
          state: "collectionState",
          payload: {
            _id,
            collectionImage: icon,
            collectionName: name,
            images: screenShots,
          },
          currentLanguage: language,
        })
      );

      dispatch(getAllCollections());
    }
  };

  const handleCheckboxes = (val: { id: number; value: boolean }) =>
    handleUpdateField({
      checkboxes_state: checkboxes_state?.map((checkbox) =>
        checkbox.id === val.id ? { ...checkbox, value: val.value } : checkbox
      ),
    });

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px]">
      <Title title="Описание" withContainer={false} classes="title__view-2" />
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text__default">Основное</h2>
          <div className="bg-white rounded-[6px] mt-2 pl-4 pr-[19px] pt-3 pb-[30px]">
            <div className="flex gap-10">
              {TEXT_FIELDS.map((field, ind) => (
                <InputDefault
                  key={ind}
                  {...field}
                  value={descriptionState[field.name] || ""}
                  container_classes="flex-[0.5]"
                  onUpdateValue={(e) =>
                    handleUpdateField({ [field.name]: e.target.value })
                  }
                />
              ))}
            </div>
            <div className="flex flex-col gap-[9px] pt-[21px] max-w-[243px]">
              <CheckboxList
                handleChange={handleCheckboxes}
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
                value={raiting ?? ""}
                onUpdateValue={(e) =>
                  handleUpdateField({ raiting: e.target.value })
                }
              />
              <InputDefault
                label="Количество отзывов"
                input_classes=""
                type="number"
                placeholder="3500"
                container_classes="flex-[0.5]"
                value={review_count ?? ""}
                onUpdateValue={(e) =>
                  handleUpdateField({ review_count: e.target.value })
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
                      handleUpdateField({
                        grades: grades.map((el, ind) => {
                          if (index === ind) {
                            return {
                              ...el,
                              value: e.target.value,
                            };
                          }

                          return el;
                        }),
                      })
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
              {collectionsList && (
                <ButtonDefault
                  btn_text="Открыть коллекцию"
                  btn_classes="btn__white btn__white-view-4 text-view-3"
                  onClickHandler={() => setCollectionsOpen(true)}
                />
              )}
            </div>
            {collectionState && (
              <div className="bg-white rounded-2 mt-2 pl-4 pr-[19px] pt-3 pb-[30px]">
                <div className="flex gap-9.75">
                  {collectionState.collectionImage && (
                    <div className="flex flex-col justify-between">
                      <img
                        src={collectionState.collectionImage}
                        style={{ maxHeight: "92px", borderRadius: "10px" }}
                        width={92}
                        height={92}
                      />
                      <ButtonDefault
                        btn_text="Удалить"
                        btn_classes="btn__orange btn__orange-view-4"
                        onClickHandler={() => handleCollectionUpdate(null)}
                      />
                    </div>
                  )}
                  {collectionState.images.map(
                    (el: string | null, index: number) => {
                      return el ? (
                        <div key={index} className="flex  h-full">
                          <img
                            src={el}
                            alt="Uploaded"
                            className="max-w-28.75 min-h-57 rounded-[11px]"
                          />
                        </div>
                      ) : null;
                    }
                  )}
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
                  handleUpdateField({
                    about_description: {
                      ...about_description,
                      description: e.target.value,
                    },
                  })
                }
              ></Textarea>
            </Field>
            <div className="flex gap-[23px] pt-[22px]">
              <InputDefault
                container_classes="flex-1/4"
                label="Версия"
                type="number"
                value={version ?? ""}
                onUpdateValue={(e) =>
                  handleUpdateField({
                    about_description: {
                      ...about_description,
                      version: e.target.value,
                    },
                  })
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
                  onChange={(date) =>
                    handleUpdateField({
                      about_description: {
                        ...about_description,
                        release_date: date,
                      },
                    })
                  }
                  icon={<IconCalendar />}
                />
              </Field>

              <InputDefault
                label="Количество скачиваний"
                container_classes="flex-1/2"
                placeholder="10000000"
                value={number_of_downloads ?? ""}
                onUpdateValue={(e) =>
                  handleUpdateField({
                    number_of_downloads: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex pt-[22px]">
              <InputDefault
                container_classes="flex-1/3 mr-5.75"
                label="Требуемая версия андройд"
                type="text"
                value={android_version ?? ""}
                onUpdateValue={(e) =>
                  handleUpdateField({
                    about_description: {
                      ...about_description,
                      android_version: e.target.value,
                    },
                  })
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
                  onChange={(date) =>
                    handleUpdateField({
                      about_description: {
                        ...about_description,
                        last_update: date,
                      },
                    })
                  }
                  icon={<IconCalendar />}
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
                  value={whats_new ?? ""}
                  onChange={(e) =>
                    handleUpdateField({
                      about_description: {
                        ...about_description,
                        whats_new: e.target.value,
                      },
                    })
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
            collectionCreateHandler={collectionCreateHandler}
          />
        </div>
      </Dialog>
      <Dialog
        open={isCollectionsOpen}
        onClose={() => setCollectionsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center overflow-y-scroll">
          <CollectionsList
            onPopupHandler={() => setCollectionsOpen(false)}
            handleCollectionUpdate={handleCollectionUpdate}
          />
        </div>
      </Dialog>
    </div>
  );
};
