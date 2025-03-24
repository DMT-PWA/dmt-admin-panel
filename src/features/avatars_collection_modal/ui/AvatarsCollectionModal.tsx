import { Field } from "@headlessui/react";
import { FC, useRef, useState } from "react";
import close_icon from "src/shared/assets/icons/close_icon.png";
import { ButtonDefault } from "src/shared/ui/button";
import { Title } from "src/shared/ui/title";
import avatar_icon from "src/shared/assets/icons/avatar_icon.png";
import { setAvatar } from "src/entities/comments";
import { useAppDispatch } from "src/shared/lib/store";
interface IAvatarsCollectionProps {
  onPopupHandler: () => void;
}

export const AvatarsCollectionModal: FC<IAvatarsCollectionProps> = ({
  onPopupHandler,
}) => {
  const [avatar, setTempAvatar] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempAvatar(imageUrl);
    }
  };

  const handleAvatarChoose = () => {
    if (avatar) {
      dispatch(setAvatar(avatar));
      onPopupHandler();
    }
  };

  return (
    <div className="relative bg-white pt-11.25 pb-11 px-5.75">
      <button
        className="absolute flex justify-center items-center top-3 right-3.25 w-8.25 h-8.25"
        onClick={onPopupHandler}
      >
        <img src={close_icon} width={16.5} height={16.5} alt="" />
      </button>
      <Field className={"flex flex-col"}>
        <Title
          title="Список аватарок"
          classes="text__default text-view-5"
          withContainer={false}
        ></Title>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <div className="mt-4.75 mb-2.25 h-[92px] w-[92px] rounded-[8px] bg-[#E8E8E8] flex justify-center items-center">
          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              className="w-full h-full object-cover rounded-[8px]"
            />
          ) : (
            <img src={avatar_icon} alt="avatar" width={40} height={50} />
          )}
        </div>
        <ButtonDefault
          btn_text="Загрузить"
          btn_classes="btn__orange btn__orange-view-5 max-w-23"
          onClickHandler={() => fileInputRef.current?.click()}
        />
      </Field>
      <Title
        title="Загруженые аватарки"
        classes="mt-5.75 text__default text-view-5"
        withContainer={false}
      ></Title>
      <div className="mt-4.75 mb-14.75 grid grid-cols-5 grid-rows-2 gap-6.25">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="w-17.25 h-17.25  bg-[#E8E8E8] rounded-[8px]"
          ></div>
        ))}
      </div>
      <div className="flex gap-[43px]">
        <ButtonDefault
          btn_text="Выбрать"
          onClickHandler={handleAvatarChoose}
          btn_classes="btn__orange btn__orange-view-3 flex-1"
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
