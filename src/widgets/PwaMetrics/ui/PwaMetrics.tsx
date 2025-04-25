import { ChangeEvent, FC, useEffect, useState } from "react";
import { CustomSelect } from "src/shared/ui/select";
import { Title } from "src/shared/ui/title";
import {
  addFacebookPixelField,
  removeFacebookPixelField,
  setPixelValue,
  setTokenValue,
  deposit,
  install,
  registration,
} from "src/entities/metrics";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { InputDefault } from "src/shared/ui/input";
import { getApp } from "src/features/appData/appDataSlice";
import {
  updatePwa,
  getPwaByIdAndLanguage,
} from "src/features/appData/appDataAPI";
import trash_orange from "src/shared/assets/icons/trash_icon_orange.png";
import clsx from "clsx";

type PwaMetricsProps = {
  appId: string;
  adminId: string;
  language: string;
  country: string;
};

// Screen:Metrics
export const PwaMetrics: FC<PwaMetricsProps> = ({
  appId,
  adminId,
  language,
  country,
}) => {
  const { facebookPixelList } = useAppSelector((state) => state.metrics);

  console.log({ facebookPixelList });

  const dispatch = useAppDispatch();

  const { appData } = useAppSelector((state) => state.appData);
  console.log({ appData });

  const [pixelId, setPixelId] = useState<string>(appData?.pixelId || "");
  const [accessToken, setAccessToken] = useState<string>(
    appData?.accessToken || ""
  );

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

  useEffect(() => {
    updateApp();
  }, [pixelId, accessToken]);

  const updateApp = async () => {
    if (!adminId) {
      alert("adminId is required");
      return;
    }

    if (!appId) {
      alert("appId is required");
      return;
    }

    if (!pixelId) {
      console.log("pixelId object not found");
      return;
    }
    if (!accessToken) {
      console.log("accessToken object not found");
      return;
    }

    const userData = {
      appId,
      adminId,
      pixelId,
      accessToken,
    };
    setTimeout(async () => {
      await updatePWA(userData);
    }, 3000);
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

  const onSetPixelId = (e: ChangeEvent<HTMLInputElement>) =>
    setPixelId(e.target.value);

  const onSetAccessToken = (e: ChangeEvent<HTMLInputElement>) =>
    setAccessToken(e.target.value);

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px] min-h-127.5">
      <Title title="Метрики" withContainer={false} classes="title__view-2" />
      <div className="flex gap-3">
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">
            Регистрация
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect options={registration} placeholder="" classes="mb-2" />
        </div>
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">
            Депозит
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect options={deposit} placeholder="Введите депозит" />
        </div>
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">
            Скачивание
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect options={install} placeholder="" classes="mb-2" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col flex-1/3">
          <InputDefault
            value={pixelId}
            label="Facebook Pixel"
            input_classes="!border-0"
            placeholder="Pixel ID or Track ID"
            onUpdateValue={onSetPixelId}
          />
        </div>
        <div className="flex flex-col flex-1/3">
          <InputDefault
            value={accessToken}
            label="Access token"
            input_classes="!border-0"
            placeholder="Access token or API Key"
            onUpdateValue={onSetAccessToken}
          />
        </div>
      </div>
    </div>
  );
};
