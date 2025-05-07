import { FC, useState } from "react";
import { PWA_LIST } from "../model/const";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import shevron from "src/shared/assets/icons/shevron.png";
import dots from "src/shared/assets/icons/dots.png";
import logo from "src/shared/assets/images/logo.png";
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
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();

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
              onClick={() => navigate("/pwa")}
            >
              PWA
            </span>
            {pathname !== "/pwa" && (
              <button onClick={() => setOpen(isOpen ? false : true)}>
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
      </nav>
    </div>
  );
};
