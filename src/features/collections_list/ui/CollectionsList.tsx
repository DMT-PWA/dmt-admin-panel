import { ChangeEvent, FC, useState } from "react";
import { ButtonDefault } from "src/shared/ui/button";
import { InputDefault } from "src/shared/ui/input";
import close_icon from "src/shared/assets/icons/close_icon.png";
import circle_icon from "src/shared/assets/icons/circle_icon.png";
import shevron from "src/shared/assets/icons/shevron.png";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import clsx from "clsx";

type CollectionCreate = {
  onPopupHandler: () => void;
};

export const CollectionsList: FC<CollectionCreate> = ({ onPopupHandler }) => {
  const { collections } = useAppSelector((state) => state.pwa_design);
  const dispatch = useAppDispatch();

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="relative bg-white pt-[89px] pb-11 px-6.5">
      <button
        className="absolute flex justify-center items-center top-3 right-3.25 w-8.25 h-8.25"
        onClick={onPopupHandler}
      >
        <img src={close_icon} width={16.5} height={16.5} alt="" />
      </button>

      <InputDefault
        label="Список коллекций"
        container_classes="max-w-79.25 mb-5"
        label_classes="text__default"
        placeholder="Поиск коллекции"
        input_classes="with_icon"
      />

      {collections.map(
        (
          item: {
            collectionName: string;
            collectionImage: string;
            images: (string | null)[];
          },
          index: number
        ) => {
          return (
            <div className="flex flex-col">
              <div className="flex justify-between py-[18.5px] px-6 border-b-[1px] border-gray-7">
                <div className="flex items-center">
                  <img
                    src={circle_icon}
                    width={16}
                    style={{ maxHeight: "16px" }}
                    alt=""
                    className="mr-7.75"
                  />
                  {item.collectionName}
                </div>
                <button onClick={() => setOpen(isOpen ? false : true)}>
                  <img
                    src={shevron}
                    alt=""
                    width={13.5}
                    height={7.7}
                    className={clsx(
                      { "rotate-180": !isOpen },
                      "transition-transform duration-300 ease-in-out"
                    )}
                  />
                </button>
              </div>
              {isOpen && (
                <div key={index} className="flex px-16 py-4.5 gap-6">
                  <div className="flex flex-col justify-between">
                    <img
                      src={item.collectionImage}
                      style={{ maxHeight: "73px", borderRadius: "10px" }}
                      width={73}
                    />
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
        }
      )}

      <div className="flex gap-[43px] mt-18">
        <ButtonDefault
          btn_text="Выбрать"
          btn_classes="btn__orange btn__orange-view-3"
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
