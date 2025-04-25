import { FC, useState } from "react";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import close_icon from "src/shared/assets/icons/close_icon.png";
import circle_icon from "src/shared/assets/icons/circle_icon.png";
import shevron from "src/shared/assets/icons/shevron.png";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import clsx from "clsx";
import { setCurrentCollection } from "../model/collectionsSlice";
import { ICollection } from "src/entities/collection";

type CollectionCreate = {
  onPopupHandler: () => void;
};


//refactor list
export const CollectionsList: FC<CollectionCreate> = ({ onPopupHandler }) => {
  const { collectionsList } = useAppSelector((state) => state.collections);
  const dispatch = useAppDispatch();

  const [isOpen, setOpen] = useState<null | number>(null);

  const openHandler = (ind: number) => {
    if (isOpen === ind) return setOpen(null);

    return setOpen(ind);
  };

  const [collectionItem, setCollectionItem] = useState<ICollection | null>(
    null
  );

  const collectionPickHandler = () => {
    if (!collectionItem) return;

    dispatch(setCurrentCollection(collectionItem._id));
    onPopupHandler();
  };

  return (
    <div 
    // className="relative bg-white pt-[89px] pb-11"
    className="relative bg-white pt-[89px] pb-11 h-[90%]"

    >
      <button
        className="absolute flex justify-center items-center top-3 right-3.25 w-8.25 h-8.25"
        onClick={onPopupHandler}
      >
        <img src={close_icon} width={16.5} height={16.5} alt="" />
      </button>

      <InputDefault
        label="Список коллекций"
        container_classes="max-w-79.25 mb-5 pl-6.5"
        label_classes="text__default"
        placeholder="Поиск коллекции"
        input_classes="with_icon"
      />
      <div className="flex flex-col h-[80%] overflow-y-scroll">
        {collectionsList.map((item, index: number) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between py-[18.5px] px-6 border-b-[1px] border-gray-7 cursor-pointer">
                <div className="flex items-center">
                  {collectionItem === item ? (
                    <div className="mr-7.75 w-4 h-4 rounded-full border-1 border-[#21272A] bg-orange"></div>
                  ) : (
                    <img
                      onClick={() => setCollectionItem(item)}
                      src={circle_icon}
                      width={16}
                      style={{ maxHeight: "16px" }}
                      alt=""
                      className="mr-7.75"
                    />
                  )}
                  <span>{item.collectionName}</span>
                </div>
                <button onClick={() => openHandler(index)}>
                  <img
                    src={shevron}
                    alt=""
                    width={13.5}
                    height={7.7}
                    className={clsx(
                      { "rotate-180": isOpen !== index },
                      "transition-transform duration-300 ease-in-out"
                    )}
                  />
                </button>
              </div>
              {isOpen === index && (
                <div key={index} className="flex px-16 py-4.5 gap-6">
                  <div className="flex flex-col justify-between">
                    {item.collectionImage && (
                      <img
                        src={item.collectionImage}
                        style={{
                          height: "73px",
                          maxWidth: "73px",
                          borderRadius: "10px",
                        }}
                      />
                    )}
                  </div>
                  {item.images.map((el: string | null, index) => {
                    return el ? (
                      <div key={index} className="flex w-full h-full">
                        <img
                          src={el}
                          alt="Uploaded"
                          className="max-w-19 min-h-38 rounded-[11px]"
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-[43px] mt-18 px-6.25">
        <ButtonDefault
          btn_text="Выбрать"
          btn_classes="btn__orange btn__orange-view-3"
          onClickHandler={collectionPickHandler}
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
