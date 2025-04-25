import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/shared/lib/store";
import { CustomSelect } from "src/shared/ui/select";
import { InputDefault } from "src/shared/ui/input";
import { Title } from "src/shared/ui/title";
import {
  updatePwa,
  getPwaByIdAndLanguage,
  getUpdatedCampaigns,
} from "src/features/appData/appDataAPI";
import { getApp } from "src/features/appData/appDataSlice";
import { Domain } from "src/shared/types/settingsTypes";
import { Keitaro } from "src/shared/types/settingsTypes";
import { KeitaroProps } from "src/shared/types/settingsTypes";
import { WhitePageProps } from "src/shared/types/settingsTypes";

type PwaSettingsProps = {
  appId: string;
  adminId: string;
  language: string;
  country: string;
};

const domainList = [
  "https://www.plinsters.pro",
  "https://www.example2",
  "https://www.example3",
  "https://www.example4",
];

const modifiedDoaminList = domainList.map((item, ind) => ({
  value: ind,
  label: item,
}));

const whitePageList = ["404 page", "white"];

const modifiedWhitePageList = whitePageList.map((item, ind) => ({
  value: ind,
  label: item,
}));

export const PwaSettings: FC<PwaSettingsProps> = ({
  appId,
  adminId,
  language,
  country,
}) => {
  const dispatch = useAppDispatch();
  const { appData } = useAppSelector((state) => state.appData);
  console.log({ appData });

  //======{New}=========================
  const [keitaroList, setKeitaroList] = useState<Array<KeitaroProps>>([
    {
      keitaroDomain: "",
      keitaroCampaign: "",
      keitaroCampaignId: 0,
      keitaroCampaignName: "0",
      keitaroState: "",
    },
  ]);
  const [domainObject, setDomainObject] = useState<Domain>(null);
  const [subDomain, setSubDomain] = useState<string>(appData?.subDomain || "");
  const [whitePageObject, setWhitePageObject] = useState<WhitePageProps>(null);
  const [keitaroObject, setKeitaroObject] = useState<Keitaro>(null);


  const modifiedKeitaroList = keitaroList.map((item, ind) => ({
    value: ind,
    label: item?.keitaroCampaignName,
    keitaroDomain: item?.keitaroDomain,
    keitaroCampaign: item?.keitaroCampaign,
    keitaroCampaignId: item?.keitaroCampaignId,
    keitaroCampaignName: item?.keitaroCampaignName,
    keitaroState: item?.keitaroState,
  }));


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
    fetchCampaign();
  }, []);

  const fetchCampaign = async () => {
    const response = await getUpdatedCampaigns();

    if (response && response.length > 0) {
      setKeitaroList(response);
    }
  };

  useEffect(() => {
    updateApp();
  }, [subDomain, domainObject, keitaroObject, whitePageObject]);

  const updateApp = async () => {
    if (!adminId) {
      alert("adminId is required");
      return;
    }

    if (!appId) {
      alert("appId is required");
      return;
    }

    if (!domainObject) {
      console.log("domain object not found");
      return;
    }

    if (!keitaroObject) {
      console.log("domain object not found");
      return;
    }
    if (!subDomain) {
      console.log("subDomain object not found");
      return;
    }

    const userData = {
      appId,
      adminId,
      domain: domainObject?.label || "",
      subDomain,
      domainApp: `${domainObject?.label}/${subDomain}`,
      domainLanding: `${domainObject?.label}/app-${subDomain}`,
      keitaroDomain: keitaroObject?.keitaroDomain || "",
      keitaroCampaign: keitaroObject?.keitaroCampaign || "",
      keitaroCampaignId: keitaroObject?.keitaroCampaignId || "",
    };

    setTimeout(async () => {
      await updatePWA(userData);
    }, 300);
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

  const handleDomainChange = (option: Domain) => {
    setDomainObject(option);
  };

  const handleKeitaroChange = (option: Keitaro) => {
    setKeitaroObject(option);
    // setItem(option?.label);
  };

  const handleWhitePageChange = (option: WhitePageProps) => {
    setWhitePageObject(option);
  };

  const onSetSubDomain = (e: ChangeEvent<HTMLInputElement>) =>
    setSubDomain(e.target.value);

  return (
    <div className="container__view-2 flex-col flex-1 px-7 pb-[24px] min-h-127.5">
      <Title title="Настройки" withContainer={false} classes="title__view-2" />
      <div className="flex flex-row justify-center items-start gap-3">
        <div className="flex flex-col flex-1/3 justify-end">
          <label className="title__view-1 mb-2">Теги</label>
          <CustomSelect placeholder="" classes="mb-2" />

          <label className="title__view-1 mb-2">
            Домен
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect
            options={modifiedDoaminList}
            value={domainObject}
            onChange={handleDomainChange}
            placeholder="Выберите домен"
            classes="mb-2"
          />

          <label className="title__view-1 mb-2">
            White Page
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect
            options={modifiedWhitePageList}
            value={whitePageObject}
            onChange={handleWhitePageChange}
            placeholder="Введите название PWA"
            classes="mb-2"
          />
        </div>
        <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">
            Нейминг/Ссылка
            <span className="text-red-600 align-super size-[0.8rem]">*</span>
          </label>
          <CustomSelect
            options={modifiedKeitaroList}
            value={keitaroObject}
            onChange={handleKeitaroChange}
            placeholder="Введите нейминг"
            classes="mb-2"
          />
          <InputDefault
            value={subDomain}
            label="Subdomen"
            input_classes="!border-0"
            placeholder="malaysia-app"
            onUpdateValue={onSetSubDomain}
          />
        </div>

        {/* <div className="flex flex-col flex-1/3">
          <label className="title__view-1 mb-2">Subdomen</label>
          <CustomSelect placeholder="Выберите домен" classes="mb-2" />
        </div> */}
      </div>
    </div>
  );
};
