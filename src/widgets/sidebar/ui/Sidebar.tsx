import { FC, useState } from "react";
import { PWA_LIST } from "../model/const";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAppSelector } from "src/shared/lib/store";
import { useDispatch } from "react-redux";
import { setCurrentStage } from "src/entities/pwa_create";

type listItem = {
  id: number;
  title: string;
  route: string;
  slug: string;
};

export const Sidebar: FC = () => {
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();
  const currentStage = useAppSelector((state) => state.pwa_create.currentStage);

  const dispatch = useDispatch();

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
            {pathname !== "/pwa" && (
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
            )}
          </div>
        </div>
        {pathname !== "/pwa" && isOpen ? (
          <ul className="pl-[64px]">
            {PWA_LIST.map((item: listItem) => (
              <li
                key={item.id}
                onClick={() => dispatch(setCurrentStage(item.slug))}
                className={clsx(
                  "text__default cursor-pointer flex items-center h-[50px]",
                  { "!text-orange": `${item.slug}` === currentStage }
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
