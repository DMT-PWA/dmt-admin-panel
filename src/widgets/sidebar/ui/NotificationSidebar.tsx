import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import shevron from "src/shared/assets/icons/shevron.png";
import chartPie from "src/shared/assets/icons/chart-pie.svg";
import desktopComputer from "src/shared/assets/icons/desktop-computer.svg";
import link from "src/shared/assets/icons/link.png";
import paperAirplane from "src/shared/assets/icons/paper-airplane.svg";
import userCircle from "src/shared/assets/icons/user-circle.svg";
import users from "src/shared/assets/icons/users.svg";
import Vector from "src/shared/assets/icons/Vector.svg";

export const NotificationSidebar: FC = () => {
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <nav className="max-w-62.5 border-r-[1px] border-gray-7 h-screen bg-white">
      <ul className="mb-6 pt-4 flex flex-col gap-5.5">
        <li className="flex items-center justify-between px-3 h-6">
          <div className="flex">
            <img
              src={chartPie}
              className="mr-[17px]"
              style={{ maxHeight: "22px" }}
              width={22}
              alt="dots"
            />
            <span
              className="text__default text-view-1 cursor-pointer text__bold"
              onClick={() => navigate("/push_notification/dashboard")}
            >
              Dashboard
            </span>
          </div>
        </li>
        <li className="flex items-center justify-between px-3 h-6">
          <div className="flex">
            <img
              src={Vector}
              className="mr-[17px]"
              style={{ maxHeight: "22px" }}
              width={22}
              alt="dots"
            />
            <span
              className="text__default text-view-1 cursor-pointer text__bold"
              onClick={() => navigate("/pwa")}
            >
              Lead
            </span>
          </div>
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
        </li>
        <li className="flex items-center justify-between px-3 h-6">
          <div className="flex">
            <img
              src={link}
              className="mr-[17px]"
              style={{ maxHeight: "22px" }}
              width={22}
              alt="dots"
            />
            <span
              className="text__default text-view-1 cursor-pointer text__bold"
              onClick={() => navigate("/pwa")}
            >
              Purchase
            </span>
          </div>
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
        </li>
        <li className="flex items-center justify-between px-3 h-6">
          <div className="flex">
            <img
              src={desktopComputer}
              className="mr-[17px]"
              style={{ maxHeight: "22px" }}
              width={22}
              alt="dots"
            />
            <span
              className="text__default text-view-1 cursor-pointer text__bold"
              onClick={() => navigate("/pwa")}
            >
              App
            </span>
          </div>
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
        </li>
        <li className="flex items-center justify-between px-3 h-6">
          <div className="flex">
            <img
              src={paperAirplane}
              className="mr-[17px]"
              style={{ maxHeight: "22px" }}
              width={22}
              alt="dots"
            />
            <span
              className="text__default text-view-1 cursor-pointer text__bold"
              onClick={() => navigate("/pwa")}
            >
              Notification
            </span>
          </div>
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
        </li>
      </ul>
      <ul className="pt-6 flex flex-col gap-5.5 border-t-[1px] border-gray-7">
        <li className="flex items-center px-3 h-6">
          <img
            src={users}
            className="mr-[17px]"
            style={{ maxHeight: "22px" }}
            width={22}
            alt="dots"
          />
          <span
            className="text__default text-view-1 cursor-pointer text__bold mr-[79px]"
            onClick={() => navigate("users")}
          >
            Users
          </span>
        </li>
        <li className="flex items-center px-3 h-6">
          <img
            src={userCircle}
            className="mr-[17px]"
            style={{ maxHeight: "22px" }}
            width={22}
            alt="dots"
          />
          <span
            className="text__default text-view-1 cursor-pointer text__bold mr-[79px]"
            onClick={() => navigate("/pwa")}
          >
            Admin
          </span>
        </li>
      </ul>
      {/* {pathname !== "/pwa" && isOpen ? (
          <ul className="pl-[64px]">
            {PWA_LIST.map((item: listItem) => (
              <li
                key={item.id}
                className={clsx(
                  "text__default cursor-pointer flex items-center h-[50px]",
                  { "!text-orange": canHiglightItem(item.slug) }
                )}
              >
                {item.title}
              </li>
            ))}
          </ul>
        ) : null} */}
    </nav>
  );
};
