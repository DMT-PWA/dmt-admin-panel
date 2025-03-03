import { FC, useState } from "react";
import { PWA_LIST } from "../model/const";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "src/shared/lib/store";
import clsx from "clsx";

type listItem = {
  id: number;
  title: string;
  route: string;
};

export const Sidebar: FC = () => {
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();

  const route = useAppSelector((state) => state.sidebar.current_page);

  const pathname = useLocation().pathname;

  return (
    <div className="container__sidebar">
      <div className="container__logo">
        <img src="src/shared/assets/images/logo.png" alt="logo" />
      </div>
      <nav>
        <div className="">
          <div className="flex items-center pl-6 h-[50px]">
            <img
              src="src/shared/assets/icons/dots.png"
              className="mr-[17px]"
              width={22}
              height={22}
              alt="dots"
            />
            <span
              className="text__default cursor-pointer text__bold mr-[79px]"
              onClick={() => navigate("/pwa")}
            >
              PWA
            </span>

            <button onClick={() => setOpen(isOpen ? false : true)}>
              <img
                src="src/shared/assets/icons/shevron.png"
                alt="dots"
                width={24}
                height={24}
                className={`transition-transform duration-300 ease-in-out ${
                  !isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
        {isOpen ? (
          <ul className="pl-[64px]">
            {PWA_LIST.map((item: listItem) => (
              <li
                key={item.id}
                onClick={() => navigate(item.route)}
                className={clsx(
                  "text__default cursor-pointer flex items-center h-[50px]",
                  { "!text-orange": `/${item.route}` === pathname }
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
