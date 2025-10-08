import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { format } from "date-fns";

import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import {
  NotificationMessage,
  NotificationSettings,
  NotificationTime,
} from "src/shared/types/notification.types";
import { SelectValueProp } from "src/shared/types";
import { modifiedLanguagesList } from "src/entities/pwa_design/model/selectors";
import { fetchLanguages } from "src/entities/pwa_design/model/pwaDesignThunk";
import {
  createNotification,
  getAllPwa,
  getNotificationsById,
  updateNotification,
} from "../lib/notificationForm.thunk";
import { events } from "./const";
import { adminId } from "src/shared/lib/data";

export const useNotificationForm = (
  navigateToList: () => void,
  isEdit: boolean = false
) => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const { id } = useParams();

  const [notificationTimes, handleNotificationTimes] = useState<
    NotificationTime[]
  >([]);

  const [pwas, setPwas] = useState<NotificationSettings["pwas"]>([]);

  const [settings, setSettings] = useState<NotificationSettings>({
    defaultLanguage: "",
    pwas: [],
    title: "",
    isActive: true,
  });

  const [notificationMessages, handleNotificationMessages] = useState<
    NotificationMessage[]
  >([]);

  const [event, setEvent] = useState<SelectValueProp | null>(null);

  const languagesList = useAppSelector(modifiedLanguagesList);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchLanguages());

      const data = await dispatch(getAllPwa()).unwrap();

      setPwas(data);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const response = await dispatch(getNotificationsById(id));

        if (getNotificationsById.fulfilled.match(response)) {
          const {
            title,
            defaultLanguage,
            appIds,
            messages,
            schedules,
            category,
            isActive,
          } = response.payload;

          setSettings({
            title,
            defaultLanguage:
              languagesList.find((el) => el.label === defaultLanguage) || "",
            pwas: appIds,
            isActive: isActive,
          });

          handleNotificationMessages(messages);

          handleNotificationTimes(
            schedules.map((el) => {
              const [hours, minutes] = el.time.split(":").map(Number);
              const date = new Date();
              date.setHours(hours, minutes, 0, 0);

              return {
                ...el,
                time: date,
              };
            })
          );

          setEvent(() => events.find((el) => el.value === category) || null);
        }
      }
    };

    fetch();
  }, [dispatch, location.pathname]);

  const saveNotifications = async () => {
    const payload = {
      messages: notificationMessages.map((el) => ({
        ...el,
        image: el.image,
      })),
      defaultLanguage:
        typeof settings.defaultLanguage === "object" &&
        "label" in settings.defaultLanguage
          ? settings.defaultLanguage.label
          : "",
      isActive: settings.isActive,
      title: settings.title,
      category: event?.value || "",
      adminId,
      appIds: settings.pwas.map((el) => el._id),
      schedules: notificationTimes.map((el) => ({
        ...el,
        time: format(el.time, "HH:mm"),
      })),
    };

    if (!isEdit) {
      await dispatch(createNotification(payload));
    } else {
      if (!id) return;
      await dispatch(
        updateNotification({
          id,
          payload,
        })
      );
    }

    navigateToList();
  };

  return {
    notificationTimes,
    pwas,
    event,
    settings,
    languagesList,
    notificationMessages,
    handleNotificationMessages,
    handleNotificationTimes,
    saveNotifications,
    setSettings,
    setEvent,
  };
};
