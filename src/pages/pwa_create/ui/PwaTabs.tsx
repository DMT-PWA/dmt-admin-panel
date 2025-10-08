import { FC } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { LanguagesListValue } from "src/shared/types";
import { LanguagesList } from "src/shared/types/designTypes";
import clsx from "clsx";
import { PwaDescriptionForm } from "src/widgets/PwaDescriptionForm";
import { PwaComments } from "src/widgets/PwaComments";
import { adminId } from "src/shared/lib/data";

interface Props {
  path: string;
  activeTabIndex: number;
  languagesList: LanguagesList;
  appId: string | undefined;
  setActiveTabIndex: (value: React.SetStateAction<number>) => void;
  handleTabSwitch: (
    language: LanguagesListValue,
    appId?: string
  ) => Promise<void>;
  removeLanguage: (lang: string) => Promise<void>;
  setModal: (value: React.SetStateAction<boolean>) => void;
}

export const PwaTabs: FC<Props> = (props) => {
  const {
    appId,
    path,
    activeTabIndex,
    handleTabSwitch,
    languagesList,
    removeLanguage,
    setActiveTabIndex,
    setModal,
  } = props;

  return (
    <TabGroup
      className={path === "comments" ? "flex-1 mt-[78px]" : "flex-1"}
      selectedIndex={activeTabIndex}
      onChange={(index) => {
        setActiveTabIndex(index);

        const selectedLanguage = languagesList?.[index];
        if (selectedLanguage) {
          handleTabSwitch(selectedLanguage, appId);
        }
      }}
    >
      <TabList className={"pl-6.5 flex"}>
        {languagesList?.map((item, ind) => (
          <Tab key={ind} as="div" className={clsx("ml-6.25")}>
            {item.short}

            {languagesList && languagesList.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (item.value) {
                    removeLanguage(item.value);
                  }
                }}
                className="ml-5 w-2.75 h-2.75"
              >
                <img src="/pwa_icons/clear-icon.png" />
              </button>
            )}
          </Tab>
        ))}
        {languagesList && languagesList.length < 5 && (
          <Tab
            datatype="tab-plus"
            as="div"
            className={clsx("ml-3.5")}
            onClick={(e) => {
              e.preventDefault();

              setModal(true);
            }}
          >
            <img src="/pwa_icons/crosshair-s.png" alt="" />
          </Tab>
        )}
      </TabList>
      <TabPanels>
        {languagesList?.map((item, ind) => {
          return (
            <TabPanel key={ind}>
              {path === "description" ? (
                <PwaDescriptionForm
                  key={`desc-${item.value}`}
                  adminId={adminId}
                />
              ) : (
                <PwaComments key={`comments-${item.value}`} />
              )}
            </TabPanel>
          );
        })}
      </TabPanels>
    </TabGroup>
  );
};
