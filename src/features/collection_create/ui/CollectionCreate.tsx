import { ChangeEvent, FC, useState } from "react";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import trash_icon from "src/shared/assets/icons/trash_icon.png";
import close_icon from "src/shared/assets/icons/close_icon.png";
import cloud_icon from "src/shared/assets/icons/cloud_icon.png";
import { useAppDispatch } from "src/shared/lib/store";
import { addCollection } from "src/entities/pwa_design";
import { ICollection } from "src/shared/types";
import { handleFileUpload } from "src/features/appData/appDataAPI";

type CollectionCreate = {
  onPopupHandler: () => void;
  collectionCreateHandler: (collection: Omit<ICollection, "_id">) => void;
};

export const CollectionCreate: FC<CollectionCreate> = ({
  onPopupHandler,
  collectionCreateHandler,
}) => {
  const [collectionState, setCollectionState] = useState<Partial<ICollection>>({
    _id: "",
    collectionImage: null,
    collectionName: null,
    images: [null, null, null, null],
  });

  const { collectionImage, images, collectionName } = collectionState;
  const dispatch = useAppDispatch();

  const handleColleactionImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = await handleFileUpload(file);
      setCollectionState((prevState) => ({
        ...prevState,
        collectionImage: reader,
      }));
    }
  };

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = await handleFileUpload(file);

      setCollectionState((prevState) => ({
        ...prevState,
        images: prevState.images?.map((img, i) =>
          i === index ? reader : img
        ) || [reader],
      }));
    }
  };

  const removeCollectionIcon = () => {
    setCollectionState((prevState) => ({
      ...prevState,
      collectionImage: null,
    }));
  };

  const removeColelctionImage = (index: number) => {
    setCollectionState((prevState) => ({
      ...prevState,
      images: prevState.images?.map((img, i) => (i === index ? null : img)),
    }));
  };

  const onSaveBtnHandler = () => {
    if (!collectionName || !collectionImage || !images) return;

    if (collectionName.length > 0 && collectionImage !== null) {
      dispatch(
        addCollection({
          collectionImage,
          images,
          collectionName,
        })
      );

      collectionCreateHandler({ collectionImage, images, collectionName });

      // dispatch(resetState());

      onPopupHandler();

      return;
    }
  };

  return (
    <div className="relative bg-white pt-[89px] pb-11 px-6.5">
      <button
        className="absolute flex justify-center items-center top-3 right-3.25 w-8.25 h-8.25"
        onClick={onPopupHandler}
      >
        <img src={close_icon} width={16.5} height={16.5} alt="" />
      </button>
      <div className="flex gap-6.25">
        <div className="w-21.75 h-21.75 border-2 border-gray-1 rounded-lg flex items-center justify-center relative">
          {collectionImage ? (
            <div className="relative w-full h-full">
              <img
                src={collectionImage}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={removeCollectionIcon}
                className="absolute bottom-2 right-2 bg-orange p-1 rounded-1"
              >
                <img src={trash_icon} width={11} height={11} />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleColleactionImageChange}
              />
              <div className="flex flex-col items-center text-gray-400">
                <img src={cloud_icon} width={36} height={36} alt="" />
              </div>
            </label>
          )}
        </div>
        <InputDefault
          label="Название коллекции"
          placeholder="Добавьте название коллекции"
          value={collectionName ?? ""}
          onUpdateValue={(e) =>
            setCollectionState((prevVal) => ({
              ...prevVal,
              collectionName: e.target.value,
            }))
          }
          container_classes="flex flex-col gap-4.5 flex-auto"
        />
      </div>
      <div className="flex gap-2.25 mt-7.75 mb-11.75">
        {images?.map((image, index) => (
          <div
            key={index}
            className="w-33.25 h-69.5 border-2 border-gray-1 rounded-lg flex items-center justify-center relative"
          >
            {image ? (
              <div className="relative w-full h-full">
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-full h-full rounded-lg"
                />
                <button
                  onClick={() => removeColelctionImage(index)}
                  className="absolute bottom-2 right-2 bg-orange p-1 rounded-1"
                >
                  <img src={trash_icon} width={11} height={11} />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleImageChange(event, index)}
                />
                <div className="flex flex-col items-center text-gray-400">
                  <img src={cloud_icon} width={36} height={36} alt="" />
                </div>
              </label>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-[43px]">
        <ButtonDefault
          btn_text="Сохранить коллекцию"
          btn_classes="btn__orange btn__orange-view-3"
          onClickHandler={onSaveBtnHandler}
        />
        <ButtonDefault
          btn_text="Отмена"
          btn_classes="btn__white btn__white-view-3 "
          onClickHandler={onPopupHandler}
        />
      </div>
    </div>
  );
};
