import { ChangeEvent, FC } from "react";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import trash_icon from "src/shared/assets/icons/trash_icon.png";
import close_icon from "src/shared/assets/icons/close_icon.png";
import cloud_icon from "src/shared/assets/icons/cloud_icon.png";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import {
  removeCollectionImage,
  removeImage,
  setCollectionImage,
  setImage,
  setCollectionName,
  resetState,
} from "src/entities/collection";
import { addCollection } from "src/entities/pwa_design";

type CollectionCreate = {
  onPopupHandler: () => void;
};

export const CollectionCreate: FC<CollectionCreate> = ({ onPopupHandler }) => {
  const { collectionImage, images, collectionName } = useAppSelector(
    (state) => state.collection
  );

  const dispatch = useAppDispatch();

  const handleColleactionImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setCollectionImage(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setImage({ index, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSaveBtnHandler = () => {
    if (collectionName.length > 0 && collectionImage !== null) {
      dispatch(
        addCollection({
          collectionImage,
          images,
          collectionName,
        })
      );

      dispatch(resetState());

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
        <div className="w-21.75 h-21.75 border-2 border-gray-300 rounded-lg flex items-center justify-center relative">
          {collectionImage ? (
            <div className="relative w-full h-full">
              <img
                src={collectionImage}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => dispatch(removeCollectionImage())}
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
          value={collectionName}
          onUpdateValue={(e) => dispatch(setCollectionName(e.target.value))}
          container_classes="flex flex-col gap-4.5 flex-auto"
        />
      </div>
      <div className="flex gap-2.25 mt-7.75 mb-11.75">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-33.25 h-69.5 border-2 border-gray-300 rounded-lg flex items-center justify-center relative"
          >
            {image ? (
              <div className="relative w-full h-full">
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => dispatch(removeImage(index))}
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
