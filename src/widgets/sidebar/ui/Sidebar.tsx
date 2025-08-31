import { FC, useEffect, useState } from "react";
import { PWA_LIST } from "../model/const";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import shevron from "src/shared/assets/icons/shevron.png";
import dots from "src/shared/assets/icons/dots.png";
import logo from "src/shared/assets/images/logo.png";
import paperAirplane from "src/shared/assets/icons/paper-airplane.svg";
type listItem = {
  id: number;
  title: string;
  route: string;
  slug: string;
};

type PwaCreateProps = {
  appId: string | undefined;
};

export const Sidebar: FC<PwaCreateProps> = ({ appId }) => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<string | null>(null);

  const pathname = useLocation().pathname;

  const CREATE_PAGE = pathname.startsWith("/pwa_create");

  const handleSidebarRoute = (routeName: string) => {
    return CREATE_PAGE
      ? navigate(`pwa_create/${routeName}`)
      : navigate(`pwa_edit/${appId}/${routeName}`);
  };

  const canHiglightItem = (item: string) => {
    return pathname.endsWith(item);
  };

  /* useEffect(() => {
    setCurrentTab('')
  }, [currentTab]) */

  return (
    <div className="container__sidebar">
      <div className="container__logo">
        <img src={logo} alt="logo" />
      </div>
      <nav>
        <div className="">
          <div className="flex items-center pl-6 h-[50px]">
            <img
              src={dots}
              className="mr-[17px]"
              style={{ maxHeight: "22px" }}
              width={22}
              alt="dots"
            />
            <span
              className="text__default cursor-pointer text__bold mr-[79px]"
              onClick={() => {
                setCurrentTab("PWA");
                navigate("/pwa");
              }}
            >
              PWA
            </span>
            {pathname !== "/pwa" && (
              <button onClick={() => setOpen(!isOpen)}>
                <img
                  src={shevron}
                  alt="dots"
                  width={24}
                  height={24}
                  className={`transition-transform duration-300 ease-in-out ${
                    !isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>
        {pathname !== "/pwa" && isOpen ? (
          <ul className="pl-[64px]">
            {PWA_LIST.map((item: listItem) => (
              <li
                key={item.id}
                onClick={() => handleSidebarRoute(item.route)}
                className={clsx(
                  "text__default cursor-pointer flex items-center h-[50px]",
                  { "!text-orange": canHiglightItem(item.slug) }
                )}
              >
                {item.title}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex items-center pl-6 h-[50px]">
          <svg
            className="mr-4.25"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 5.4C2 3.77996 3.34315 2.46667 5 2.46667H6.5C7.32843 2.46667 8 3.12332 8 3.93333C8 4.74335 7.32843 5.4 6.5 5.4L5 5.4V20.0667H20V5.4H18.5C17.6716 5.4 17 4.74335 17 3.93333C17 3.12332 17.6716 2.46667 18.5 2.46667H20C21.6569 2.46667 23 3.77996 23 5.4V20.0667C23 21.6867 21.6569 23 20 23H5C3.34314 23 2 21.6867 2 20.0667V5.4Z"
              fill={currentTab === "PUSH" ? "#FF5532" : "#1A1A1A"}
            />
            <path
              d="M3.5 15.6667H8L9.5 18.6H15.5L17 15.6667H21.5V21.5333H3.5V15.6667Z"
              fill={currentTab === "PUSH" ? "#FF5532" : "#1A1A1A"}
            />
            <path
              d="M8.43934 8.76291C9.02513 8.19014 9.97487 8.19014 10.5607 8.76291L11 9.19249V2.46667C11 1.65665 11.6716 1 12.5 1C13.3284 1 14 1.65665 14 2.46667L14 9.19249L14.4393 8.76291C15.0251 8.19014 15.9749 8.19014 16.5607 8.76291C17.1464 9.33568 17.1464 10.2643 16.5607 10.8371L13.5607 13.7704C13.2794 14.0455 12.8978 14.2 12.5 14.2C12.1022 14.2 11.7206 14.0455 11.4393 13.7704L8.43934 10.8371C7.85355 10.2643 7.85355 9.33568 8.43934 8.76291Z"
              fill={currentTab === "PUSH" ? "#FF5532" : "#1A1A1A"}
            />
          </svg>
          <span
            className={clsx(
              "text__default cursor-pointer text__bold mr-[79px]",
              { "!text-orange": currentTab === "PUSH" }
            )}
            onClick={() => {
              setCurrentTab("PUSH");
              navigate("/push_notification/list");
            }}
          >
            PUSH
          </span>
        </div>
      </nav>
    </div>
  );
};
