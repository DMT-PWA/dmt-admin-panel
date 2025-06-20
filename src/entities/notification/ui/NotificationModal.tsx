import { FC } from "react";
import { Dialog, DialogBackdrop } from "@headlessui/react";
import { useAppDispatch } from "src/shared/lib/store";
import { onClose } from "../model/notificationSlice";
import { ButtonDefault } from "src/shared/ui/button";
import close_icon from "src/shared/assets/icons/close_icon.png";
type NotificationModalProps = {
  isOpen: boolean;
};

export const NotificationModal: FC<NotificationModalProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(onClose())}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <div className="relative bg-white py-[58px] px-6.5 rounded-[28px]">
          <button
            className="absolute flex justify-center items-center top-3 right-3.25 w-8.25 h-8.25"
            onClick={() => dispatch(onClose())}
          >
            <img src={close_icon} width={16.5} height={16.5} alt="" />
          </button>
          <h1 className="title__view-2 mb-8">
            Вы не сохранили данные перед выходом
          </h1>
          <div className="flex gap-[43px]">
            <ButtonDefault
              btn_text="Сохранить"
              btn_classes="btn__orange btn__orange-view-3"
            />
            <ButtonDefault
              btn_text="Вернуться"
              btn_classes="btn__white btn__white-view-3 "
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};
