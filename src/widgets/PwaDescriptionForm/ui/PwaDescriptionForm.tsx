import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  Field,
  Label,
  Textarea,
  Checkbox,
} from "@headlessui/react";
import { InputDefault, InputRange } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";
import { setGrade } from "src/entities/pwa_description";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { ButtonDefault } from "src/shared/ui/button";
import { CollectionCreate } from "src/features/collection_create";
import { ICollection } from "src/shared/types";
import {
  createCollection,
  updatePwa,
  getPwaByIdAndLanguage,
} from "src/features/appData/appDataAPI";
import { getApp } from "src/features/appData/appDataSlice";
import {
  CollectionsList,
  getAllCollections,
  setCurrentCollection,
} from "src/features/collections_list";

type DescriptionFormProps = {
  appId: string;
  adminId: string;
  language: string;
  country: string;
};

// Screen:Description
export const PwaDescriptionForm: FC<DescriptionFormProps> = ({
  appId,
  adminId,
  language,
  country,
}) => {
  const dispatch = useAppDispatch();
  const { grades } = useAppSelector((state) => state.pwa_description);
  const { collectionsList, currentCollection } = useAppSelector(
    (state) => state.collections
  );

  const { appData } = useAppSelector((state) => state.appData);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [isCollectionsOpen, setCollectionsOpen] = useState<boolean>(false);

  //======{New}=========================
  const [appTitle, setAppTitle] = useState<string>(appData?.appTitle || "");
  const [appSubTitle, setAppSubTitle] = useState<string>(
    appData?.appSubTitle || ""
  );
  const [headerReviews, setHeaderReviews] = useState<string>(
    appData?.headerReviews || ""
  );
  const [hundredPlus, setHundredPlus] = useState<string>(
    appData?.hundredPlus || ""
  );
  const [casino, setCasino] = useState<string>(appData?.casino || "");
  const [collectionId, setCollectionId] = useState<string>(
    appData?.collectionId?._id || ""
  );
  const [about, setAbout] = useState<string>(appData?.about || "");
  const [isContainsAds, setIsContainsAds] = useState<boolean>(
    appData?.isContainsAds || false
  );
  const [isInAppPurchases, setIsInAppPurchases] = useState<boolean>(
    appData?.isInAppPurchases || false
  );
  const [isEditorsChoice, setIsEditorsChoice] = useState<boolean>(
    appData?.isEditorsChoice || false
  );
  const [age, setAge] = useState<number>(appData?.age || 18);
  const [rating, setRating] = useState<string>(appData?.rating || ""); //use float
  const [reviewCount, setReviewCount] = useState<string>(
    appData?.reviewCount || ""
  );
  const [downloadsCount, setDownloadsCount] = useState<string>(
    appData?.downloadsCount || ""
  );

  const [version, setVersion] = useState<string>(appData?.version || "");
  const [androidVersion, setAndroidVersion] = useState<string>(
    appData?.androidVersion || ""
  );
  const [lastUpdate, setLastUpdate] = useState<Date | null>(
    appData?.lastUpdate || new Date()
  );
  const [releaseDate, setReleaseDate] = useState<Date | null>(
    appData?.releaseDate || new Date()
  );
  const [ageLimit, setAgeLimit] = useState<string>(appData?.ageLimit || "");
  const [ageRating, setAgeRating] = useState<string>(appData?.ageRating || "");
  const [commentId, setCommentId] = useState<string>(
    appData?.commentId?._id || ""
  );
  const [newFeatures, setNewFeatures] = useState<string>(
    appData?.newFeatures || ""
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
    if (!collectionsList.length) dispatch(getAllCollections());
  }, [dispatch, collectionsList]);

  const updateApp = async () => {
    const userData = {
      appId,
      adminId,
      country,
      language,
      isExist: true,
      appTitle,
      appSubTitle,
      headerReviews,
      hundredPlus,
      updatedDate: lastUpdate,
      casino, // should be a string array
      collectionId,
      about,
      isContainsAds,
      isInAppPurchases: isInAppPurchases,
      isEditorsChoice,
      age,
      rating,
      reviewCount,
      version,
      androidVersion,
      lastUpdate,
      releaseDate,
      ageLimit,
      ageRating,
      commentId,
      newFeatures,
      downloadsCount,
    };

    setTimeout(async () => {
      await updatePWA(userData);
    }, 2000);
  };

  useEffect(() => {
    updateApp();
  }, [
    appTitle,
    appSubTitle,
    headerReviews,
    hundredPlus,
    casino,
    about,
    isContainsAds,
    isInAppPurchases,
    isEditorsChoice,
    age,
    rating,
    reviewCount,
    downloadsCount,
    version,
    androidVersion,
    lastUpdate,
    releaseDate,
    ageLimit,
    ageRating,
    commentId,
    newFeatures,
    currentCollection,
  ]);

  const onSetAppTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setAppTitle(e.target.value);
  const onSetAppSubTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setAppSubTitle(e.target.value);
  const onSetHeaderReviews = (e: ChangeEvent<HTMLInputElement>) =>
    setHeaderReviews(e.target.value);
  const onSetHundredPlus = (e: ChangeEvent<HTMLInputElement>) =>
    setHundredPlus(e.target.value);
  const onSetCasino = (e: ChangeEvent<HTMLInputElement>) =>
    setCasino(e.target.value);
  const onSetCollectionId = (e: ChangeEvent<HTMLInputElement>) =>
    setCollectionId(e.target.value);

  const onSetAbout = (value: string) => {
    setAbout(value);
  };

  // const onSetAge = (e: ChangeEvent<HTMLInputElement>) => setAge(e.target.value);
  const onSetAge = (value: number) => {
    setAge(value);
  };

  const onSetRating = (value: string) => {
    setRating(value);
  };

  const onSetReviewCount = (value: string) => {
    setReviewCount(value);
  };
  const onSetVersion = (value: string) => {
    setVersion(value);
  };

  const onSetAndroidVersion = (value: string) => {
    setAndroidVersion(value);
  };

  const onSetAgeLimit = (value: string) => setAgeLimit(value);

  const onSetAgeRating = (value: string) => setAgeRating(value);

  const onSetCommentId = (value: string) => setCommentId(value);

  const onSetNewFeatures = (value: string) => {
    setNewFeatures(value);
  };

  const onSetDownloadsCount = (value: string) => {
    setDownloadsCount(value);
  };

  const onSetIsContainsAds = (value: boolean) => {
    setIsContainsAds(value);
  };
  const onsetIsInAppPurchases = (value: boolean) => {
    setIsInAppPurchases(value);
  };
  const onSetIsEditorsChoice = (value: boolean) => {
    setIsEditorsChoice(value);
  };

  const onSetReleaseDate = (value: Date) => {
    setReleaseDate(value);
  };

  //fetch app on component mount
  useEffect(() => {
    fetchPWA();
  }, []);

  const fetchPWA = async () => {
    if (!appId) {
      console.log("appId required");
      return;
    }
    if (!language) {
      console.log("language required");
      return;
    }
    if (!country) {
      console.log("country required");
      return;
    }
    const response = await getPwaByIdAndLanguage(appId, language, country);

    if (response?._id) {
      dispatch(getApp(response));
    }
  };

  const updatePWA = async (updatedAppData) => {
    if (!appId) {
      alert("appId is required");
      return;
    }

    if (!language) {
      alert("language is required");
      return;
    }

    if (!country) {
      alert("country is required");
      return;
    }

    const userData = updatedAppData;

    const response = await updatePwa(userData);

    if (response?._id) {
      await fetchPWA();
      //save new states
    }
  };

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
                value={appTitle}
                container_classes="flex-[0.5]"
                placeholder="App Name"
                onUpdateValue={onSetAppTitle}
              />
              <InputDefault
                label="Разработчик"
                input_classes=""
                container_classes="flex-[0.5]"
                placeholder="Developer Name"
                value={appSubTitle}
                onUpdateValue={onSetAppSubTitle}
              />
            </div>
            <div className="flex flex-col gap-[9px] pt-[21px] max-w-[243px]">
              <Field className="flex flex-col gap-[9px] pt-[21px] max-w-[243px]">
                <div className="flex justify-between">
                  <Label>Есть реклама</Label>
                  <Checkbox
                    checked={isContainsAds}
                    onChange={(e) => onSetIsContainsAds(e)}
                    className="group block size-4 rounded border data-[checked]:border-0 bg-white data-[checked]:bg-orange"
                  ></Checkbox>
                </div>
                <div className="flex justify-between">
                  <Label>Покупки в приложении</Label>
                  <Checkbox
                    checked={isInAppPurchases}
                    onChange={(e) => onsetIsInAppPurchases(e)}
                    className="group block size-4 rounded border data-[checked]:border-0 bg-white data-[checked]:bg-orange"
                  ></Checkbox>
                </div>
                <div className="flex justify-between">
                  <Label>Выбор редакции</Label>
                  <Checkbox
                    checked={isEditorsChoice}
                    onChange={(e) => onSetIsEditorsChoice(e)}
                    className="group block size-4 rounded border data-[checked]:border-0  bg-white data-[checked]:bg-orange"
                  ></Checkbox>
                </div>
              </Field>
            </div>
            <div className="flex gap-9.75 pt-[22px]">
              <InputDefault
                label="Рейтинг"
                input_classes=""
                type="text"
                placeholder="4.5"
                container_classes="flex-[0.5]"
                value={rating}
                onUpdateValue={(e) => onSetRating(e.target.value)}
              />
              <InputDefault
                label="Количество отзывов"
                input_classes=""
                type="text"
                placeholder="3500"
                container_classes="flex-[0.5]"
                value={reviewCount}
                onUpdateValue={(e) => onSetReviewCount(e.currentTarget.value)}
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
              {collectionsList && (
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
                value={about}
                style={{ minHeight: "125px" }}
                onChange={(e) => {
                  onSetAbout(e.target.value);
                }}
              ></Textarea>
            </Field>
            <div className="flex gap-[23px] pt-[22px]">
              <InputDefault
                container_classes="flex-1/4"
                label="Версия"
                value={version}
                type="text"
                onUpdateValue={(e) => {
                  onSetVersion(e.target.value);
                }}
              />
              <Field className="flex flex-1/4 flex-col gap-1.5">
                <Label className={"title__view-1"}>Дата выхода</Label>
                <DatePicker
                  selected={releaseDate}
                  isClearable
                  showIcon
                  dateFormat="dd.MM.yyyy"
                  placeholderText={format(new Date(), "dd.MM.yyyy")}
                  onChange={(date: Date | null) => setReleaseDate(date)} // Explicit type
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
                value={downloadsCount}
                type="text"
                onUpdateValue={(e) => onSetDownloadsCount(e.target.value)}
              />
            </div>
            <div className="flex pt-[22px]">
              <InputDefault
                container_classes="flex-1/3 mr-5.75"
                label="Требуемая версия андройд"
                value={androidVersion}
                type="text"
                onUpdateValue={(e) => onSetAndroidVersion(e.target.value)}
              />
              <Field className="flex-1/3 flex flex-col gap-1.5 mr-5">
                <Label className={"title__view-1"}>Последнее обновление</Label>
                <DatePicker
                  selected={lastUpdate}
                  isClearable
                  showIcon={!lastUpdate}
                  dateFormat="dd.MM.yyyy"
                  placeholderText={format(new Date(), "dd.MM.yyyy")}
                  onChange={(date: Date | null) => setLastUpdate(date)} // Explicit type
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
                value={age}
                type="number"
                onUpdateValue={(e) => onSetAge(Number(e.target.value))}
              />
            </div>
            <div className="flex gap-[23px] pt-[22px]">
              <Field className="flex flex-col flex-1/4 gap-2">
                <Label>Описание</Label>
                <Textarea
                  className="min-h-[120px]"
                  placeholder="Исправлены баги и ошибки"
                  value={newFeatures}
                  name="whats_new"
                  onChange={(e) => onSetNewFeatures(e.target.value)}
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
